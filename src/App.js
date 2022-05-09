import './App.scss';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
    const [data, setData] = useState(null);
    const baseUrl = 'https://api.adviceslip.com/advice';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseUrl)
                setData(response.data)
            } catch (err) {
                if (err.response) {
                    console.log(err.response)
                } else {
                    console.log(`Error: ${err.message}`);
                }
            }
        }

        fetchData();
    }, []);

    const generateNewAdvice = () => {
        setData(data);
        window.location.reload()
    }

  return (
    <main className='container'>
      <div className='content'>
          <h1 className='content__heading'>Advice #{data && data.slip.id}</h1>
          <p className='content__quotes'>"{data && data.slip.advice}"</p>
          <img src='../images/pattern-divider-desktop.svg' alt='pattern divider' className='pattern-divider'/>
          <div className='icon-dice' onClick={generateNewAdvice}>
              <img src='../images/icon-dice.svg' alt='icon dice'/>
          </div>
      </div>
    </main>
  );
}

export default App;