import React, { useState } from "react";
import {
  MessageSquarePlus,
  History,
  Compass,
  Settings,
  User,
  Sparkles,
  X,
} from "lucide-react";

function Sidebar({ isOpen, setIsOpen, chatHistory = [], handleNewChat }) {
  const [activeSection, setActiveSection] = useState("history");

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0f0f0f] border-r border-zinc-800 flex flex-col justify-between text-gray-300 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* TOP */}
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo + Close */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Sparkles className="text-purple-500" size={22} />
              <h1 className="text-lg font-semibold text-white">AskNova</h1>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-zinc-800 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* New Chat */}
          <button
            onClick={handleNewChat}
          className="flex items-center gap-3 w-full bg-zinc-900 hover:bg-zinc-800 px-4 py-3 rounded-lg transition"
           >
          <MessageSquarePlus size={18} />
          <span>New Chat</span>
          </button>

          {/* Nav Links */}
          <div className="mt-6 px-4 space-y-2">
            <button
              onClick={() => setActiveSection("history")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition ${
                activeSection === "history"
                  ? "bg-zinc-900 text-white"
                  : "hover:bg-zinc-900"
              }`}
            >
              <History size={18} />
              <span>Chat History</span>
            </button>

            <button
              onClick={() => setActiveSection("explore")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition ${
                activeSection === "explore"
                  ? "bg-zinc-900 text-white"
                  : "hover:bg-zinc-900"
              }`}
            >
              <Compass size={18} />
              <span>Explore Prompts</span>
            </button>
          </div>

          {/* CONTENT AREA */}
          <div className="mt-4 px-4 flex-1 overflow-y-auto">
            {activeSection === "history" && (
              <>
                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3 px-2">
                  Recent Chats
                </p>

                <div className="space-y-2">
                  {chatHistory.length > 0 ? (
                    chatHistory.map((chat) => (
                      <div
                        key={chat.id}
                        className="bg-zinc-900 hover:bg-zinc-800 rounded-lg px-3 py-3 cursor-pointer transition"
                      >
                        <p className="text-sm text-white line-clamp-2">
                          {chat.prompt.length > 40
                            ? chat.prompt.slice(0, 40) + "..."
                            : chat.prompt}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                          {chat.time}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-500 px-2">
                      No chat history yet
                    </p>
                  )}
                </div>
              </>
            )}

            {activeSection === "explore" && (
              <>
                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3 px-2">
                  Explore Prompts
                </p>

                <div className="space-y-2">
                  {[
                    "Write a professional email",
                    "Explain React hooks simply",
                    "Give startup ideas",
                    "Create a portfolio intro",
                    "Generate a modern UI section",
                  ].map((prompt, index) => (
                    <div
                      key={index}
                      className="bg-zinc-900 hover:bg-zinc-800 rounded-lg px-3 py-3 cursor-pointer transition"
                    >
                      <p className="text-sm text-white">{prompt}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="px-4 pb-6 space-y-2 border-t border-zinc-800 pt-4">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-zinc-900 transition">
            <Settings size={18} />
            <span>Settings</span>
          </button>

          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-zinc-900 transition">
            <User size={18} />
            <span>Profile</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;