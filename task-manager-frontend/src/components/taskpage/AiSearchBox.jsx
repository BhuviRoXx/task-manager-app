import { Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const AiSearchBox = ({ projectId, setTasks, fetchData, setAiMode }) => {
  const { auth } = useAuth();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAiSubmit = async (e) => {
    if (e.key !== "Enter") return;
    if (!input.trim() || !projectId) return;

    const userInput = input; // preserve value
    setInput(""); 

    try {
      setLoading(true);

      const res = await axios.post(
        `/api/ai/${projectId}`,
        { command: userInput },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
          withCredentials: true,
        }
      );

      console.log("AI result:", res.data[0].tasks);

      if (res.data[0]?.tasks) {
        setAiMode(true);
        setTasks(res.data[0].tasks);
      } else {
        fetchData();
      }
    } catch (err) {
      console.error("AI command failed", err);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  return (
    <header className="h-16 w-full bg-white px-20 flex items-center justify-between">
      
      {/* AI Input */}
      <div
        className={`flex items-center gap-3 w-1/2 px-4 py-2 rounded-lg
        ${loading ? "bg-gray-200" : "bg-gray-100"}`}
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin text-gray-600" />
        ) : (
          <Sparkles size={18} className="text-gray-500" />
        )}

        <input
          type="text"
          value={input}
          disabled={loading}
          placeholder={
            loading
              ? "AI is thinking..."
              : "Ask AI about this project..."
          }
          className="bg-transparent outline-none h-16 w-full text-sm"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleAiSubmit}
        />
      </div>
    </header>
  );
};

export default AiSearchBox;
