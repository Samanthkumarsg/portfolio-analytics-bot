import React, { useState } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [inputText, setInputText] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setloading] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_CHATGPT_API_KEY
  const handleInputChange = (event) => {
    setInputText(event.target.value);

  };

  const analyzePortfolio = async () => {

    setloading(true)
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          max_tokens: 200,
          temperature: 0.7,
          messages: [
            {
              role: 'system',
              content: 'You are a financial portfolio analytics bot. {inputText} only respond to financial portfolio data related '
            },
            {
              role: 'user',
              content: inputText
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );

      const botReply = response.data.choices[0].message.content;
      const extractedOptions = responseData.options.map(option => option.label);
      console.log(extractedOptions)
      setConversation([
        ...conversation,
        { role: 'user', content: inputText },
        { role: 'bot', content: botReply }
      ]);
      setloading(false)
      setInputText('')

    } catch (error) {
      console.error('Error analyzing portfolio:', error);
    }
  };


  return (
    <div className='h-full w-full  bg-gray-50 relative'>
      <div className='bg-white w-11/12 sm:w-full md:w-1/2 lg:w-1/2 h-11/12 mx-auto mt-12 p-4 sm:p-4 md:p-12 lg:p-12  rounded-md relative'>
        <div className='top-0 py-3 flex flex-col'>
          <div className='text-md font-semibold text-blue-500 sticky  bg-white'>Onarisam </div>
          <div className='text-xs font-normal text-gray-400 sticky top-0 mt-1 bg-white'>Built for portfolio analytics </div>
        </div>

        <div className='h-full py-6 overflow-y-scroll no-scrollbar'>
          <div className=' mx-auto '>

            {
              conversation.map((message, index) => (
                <div key={index} className={`${message.role} text-gray-500`} >
                  {message.role === 'user' ? (<div className='flex items-end flex-col rounded-lg'>
                    <div className='float-right  text-xs text-gray-500 font-semibold my-2 border p-2 w-fit rounded-md bg-gray-50'>You</div>
                    <p className='text-sm text-gray-700 border rounded-lg p-5 bg-gray-50 '>{message.content}</p>
                  </div>) : (

                    <div className='flex items-start flex-col my-3'>
                      <div className='float-right text-xs text-gray-500 font-semibold my-2 border p-2 w-fit rounded-md bg-violet-50'>Bot</div>
                      <p className=' text-sm text-gray-700 border rounded-lg p-5 bg-violet-50'>{message.content}</p>
                    </div>
                  )}


                </div>
              ))
            }
            {loading && <div className='text-sm  border rounded-lg p-5 bg-blue-50 flex items-center justify-center text-blue-500'>
              <div className='p-2 border border-blue-500 rounded-md w-2 h-2 flex items-center justify-center animate-spin mx-2'></div>
              Loading...</div>}


          </div>
        </div>
      </div>

      <div className='fixed bottom-0 py-2 px-3 border rounded-md flex justify-between w-full bg-white'>
        <input
          className=' rounded-md py-2 px-4 text-sm text-gray-800 bottom-0 w-full outline-none'
          placeholder="write something..."
          value={inputText}
          onChange={handleInputChange}
        />
        <button className='ml-2 bg-blue-500 text-white text-sm rounded-md px-4 py-1' onClick={analyzePortfolio}>Send</button>
      </div>

    </div>


  );
};

export default Portfolio;
