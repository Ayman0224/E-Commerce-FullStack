import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.name,
          email: data.email,
        })
      );

      window.location.href = "/products";
    } else {
      alert(data.message);
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <div className="login-brand">
          <div className="brand-logo">R</div>
          <h1>Rammal Store</h1>
          <p>Your shopping starts here.</p>
        </div>

        <div className="login-card">
          <div className="login-title">
            <h2>Welcome back</h2>
            <p>Sign in to your account to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-input">
              <label>Email address</label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-input">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="login-button"
            >
              Sign In
            </button>
          </form>

          <div className="login-divider">
            <span>New to Rammal Store?</span>
          </div>

          <a href="/register" className="register-link">
            Create an account
          </a>
        </div>
      </div>
    </main>
  );
}

export default Login;