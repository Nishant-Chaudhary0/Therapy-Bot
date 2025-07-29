import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar'
import { GoogleGenerativeAI } from '@google/generative-ai'

function App() {
 const api = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')

  const handleSubmit = async (e)=> {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    const prefix = `
You are HealBot, a mental health assistant. You only answer questions related to mental health, therapy, emotional well-being, anxiety, depression, stress, and self-care. 

Always follow this response format:

1. Summary (2 lines max)  then next line
2. start with next line and give spacing of one line Main Advice (use bullet points)  
3. **Extra Tips (if relevant)**  
4. use next line and remove stars

If the question is not related to mental health, respond with:
"Sorry, I can only help with mental health-related questions."
`;

    const fullPrompt = prefix + '\n\nUser:' + input;

    const model = api.getGenerativeModel({model:'gemini-1.5-flash'});
    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();
    setResponse(text);
    setLoading(false);
  }


  return (
    <>
      <Navbar />
      <div className='bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 min-h-screen text-white p-10'>
        <div className='container mx-auto'>
          <p className='text-center text-2xl font-bold'>HealBot-Your own Therapist</p>
          <div >
           <form action="" onSubmit={handleSubmit} className='flex justify-center mt-10 w-full gap-3'>
             <input onChange={(e) => {setInput(e.target.value)}} className='bg-white text-black border border-none px-3 rounded-2xl w-[500px] h-[40px] '
            placeholder='How can i help you' type="text" />
            <button className='h-[40px] bg-black w-[100px] border rounded-2xl border-none' >{loading ? "Loading" : "Ask"}</button>
           </form>
           <div className='text-center mt-15'>
            <p className='bg-blue-700 border-none rounded-2xl py-4 px-4 '>{response}</p>
           </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
