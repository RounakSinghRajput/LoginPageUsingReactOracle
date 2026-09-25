import { useState } from "react";

export default function RegisterPage({ onRegistered, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess("Account created! You can now log in.");
        setTimeout(() => onRegistered(), 1200);
      } else {
        setError(data.error || "Registration failed.");
      }
    } catch (err) {
      setError("Couldn't reach the server. Is the Flask app running?");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={styles.page}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Create Account</h2>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <label style={styles.label}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="you@example.com"
          />
        </label>

        <label style={styles.label}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="••••••••"
          />
        </label>

        <label style={styles.label}>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            placeholder="••••••••"
          />
        </label>

        <button type="submit" style={styles.button} disabled={submitting}>
          {submitting ? "Creating…" : "Create Account"}
        </button>

        <p style={styles.switchText}>
          Already have an account?{" "}
          <button type="button" style={styles.linkButton} onClick={onSwitchToLogin}>
            Log in
          </button>
        </p>
      </form>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  title: { marginBottom: "1rem", textAlign: "center" },
  label: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
    fontSize: "14px",
    color: "#333",
  },
  input: {
    marginTop: "6px",
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    marginTop: "8px",
    padding: "10px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#333",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: { color: "red", fontSize: "13px", marginBottom: "10px" },
  success: { color: "green", fontSize: "13px", marginBottom: "10px" },
  switchText: {
    marginTop: "14px",
    fontSize: "13px",
    textAlign: "center",
    color: "#555",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#333",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "13px",
    padding: 0,
  },
};