import '../css/crypto.css'

function Crypto(props) {

    const { cryptoData, loadingInfo } = props;


    return (
        <>
            {loadingInfo ? (
                cryptoData.map((cryptos, index) => {
                    return (
                        <div className="Card">
                            <div className="content-card">
                            <img src={cryptos.image} alt={cryptos.name} />
                            <div className="cryptoInfo">
                                <h1>{cryptos.name}</h1>
                                <h4>${cryptos.current_price}</h4>
                            </div>
                        </div>
                            </div>

                    )
                })
            ) : (
                <h1>the app is loading</h1>
            )}
        </>
    )

};

export default Crypto;