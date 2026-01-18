import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-wrapper">
      <div className="contact-overlay">
        <div className="contact-content">
          <h2 className="contact-title">Contact StackReader</h2>

          <p className="contact-text">
            We’d love to hear from you. Whether you have a question about an
            order, need help finding the right book, or simply want to share
            feedback, the StackReader team is here to help.
          </p>

          <div className="contact-section">
            <h4 className="contact-subtitle">📍 Address</h4>
            <p className="contact-text">
              StackReader Online Bookstore<br />
              4th Floor, Marina Tech Park<br />
              TTK Road, Alwarpet<br />
              Chennai – 600018<br />
              Tamil Nadu, India
            </p>
          </div>

          <div className="contact-section">
            <h4 className="contact-subtitle">📞 Phone</h4>
            <p className="contact-text">
              +91 44 4210 8899<br />
              +91 98765 43210
            </p>
          </div>

          <div className="contact-section">
            <h4 className="contact-subtitle">📧 Email</h4>
            <p className="contact-text">
              support@stackreader.in<br />
              orders@stackreader.in
            </p>
          </div>

          <div className="contact-section">
            <h4 className="contact-subtitle">🕒 Working Hours</h4>
            <p className="contact-text">
              Monday – Friday: 9:30 AM – 6:30 PM<br />
              Saturday: 10:00 AM – 4:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
