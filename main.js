const program = require("commander");
const repl = require("repl")
const package = require("./package.json");
const path = require("path");
const os = require("os");
const UNISWAP = require('@uniswap/sdk')

console.log(`The chainId of mainnet is ${UNISWAP.ChainId.MAINNET}.`)

program
    .version(package.version)
    .option("-c, --chainId [chainId]")
    .option(
        "-hf, --history-file [path]",
        "File path of commands history file (defaults to $HOME/.uni_repl_history)"
    )
    .parse(process.argv);

var replServer = repl.start({
    prompt: "> ",
    ignoreUndefined: true
});

const historyFile = program.historyFile
    ? program.historyFile
    : path.join(os.homedir(), ".web3_repl_history");

require("repl.history")(replServer, historyFile);