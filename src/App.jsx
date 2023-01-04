import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchDatas = async () => {
    try {
      const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false").then(data => {
        setCryptos(data.data)
        setIsLoading(true)
        return data.data
      }).catch(err => null);
      return (response)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchDatas();
  }, [])

  return (
    <div className="container">
      {isLoading ? (
        cryptos.map((crypto, index) => {
          return (
            <>
              <img src={crypto.image} alt={crypto.name} />
              <div key={index}>{crypto.name}</div>
              <div key={index}>{crypto.current_price}</div>
              

            </>
          )
        })
      ) : (
        <div>the app is loading</div>
      )}
    </div>
  )
}

export default App
