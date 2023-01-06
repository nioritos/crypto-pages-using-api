import { useState, useEffect } from "react";
import "./css/App.css";
import axios from "axios";
import Container from "./components/Container";
import Pagination from "./components/Pagination";

function App() {
  const [pages, setPages] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itensPerpage, setItensPerPage] = useState(20);
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [foundCryptos, setFoundCryptos] = useState("");
  const [cryptoToShow, setCryptoToShow] = useState();
  const [isHabilitToShowBySearch, setIsHabilitToShowBySearch] = useState(false);
  const [runApp, setRunApp] = useState(false);

  const searchCryptos = async (cryptoName) => {
    cryptoName = foundCryptos;
    console.log(cryptoName);
    const response = await axios
      .get(`https://api.coingecko.com/api/v3/search?query=${cryptoName}`)
      .then((d) => {
        console.log(d.data.coins[0]);
        setCryptoToShow(d.data.coins[0]);
        setIsHabilitToShowBySearch(true);
      })
      .catch((error) => console.log(error));
  };

  const onChangeHandler = (value) => {
    let wordsOfCrypto = value.target.value;
    console.log(wordsOfCrypto);
    setFoundCryptos(wordsOfCrypto);
  };

  const onLeftClick = () => {
    if (pages > 0) {
      setPages(pages - 1);
    }
  };
  const onRightClick = () => {
    if (pages < totalPages - 1) {
      setPages(pages + 1);
    } else {
      alert("you DO NOT skip for the next page.");
    }
  };

  const app = () => {
    fetchDatas();
    setRunApp(true);
  };

  const fetchDatas = async () => {
    try {
      const response = await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${itensPerpage}&page=${
            itensPerpage * pages
          }&sparkline=false`
        )
        .then((data) => {
          setCryptos(data.data);
          setIsLoading(true);
          setTotalPages(Math.ceil(data.data.length / 2));
          return data.data;
        })
        .catch((err) => console.log(err));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    app();
  }, [pages]);

  return (
    <>
      <div className="header">
        <h1>Crypto Page</h1>
        <div>
          <div>
            <input
              type="text"
              onChange={onChangeHandler}
              className="SearchCryptos"
              placeholder="Type your Crypto Name"
            />
            <button onClick={searchCryptos}>
              <strong>Search</strong>
            </button>
          </div>
          <Pagination
            pages={pages}
            totalPages={totalPages}
            onLeftClick={onLeftClick}
            onRightClick={onRightClick}
          />
        </div>
      </div>
      <Container
        cryptos={cryptos}
        isLoading={isLoading}
        cryptoToShow={cryptoToShow}
        isHabilitToShowBySearch={isHabilitToShowBySearch}
      />
    </>
  );
}

export default App;
