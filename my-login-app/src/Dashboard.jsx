export default function Dashboard({ user, onLogout }) {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Dashboard</h2>
        <p style={styles.text}>Welcome, {user.email}!</p>
        <p style={styles.subtext}>You are logged in as user ID {user.id}.</p>

        <button style={styles.button} onClick={onLogout}>
          Log Out
        </button>
      </div>
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
  card: {
    width: "320px",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: { marginBottom: "0.5rem" },
  text: { fontSize: "16px", color: "#333", marginBottom: "4px" },
  subtext: { fontSize: "13px", color: "#777", marginBottom: "20px" },
  button: {
    padding: "10px 20px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#333",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};