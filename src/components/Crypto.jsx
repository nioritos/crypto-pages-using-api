import '../css/crypto.css'

function Crypto(props) {

    const {cryptoData, loadingInfo} = props;

    console.log(cryptoData)

    return (
        <>
            {loadingInfo ? (
        cryptoData.map((cryptos, index) => {
          return (
            <div className="Card">
              <img src={cryptos.image} alt={cryptos.name} />
              <div key={index}>{cryptos.name}</div>
              <div key={index}>{cryptos.current_price}</div>


            </div>
          )
        })
      ) : (
        <div>the app is loading</div>
      )}
        </>
    )

};

export default Crypto;