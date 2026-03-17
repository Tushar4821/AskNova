import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Lightbulb,
  MessageSquareText,
  Code2,
  Mic,
  Image as ImageIcon,
  Send,
} from "lucide-react";
import { askNova } from "../../config/AskNova";

function Main({ messages, setMessages, input, setInput, addToHistory }) {
  const [loading, setLoading] = useState(false);

  const cards = [
    {
      icon: <Compass size={22} />,
      title: "Explore ideas",
      desc: "Get creative suggestions for content, projects, or startups.",
    },
    {
      icon: <Lightbulb size={22} />,
      title: "Solve problems",
      desc: "Ask for coding help, explanations, or step-by-step solutions.",
    },
    {
      icon: <MessageSquareText size={22} />,
      title: "Write anything",
      desc: "Draft emails, captions, blogs, or polished messages instantly.",
    },
    {
      icon: <Code2 size={22} />,
      title: "Generate code",
      desc: "Build React components, UI sections, and logic faster.",
    },
  ];

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    addToHistory(input);

    const userMessage = { role: "user", text: input };
    const currentInput = input;

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const reply = await askNova(currentInput);

    const aiMessage = { role: "ai", text: reply };
    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };

  const handleCardClick = async (text) => {
    if (loading) return;

    addToHistory(text);

    const userMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const reply = await askNova(text);

    const aiMessage = { role: "ai", text: reply };
    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };

  return (
    <div className="flex-1 min-h-screen bg-[#0b0b0f] text-white flex flex-col">
      <div className="flex items-center justify-between pl-20 pr-6 md:pl-24 md:pr-10 py-5 border-b border-white/10">
       <p className="text-xl font-semibold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
           AskNova
         </p>

        <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-semibold shadow-lg">
          T
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-between px-4 py-8">
        <div className="w-full max-w-5xl flex-1 flex flex-col">
          {messages.length === 0 ? (
            <>
              <div className="text-center mb-10 mt-10">
                <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
                  <span className="bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Hello, User.
                  </span>
                  <br />
                  <span className="text-zinc-300">
                    How can I help you today?
                  </span>
                </h1>

                <p className="text-zinc-500 mt-4 text-sm md:text-base max-w-2xl mx-auto">
                  AskNova can help you brainstorm ideas, write content, explain
                  concepts, and build projects faster.
                </p>
              </div>

              <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    onClick={() => handleCardClick(card.title)}
                    className="group bg-[#111116] border border-white/10 rounded-2xl p-3 sm:p-4 md:p-5 
                               hover:bg-[#17171d] hover:border-white/20 transition-all duration-300 
                               cursor-pointer shadow-md aspect-square flex flex-col justify-between"
                  >
                    <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition">
                      {card.icon}
                    </div>

                    <div>
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1 md:mb-2">
                        {card.title}
                      </h3>

                      <p className="text-[11px] sm:text-xs md:text-sm text-zinc-400 leading-relaxed line-clamp-3 md:line-clamp-none">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 py-4">
             {messages.map((msg, index) => (
 <motion.div
  key={index}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="flex items-start gap-3 w-full"
>
    
    {/* AI Avatar */}
    {msg.role === "ai" && (
      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs shrink-0">
        AI
      </div>
    )}

    {/* Message Bubble */}
    <div
      className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm md:text-base leading-relaxed ${
        msg.role === "user"
          ? "ml-auto bg-white text-black"
          : "bg-[#111116] border border-white/10 text-white"
      }`}
    >
      {msg.text}
    </div>

    {/* User Avatar (optional) */}
    {msg.role === "user" && (
      <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs shrink-0">
        T
      </div>
    )}
  </motion.div>
))}

              {loading && (
               <div className="flex gap-1">
               <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
               <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></span>
               <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></span>
               </div>
              )}
            </div>
          )}
        </div>

        <div className="w-full max-w-4xl mt-10">
          <div className="bg-[#111116] border border-white/10 rounded-3xl px-4 py-3 shadow-2xl">
            <div className="flex items-end gap-3">
              <input
                type="text"
                placeholder="Message AskNova..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                className="flex-1 bg-transparent outline-none text-white placeholder:text-zinc-500 px-2 py-3 text-sm md:text-base"
              />

              <button className="p-3 rounded-full hover:bg-white/5 transition text-zinc-400 hover:text-white">
                <ImageIcon size={20} />
              </button>

              <button className="p-3 rounded-full hover:bg-white/5 transition text-zinc-400 hover:text-white">
                <Mic size={20} />
              </button>

              <button
                onClick={handleSend}
                className="p-3 rounded-full bg-white text-black hover:scale-105 transition disabled:opacity-50"
                disabled={loading}
              >
                <Send size={18} />
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-zinc-500 mt-3 px-4">
            AskNova can make mistakes. Check important information.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;