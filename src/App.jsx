import { useState, useEffect } from 'react'
import './css/App.css'
import axios from 'axios';
import Container from './components/Container';


function App() {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [foundCryptos, setFoundCryptos] = useState('');
  const [runApp, setRunApp] = useState(false)
  const onChangeHandler = (value) => {
    let wordsOfCrypto = value.target.value;
    console.log(wordsOfCrypto);
    setFoundCryptos(wordsOfCrypto)
  }

  const app = () => {
    fetchDatas();
    setRunApp(true);
  }

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
    app();
  }, [])

  return (
    <>
      <div className="header">
        <h1>Crypto Page</h1>
        <div>
          <input type="text" onChange={onChangeHandler} className="SearchCryptos" placeholder='Type your Crypto Name' />
          <button>
            <strong>Search</strong>
            </button>
        </div>
      </div>
      <Container cryptos={cryptos} isLoading={isLoading} />

    </>
  )
}

export default App
