export default function AdminNavbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav
      className="navbar px-4 d-flex align-items-center"
      style={{
        height: "64px",
        background: "linear-gradient(90deg, #2f3a4a, #1f2933)"
      }}
    >
      <div style={{ lineHeight: "1.1" }}>
        <div
          style={{
            color: "#ffffff",
            fontSize: "18px",
            fontWeight: 700
          }}
        >
          StackReader
        </div>
        <div
          style={{
            color: "#cbd5e1",
            fontSize: "12px",
            fontWeight: 400
          }}
        >
          Online Bookstore
        </div>
      </div>

      <div
        style={{
          color: "#ffffff",
          fontSize: "20px",
          fontWeight: 600,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)"
        }}
      >
        Admin Dashboard
      </div>

      <div className="ms-auto d-flex align-items-center gap-3">
        <div
          style={{
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 500
          }}
        >
          {user?.name} (admin)
        </div>

        <button
          className="btn btn-sm btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
