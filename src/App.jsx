import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages,setMessages] = useState([])
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem("asknova-history")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(()=> {
    localStorage.setItem("asknova-history",JSON.stringify(chatHistory))
  },[chatHistory])

  const addToHistory = (prompt) => {
    if(!prompt.trim())return;
    

    const newChat = {
      id : Date.now(),
      prompt,
      time : new Date().toLocaleTimeString([],{
        hour : '2-digit',
        minute : '2-digit'
      })
    }
    setChatHistory((prev) => [newChat,...prev].slice(0,20))
  }
  const handleNewChat = () => {
    setMessages([])
    setInput("")
    setIsOpen(false)

  }

  return (
    <div className="min-h-screen bg-black text-white relative">

      {/* Floating Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-5 left-5 z-50 p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}  chatHistory={chatHistory}  handleNewChat={handleNewChat} />

      
       <Main
       messages={messages}
       setMessages={setMessages}
       input={input}
       setInput={setInput}
       addToHistory={addToHistory}
       />

    </div>
  );
}

export default App;
