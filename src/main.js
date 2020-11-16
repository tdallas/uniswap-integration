const { ChainId, Token, WETH, ETHER, Fetcher, Route, Percent } = require('@uniswap/sdk');

// IMPORTANT NOTE
// Internally, the SDK uses WETH, as all Uniswap V2 pairs use WETH under the hood. 
// However, it’s perfectly possible for you as an end user to use ETH, and rely on the router 
// to handle converting to/from WETH. So, let’s use ETH.

const chainIdRopsten = ChainId.ROPSTEN;


const DAI = new Token(chainIdRopsten, '0xad6d458402f60fd3bd25163575031acdce07538d', 18)

console.log(ETHER)

// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option
const getPair = async () =>
    Fetcher.fetchPairData(DAI, WETH[chainIdRopsten])
        .then(pair => pair)
        .catch(err => { console.log('rompio trayendo el par', err); });

const start = async () => {
    const pair = await getPair();
    const route = new Route([pair], WETH[chainIdRopsten])
    const midPrice = route.midPrice.toSignificant(6);
    console.log('mid Price for DAI-WETH', midPrice);
    //lets say we want to trade 0.1 weth for as much dai as possible
    const amountIn = '100000000000000000' // 0.1 WETH

    const trade = new Trade(route, new TokenAmount(WETH[DAI.chainId], amountIn), TradeType.EXACT_INPUT)
};


start();

