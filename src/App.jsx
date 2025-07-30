import { useState } from 'react'
import Navbar from './components/navbar'
import { GoogleGenerativeAI } from '@google/generative-ai'

const Home = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const api = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    const prefix = `
You are HealBot, a mental health assistant. You only answer questions related to mental health, therapy, emotional well-being, anxiety, depression, stress, and self-care.
You are a helpful therapist. When I give you a mental health topic, give your advice in this exact structure:

Short Introduction – 2 lines max.

Main Advice – Use clear subheadings (bold or numbered), keep tone supportive, write in full sentences, do not use ** in any situation. Use spacing to make it readable.

Extra Tips – Use simple bullets (-) and avoid repeating earlier points.

Closing Encouragement – End with a warm, motivating line that sounds human.

Keep formatting neat using markdown, do not use ** in any situation, and don’t mix too many ideas in one sentence.

If the question is not related to mental health, respond with:
"Sorry, I can only help with mental health-related questions."
`;

    const fullPrompt = prefix + '\n\nUser: ' + input;

    try {
      const model = api.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(fullPrompt);
      const text = result.response.text();

      setResponse(text);
    } catch (err) {
      console.error("Error generating response:", err);
      setResponse("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className='bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 min-h-screen text-white p-10'>
        <div className='container mx-auto'>
          <p className='text-center text-2xl font-bold'>HealBot - Your own Therapist</p>

          <form onSubmit={handleSubmit} className='flex justify-center mt-10 w-full gap-3'>
            <input
              onChange={(e) => setInput(e.target.value)}
              className='bg-white text-black px-3 rounded-2xl w-[500px] h-[40px]'
              placeholder='How can I help you?'
              type="text"
            />
            <button className='h-[40px] bg-black w-[100px] rounded-2xl'>
              {loading ? "Loading..." : "Ask"}
            </button>
          </form>

          <div className='text-center mt-10'>
            {response && typeof response === 'string' ? (
              <p className='bg-blue-700 rounded-2xl py-4 px-4 whitespace-pre-line'>
                {response}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
