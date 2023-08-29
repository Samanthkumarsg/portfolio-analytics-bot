import React, { useState } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const analyzePortfolio = async () => {
    try {
      const response = await axios.post(
        '	https://api.openai.com/v1/chat/completions',
        {
          model:"gpt-3.5-turbo",
          max_tokens: 100,
          temperature: 0.7,
          messages: [
            {
              role: 'system',
              content: 'You are a movie bot.'
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
            'Authorization': 'Bearer ',
          },
        }
      );
      setOutputText(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error analyzing portfolio:', error);
    }
  };

  console.log(outputText)

  return (
    <div className='h-full w-full absolute bg-gray-50 '>
    <div className='bg-white w-1/2 h-11/12 mx-auto mt-12 p-12 rounded-md'>
      <h1 className='text-lg font-semibold text-blue-500'>Portfolio Analytics Bot</h1>

      <div className=' py-6'>
      {outputText && (
        <div className='w-11/12 h-full'>
          <div className='text-xs text-gray-500 font-semibold my-2 border p-2 w-fit rounded-md'>Bot response:</div>
          <p className='py-2 text-sm text-gray-700'>{outputText}</p>
        </div>
      )}
      </div>

      <div className='sticky bottom-0 py-2 px-3 border rounded-md flex justify-between'>
        <input
        className=' rounded-md py-1 px-4 text-sm bottom-0 w-full'
          placeholder="write something..."
          value={inputText}
          onChange={handleInputChange}
        />
        <button className='ml-2 bg-slate-700 text-white text-sm rounded-md px-4 py-1' onClick={analyzePortfolio}>Send</button>
      </div>
    </div>
    </div>
  
  );
};

export default Portfolio;
