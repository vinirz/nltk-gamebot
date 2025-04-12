'use client'

import axios from 'axios'
import { SendHorizonal } from 'lucide-react'
import { useRef, useState } from 'react'

export default function Home() {
  const inputRef = useRef()
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

  return (
    <div className="flex h-screen flex-col items-center justify-center p-18">
      <section className="flex flex-col h-full w-1/3 bg-zinc-300 rounded-xl overflow-hidden">
        <div className="w-full text-center text-3xl bg-zinc-400/50 p-5 font-semibold">
          <h1>GameBot</h1>
        </div>

        <div className="flex flex-col overflow-y-auto gap-8 w-full h-full p-5 pt-10">
          {
            conversation.map((message, index) => {
              return (
                <span key={index} className={`flex items-center w-full h-fit ${message.isUser ? 'justify-end' : 'justify-start'}`}>                
                  <span className={`text-xl bg-zinc-400/50 w-fit p-5 rounded-full ${message.isUser ? 'rounded-br-none bg-purple-400' : 'rounded-bl-none bg-purple-600'}`}>{message.data}</span>
                </span>
              )
            })
          }
        </div>

        <div className="w-full h-32 bg-zinc-400/50 p-5 flex items-center justify-center">
          <form onSubmit={(event) => {sendMessage(event)}} className="w-full flex items-center justify-center gap-5">
            <input ref={inputRef} placeholder="Pergunte alguma coisa..." type="text" className="w-full h-full p-5 bg-zinc-400/70 rounded-full"/>
            <button type='submit' className="h-14 flex items-center justify-center text-zinc-300 aspect-square bg-purple-400 rounded-full hover:bg-purple-500 duration-150">
              <SendHorizonal/>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
