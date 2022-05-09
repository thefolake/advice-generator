import './App.scss';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';

const App = () => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const baseUrl = 'https://api.adviceslip.com/advice';

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(baseUrl)
            setData(response.data);
            setLoading(false);
        } catch (err) {
            if (err.response) {
                console.log(err.response)
            } else {
                console.log(`Error: ${err.message}`);
            }
        }
    }, [ setData, setLoading ]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

  return (
    <main className='container'>
      <div className='content'>
          {isLoading ? <p className='loading'>"Loading...."</p> :
              <>
                  <h1 className='content__heading'>Advice #{data && data.slip.id}</h1>
                  <p className='content__quotes'>"{data && data.slip.advice}"</p>
              </>
          }
          <img src='../images/pattern-divider-desktop.svg' alt='pattern divider' className='pattern-divider'/>
          <div className='icon-dice' onClick={fetchData}>
              <img src='../images/icon-dice.svg' alt='icon dice'/>
          </div>
      </div>
    </main>
  );
}

export default App;