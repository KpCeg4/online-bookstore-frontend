export const getCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (book) => {
  const cart = getCart();
  const existing = cart.find(item => item.id === book.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: book.id,
      title: book.title,
      price: book.price,
      quantity: 1
    });
  }

  saveCart(cart);
};

export const removeFromCart = (id) => {
  const cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
};

export const getCartCount = () => {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};
