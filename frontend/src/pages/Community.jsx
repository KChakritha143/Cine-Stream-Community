import { useState, useEffect } from "react";
import { FaTrash, FaPlus, FaSpinner, FaExclamationTriangle } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/posts";

function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publisher, setPublisher] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }
      const data = await response.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Unable to connect to the community server. Please verify your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!title.trim() || !publisher.trim() || !content.trim()) {
      alert("Please fill Title, Publisher and Content");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      console.log("Sending data:", {
        title,
        publisher,
        content,
      });
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          publisher: publisher.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create post. Status: ${response.status}`);
      }

      const result = await response.json();
      
      // Update local state with the new post returned from backend
      if (result.success && result.post) {
        setPosts((prev) => [result.post, ...prev]);
        setTitle("");
        setContent("");
        setPublisher("");
      } else {
        throw new Error("Invalid response schema from backend.");
      }
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to publish your post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePost = async (id) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete post. Status: ${response.status}`);
      }

      // Mutate the local DOM state immediately upon successful response
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
      setError("Failed to delete the post. Please check backend connection.");
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h1 className="app-title" style={{ fontSize: "3rem", marginBottom: "20px" }}>
        💬 CineStream Community
      </h1>
      <p style={{ textAlign: "center", color: "#94a3b8", marginBottom: "40px", fontSize: "1.1rem" }}>
        Discuss your favorite movies, share reviews, and connect with other cinema fans!
      </p>

      {/* Error boundary banner */}
      {error && (
        <div
          id="error-banner"
          style={{
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "30px",
            textAlign: "center",
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <FaExclamationTriangle style={{ color: "#f87171", fontSize: "2rem" }} />
          <p style={{ color: "#f87171", fontWeight: "600", margin: 0 }}>{error}</p>
          <button
            id="retry-button"
            onClick={fetchPosts}
            style={{
              background: "linear-gradient(135deg, #f87171, #ef4444)",
              color: "white",
              padding: "10px 24px",
              border: "none",
              borderRadius: "12px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Create Post Form */}
      <form
        onSubmit={handleCreatePost}
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: "24px",
          padding: "30px",
          marginBottom: "40px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "20px", color: "#fbbf24" }}>
          Create a New Discussion Post
        </h2>
        
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="post-title" style={{ display: "block", color: "#cbd5e1", marginBottom: "8px", fontWeight: "500" }}>
            Post Title
          </label>
          <input
            id="post-title"
            type="text"
            placeholder="What's on your mind? (e.g., Inception Ending Explained)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "100%",
              maxWidth: "100%",
              margin: 0,
              padding: "14px 18px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "14px",
              color: "#fff",
              fontSize: "1rem",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="post-publisher" style={{ display: "block", color: "#cbd5e1", marginBottom: "8px", fontWeight: "500" }}>
            Publisher Name
          </label>
          <input
            id="post-publisher"
            type="text"
            placeholder="Your name or alias (e.g., Anonymous Fan)"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "100%",
              margin: 0,
              padding: "14px 18px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "14px",
              color: "#fff",
              fontSize: "1rem",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#fbbf24")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)")}
          />
        </div>

        <div style={{ marginBottom: "25px" }}>
          <label htmlFor="post-content" style={{ display: "block", color: "#cbd5e1", marginBottom: "8px", fontWeight: "500" }}>
            Content
          </label>
          <textarea
            id="post-content"
            placeholder="Write your review, analysis, or thoughts here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
            style={{
              width: "100%",
              padding: "14px 18px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "14px",
              color: "#fff",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "vertical",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#fbbf24")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)")}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
            color: "#111827",
            fontWeight: "700",
            fontSize: "1rem",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.3s ease",
            opacity: submitting ? 0.7 : 1,
          }}
          onMouseOver={(e) => {
            if (!submitting) e.currentTarget.style.transform = "scale(1.01)";
          }}
          onMouseOut={(e) => {
            if (!submitting) e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {submitting ? (
            <>
              <FaSpinner className="spinner" style={{ animation: "spin 1s linear infinite" }} />
              Publishing...
            </>
          ) : (
            <>
              <FaPlus />
              Publish Post
            </>
          )}
        </button>
      </form>

      {/* Posts Feed list */}
      <h2 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "20px", color: "#f8fafc" }}>
        Recent Discussions
      </h2>

      {loading ? (
        <div id="loading-indicator" style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
          {/* Skeleton Loaders */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="skeleton-card"
              style={{
                height: "140px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "20px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                animation: "pulse 1.5s infinite ease-in-out",
              }}
            >
              <div style={{ height: "24px", width: "40%", background: "rgba(255, 255, 255, 0.06)", borderRadius: "4px" }} />
              <div style={{ height: "16px", width: "80%", background: "rgba(255, 255, 255, 0.04)", borderRadius: "4px" }} />
              <div style={{ height: "16px", width: "60%", background: "rgba(255, 255, 255, 0.04)", borderRadius: "4px" }} />
            </div>
          ))}
          <p style={{ textAlign: "center", color: "#fbbf24", fontWeight: "600", marginTop: "10px" }}>
            Loading discussions...
          </p>
        </div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "20px" }}>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>No posts yet. Be the first to start a conversation!</p>
        </div>
      ) : (
        <div className="posts-container" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {posts.map((post) => (
            <div
              key={post.id}
              className="post-card"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "20px",
                padding: "24px",
                position: "relative",
                transition: "transform 0.3s ease, border-color 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "rgba(251, 191, 36, 0.25)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <h3 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#f8fafc", padding: 0, minHeight: "auto", margin: 0 }}>
                  {post.title}
                </h3>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  aria-label="Delete post"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ef4444",
                    cursor: "pointer",
                    padding: "8px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.2s, transform 0.2s",
                    margin: 0,
                    width: "auto",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.15)";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <FaTrash />
                </button>
              </div>
              
              <p style={{ color: "#cbd5e1", fontSize: "1rem", lineHeight: "1.6", marginBottom: "14px", padding: 0 }}>
                {post.content}
              </p>
              
              <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: "0.85rem" }}>
                <span>Published by {post.publisher || "Anonymous Fan"}</span>
                <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Just now"}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Spinner & pulse keyframes injection */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Community;
