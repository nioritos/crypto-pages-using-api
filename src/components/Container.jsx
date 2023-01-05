import '../css/container.css';
import Crypto from './Crypto';
function Container(props) {

    const {cryptos, isLoading} = props;

    return (
        <>
            <main className="container">
                <Crypto cryptoData={cryptos} loadingInfo={isLoading}/>
            </main>
        </>
    )
}

export default Container;