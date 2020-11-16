const { ChainId, Token, WETH, ETHER, Fetcher, Route, Trade, TokenAmount, TradeType, Percent } = require('@uniswap/sdk');
const Web3 = require('web3');
const { factoryABI, factoryAddress } = require('./uniswap_utils');

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

const web3 = new Web3(new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/f1717b26161c4899b30896bae5c18bb2'
));

const factoryContract = new web3.eth.Contract(factoryABI, factoryAddress)

const start = async () => {
    const pair = await getPair();
    const pairTokenAddress = pair.liquidityToken.address;

    console.log('pair address', pairTokenAddress);

    const route = new Route([pair], WETH[chainIdRopsten])
    const midPrice = route.midPrice.toSignificant(6);
    console.log('mid Price for DAI-WETH', midPrice);
    
    //lets say we want to trade 0.1 weth for as much dai as possible
    const amountIn = '100000000000000000' // 0.1 WETH

    const slippageTolerance = new Percent('50', '10000') // 50 bips, or 0.50%
    const trade = new Trade(route, new TokenAmount(WETH[DAI.chainId], amountIn), TradeType.EXACT_INPUT)
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw // needs to be converted to e.g. hex
    const path = [WETH[DAI.chainId].address, DAI.address]
    const to = '' // should be a checksummed recipient address
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current Unix time
    const value = trade.inputAmount.raw // // needs to be converted to e.g. hex

    // we will send a tx to this function
    // function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)

};


start();

