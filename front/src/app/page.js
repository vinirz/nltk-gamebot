'use client'

import axios from 'axios'
import { SendHorizonal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const inputRef = useRef()
  const endOfMessagesRef = useRef()
  const [conversation, setConversation] = useState([])

  function addUserMessage(message){
    setConversation(prev => [...prev, { data: message, isUser: true }])
  }

  function addBotMessage(message){
    setConversation(prev => [...prev, { data: message, isUser: false }])
  }

  async function sendMessage(event){
    event.preventDefault()
    const userMessage = inputRef.current.value
    if (!userMessage.trim()) return;
    addUserMessage(userMessage)
    inputRef.current.value = ''

    try{
      const response = await axios.post('http://localhost:5000/conversation', {
        question: userMessage
      })
      addBotMessage(response.data.answer)
    }catch{
      addBotMessage('Erro ao obter resposta')
    }
  }

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-[#9370DB] to-pink-200 p-4">
      <section className="flex flex-col h-full max-h-[800px] w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl">
        
        <div className="w-full flex items-center gap-4 text-xl font-semibold bg-white/60 backdrop-blur-md p-5 border-b border-zinc-200">
          <img 
            src="/public/gamebot-profilepic.jpg"
            alt="GameBot profile image" 
            className="w-10 h-10 rounded-full object-cover border border-purple-700"
          />
          <h1 className="text-zinc-900">GameBot</h1>
        </div>

        <div className="flex flex-col overflow-y-auto gap-4 w-full flex-1 px-4 py-6 scroll-smooth custom-scrollbar">
          {
            conversation.map((message, index) => (
              <div
                key={index}
                className={`flex w-full ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[70%] text-base leading-relaxed px-4 py-3 rounded-2xl 
                    ${message.isUser 
                      ? 'bg-purple-700 text-white rounded-br-none' 
                      : 'bg-zinc-100 text-zinc-800 rounded-bl-none'
                    }
                  `}
                >
                  {message.data}
                </div>
              </div>
            ))
          }
          <div ref={endOfMessagesRef} />
        </div>

        <form 
          onSubmit={sendMessage}
          className="w-full p-4 bg-white/60 backdrop-blur-md border-t border-zinc-200 flex items-center gap-3"
        >
          <input 
            ref={inputRef}
            placeholder="Type your message..." 
            type="text"
            className="flex-1 px-5 py-3 rounded-full bg-zinc-100 text-zinc-800 placeholder-zinc-500 outline-none focus:ring-2 focus:ring-purple-700"
          />
          <button 
            type='submit' 
            className="h-12 w-12 flex items-center justify-center bg-purple-700 hover:bg-purple-600 text-white rounded-full transition"
          >
            <SendHorizonal size={20} />
          </button>
        </form>
      </section>
    </div>
  );
}
