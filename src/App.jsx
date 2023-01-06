import { useState, useEffect } from "react";
import "./css/App.css";
import axios from "axios";
import Container from "./components/Container";
import Pagination from "./components/Pagination";

function App() {
  const [pages, setPages] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itensPerpage, setItensPerPage] = useState(100);
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [foundCryptos, setFoundCryptos] = useState("");
  const [runApp, setRunApp] = useState(false);

  const fetchListOfCrypto = async () => {
    const dataOfList = await axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc/"
      )
      .then((d) => {
        return d.data.length;
      })
      .catch((err) => console.log(err));

    setItensPerPage(dataOfList);
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
    setPages(pages + 1);
  };

  const app = () => {
    fetchDatas();
    fetchListOfCrypto();
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
          // console.log(data.data.length);
          setCryptos(data.data);
          setIsLoading(true);
          setTotalPages(Math.ceil(data.data.length / itensPerpage));
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
            <button>
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
        pages={pages}
        totalPages={totalPages}
      />
    </>
  );
}

export default App;
