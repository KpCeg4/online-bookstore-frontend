import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../api/orderApi";
import { createPaymentOrder } from "../api/paymentApi";
import api from "../api/axios";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const res = await createPaymentOrder(total);
    const order = res.data;

    const options = {
      key: "rzp_test_RuY2EVXyuPgpdN",
      amount: order.amount,
      currency: order.currency,
      name: "Online Bookstore",
      order_id: order.id,
      prefill: { email: user.email },
      handler: async function (response) {
        const verifyRes = await api.post("/api/payments/verify", {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature
        });

        if (verifyRes.data === true) {
          await placeOrder({
            totalAmount: total,
            items: cart.map(item => ({
              bookId: item.id,
              title: item.title,
              price: item.price,
              quantity: item.quantity
            }))
          });
          clearCart();
          navigate("/orders");
        } else {
          alert("Payment verification failed");
        }
      },
      theme: { color: "#3a6ea5" }
    };

    new window.Razorpay(options).open();
  };

  return (
    <div className="container mt-4 cart-page">
      <h3 className="mb-4">Your Cart</h3>

      {cart.map(item => (
        <div key={item.id} className="cart-row">
          <div className="cart-col image">
            <img
              src={item.imageUrl || "https://via.placeholder.com/60"}
              alt={item.title}
              className="cart-thumbnail"
            />
          </div>

          <div className="cart-col title">
            <div className="fw-semibold">{item.title}</div>
            <div>₹{item.price}</div>
          </div>

          <div className="cart-col qty">
            <button
              className="qty-btn"
              disabled={item.quantity === 1}
              onClick={() => decreaseQty(item.id)}
            >
              −
            </button>
            <span className="qty-value">{item.quantity}</span>
            <button
              className="qty-btn"
              onClick={() => increaseQty(item.id)}
            >
              +
            </button>
          </div>

          <div className="cart-col price">
            ₹{item.price * item.quantity}
          </div>

          <div className="cart-col remove">
            <button
              className="btn btn-danger btn-sm rounded-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <div className="cart-row cart-total-row">
            <div />
            <div className="cart-col title fw-bold">Total</div>
            <div />
            <div className="cart-col price fw-bold">₹{total}</div>
            <div />
          </div>

          <div className="cart-row cart-pay-row">
            <div />
            <div />
            <div />
            <div />
            <div className="cart-col remove">
              <button
                className="btn-metallic-blue"
                onClick={handlePayment}
              >
                Pay with Razorpay
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
