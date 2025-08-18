"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const SignInRegister: React.FC = () => {
  const router = useRouter();

  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      if (!email || !password || (isRegistering && !name)) {
        setError("Please fill in all required fields.");
        setLoading(false);
        return;
      }

      const url = isRegistering ? "/api/auth/register" : "/api/auth/signin";

      const body = isRegistering
        ? { name, email, password }
        : { email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.message || "Something went wrong");
      } else {
        setMessage(data.message || "Success!");
        resetFields();

        window.dispatchEvent(new CustomEvent("authStateChanged"));

        if (!isRegistering) {
          setMessage("Login successful! Redirecting...");
          setTimeout(() => router.push("/"), 100);
        } else {
          setIsRegistering(false); 
        }
      }
    } catch (err) {
      setError("Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.formBox} onSubmit={handleSubmit}>
        <h2 style={styles.title}>{isRegistering ? "Register" : "Sign In"}</h2>

        
        <div style={styles.toggle}>
          <span
            onClick={() => setIsRegistering(false)}
            style={{
              ...styles.tab,
              borderBottom: !isRegistering ? "2px solid #0070f3" : "none",
              color: !isRegistering ? "#0070f3" : "#666",
            }}
          >
            Sign In
          </span>
          <span
            onClick={() => setIsRegistering(true)}
            style={{
              ...styles.tab,
              borderBottom: isRegistering ? "2px solid #0070f3" : "none",
              color: isRegistering ? "#0070f3" : "#666",
            }}
          >
            Register
          </span>
        </div>

        
        {message && (
          <p style={{ ...styles.feedback, color: "green" }}>{message}</p>
        )}
        {error && <p style={{ ...styles.feedback, color: "red" }}>{error}</p>}

        
        {isRegistering && (
          <>
            <label style={styles.label} htmlFor="name">
              Name
            </label>
            <input
              style={styles.input}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your Name"
            />
          </>
        )}

        
        <label style={styles.label} htmlFor="email">
          Email
        </label>
        <input
          style={styles.input}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
        />

        
        <label style={styles.label} htmlFor="password">
          Password
        </label>
        <input
          style={styles.input}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />

        
        <button
          type="submit"
          style={{ ...styles.button, opacity: loading ? 0.6 : 1 }}
          disabled={loading}
        >
          {loading
            ? isRegistering
              ? "Registering..."
              : "Signing In..."
            : isRegistering
            ? "Register"
            : "Sign In"}
        </button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0f1013",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  formBox: {
    backgroundColor: "#fff",
    padding: "32px 40px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginBottom: "12px",
    color: "#222",
    fontWeight: 600,
    fontSize: "24px",
    textAlign: "center",
  },
  label: { marginBottom: "8px", fontSize: "14px", color: "#666" },
  input: {
    padding: "12px 14px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #666",
    marginBottom: "20px",
    outline: "none",
    color: "#111",
  },
  button: {
    padding: "14px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#0070f3",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
  },
  feedback: { fontSize: "14px", marginBottom: "16px", textAlign: "center" },
  toggle: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    cursor: "pointer",
    gap: "20px",
    color: "#666",
  },
  tab: { padding: "6px 12px", fontWeight: 500, fontSize: "14px" },
};

export default SignInRegister;
