import "../css/container.css";
import Crypto from "./Crypto";
function Container(props) {
  const { cryptos, isLoading, pages, totalPages } = props;

  return (
    <>
      <main className="container">
        <Crypto
          cryptoData={cryptos}
          loadingInfo={isLoading}
          pages={pages}
          totalPages={totalPages}
        />
      </main>
    </>
  );
}

export default Container;
