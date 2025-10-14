import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export default function ChatGPTSearch() {
  const [query, setQuery] = useState("");
  const [logs, setLogs] = useState([]);
  const location = useLocation();

  // Simpan log halaman yang diakses
  useEffect(() => {
    const currentPath = location.pathname;
    setLogs((prev) => {
      const updated = [currentPath, ...prev.filter((p) => p !== currentPath)];
      return updated.slice(0, 10);
    });
  }, [location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    alert("You searched: " + query);
    setQuery("");
  };

  const quickActions = [
    { label: "Weather", emoji: "☀️", query: "What's the weather today?" },
    { label: "News", emoji: "📰", query: "Latest news headlines" },
    { label: "Jokes", emoji: "😂", query: "Tell me a joke" },
    { label: "Translate", emoji: "🌐", query: "Translate 'Hello' to Spanish" },
  ];

  const handleQuickAction = (q) => {
    setQuery(q);
    alert("Quick action: " + q);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Ready when you are.</h2>

      {/* Tombol cepat */}
      <div style={styles.quickAccess}>
        {quickActions.map((action, index) => (
          <button
            key={index}
            style={styles.quickButton}
            onClick={() => handleQuickAction(action.query)}
          >
            <span style={{ marginRight: "8px" }}>{action.emoji}</span>
            {action.label}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Ask anything"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          🎤
        </button>
      </form>

      {/* Log halaman terakhir (seperti recent files di Word) */}
      {logs.length > 0 && (
        <div style={styles.recentBox}>
          <h3 style={styles.recentTitle}>Quick Access</h3>
          <ul style={styles.recentList}>
            {logs.map((path, index) => (
              <li key={index} style={styles.recentItem}>
                <Link to={path} style={styles.recentLink}>
                  <div style={styles.fileIcon}>📄</div>
                  <div>
                    <div style={styles.fileName}>
                      {path === "/" ? "Home" : path.replace("/", "").toUpperCase()}
                    </div>
                    <div style={styles.filePath}>{window.location.origin + path}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// --- Gaya mirip “Recent Files” Microsoft Word ---
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    fontFamily: "Segoe UI, Arial, sans-serif",
    backgroundColor: "#fff",
    padding: "40px 20px",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#111",
  },
  quickAccess: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  quickButton: {
    backgroundColor: "#f5f5f5",
    border: "1px solid #ddd",
    borderRadius: "20px",
    padding: "10px 16px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
  },
  form: {
    display: "flex",
    width: "100%",
    maxWidth: "600px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "40px",
  },
  input: {
    flex: 1,
    padding: "15px 20px",
    border: "none",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    padding: "0 20px",
    border: "none",
    background: "#f0f0f0",
    cursor: "pointer",
    fontSize: "18px",
  },

  // Recent box (seperti recent documents di Word)
  recentBox: {
    width: "100%",
    maxWidth: "600px",
    background: "#fafafa",
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "15px 20px",
  },
  recentTitle: {
    fontSize: "18px",
    color: "#333",
    marginBottom: "10px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "5px",
    textAlign: "left"
  },
  recentList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  recentItem: {
    display: "flex",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #eee",
  },
  recentLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#333",
    width: "100%",
    gap: "10px",
  },
  fileIcon: {
    fontSize: "20px",
  },
  fileName: {
    fontWeight: "bold",
    fontSize: "15px",
  },
  filePath: {
    fontSize: "12px",
    color: "#777",
  },
};
