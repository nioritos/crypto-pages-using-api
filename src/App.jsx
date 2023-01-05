import { useState, useEffect } from 'react'
import './css/App.css'
import axios from 'axios';
import Container from './components/Container';


function App() {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchDatas = async () => {
    try {
      const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then(data => {
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

  console.log(cryptos)
  return (
    <>
      <Container cryptos={cryptos} isLoading={isLoading}/>

    </>
  )
}

export default App
