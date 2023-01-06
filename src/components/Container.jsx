import "../css/container.css";
import Crypto from "./Crypto";
function Container(props) {
  const { cryptos, isLoading, cryptoToShow, isHabilitToShowBySearch } = props;

  return (
    <>
      <main className="container">
        {isHabilitToShowBySearch ? (
          <>
            <h1>Searched Cryptos</h1>
            <div className="card-crypto-searched">
              <img src={cryptoToShow.large} alt={cryptoToShow.name} />
              <h2>{cryptoToShow.name}</h2>
            </div>
          </>
        ) : null}
        <div className="crypto-container">
          <Crypto cryptoData={cryptos} loadingInfo={isLoading} />
        </div>
      </main>
    </>
  );
}

export default Container;
