import Web3 from "web3";
import { CeloTxReceipt, Connection } from "@celo/connect";
import { LocalWallet } from "@celo/wallet-local";
import "dotenv/config";
import { AbiItem } from "web3-utils";
import { ERC20ABI } from "./erc20Abi";
import {
    PRIVATE_KEY,
    RECIPIENT,
    cUSD_CONTRACT_ADDRESS,
    USDC_CONTRACT_ADDRESS,
    USDC_ADAPTER_ADDRESS,
} from "./constants";

/**
 * Boilerplate to create a web3js client and web3js-compatible wallet
 */
const web3 = new Web3("https://alfajores-forno.celo-testnet.org"); // Celo testnet
const celoWallet = new LocalWallet();
celoWallet.addAccount(`0x${PRIVATE_KEY}`);
const sender = celoWallet.getAccounts()[0];
const connection = new Connection(web3, celoWallet);

/**
 *  Set up ERC20 contract
 */
const contract = new web3.eth.Contract(ERC20ABI as AbiItem[], USDC_CONTRACT_ADDRESS);

/**
 * Makes a transaction to transfer ERC20 tokens using a fee currency
 */
async function erc20Transfer() {
    console.log(`Initiating fee currency transaction...`);

    const [symbol, decimals, tokenBalance] = await Promise.all([
        contract.methods.symbol().call(),
        contract.methods.decimals().call(),
        contract.methods.balanceOf(sender).call(),
    ]);
    console.log(`${symbol} balance of ${sender}: ${tokenBalance * Math.pow(10, -decimals)}`);

    const transactionObject = contract.methods.transfer(
        RECIPIENT,
        web3.utils.toBN(0.01 * Math.pow(10, decimals))
    );

    const transactionReceipt = (await connection
        .sendTransaction({
            from: sender,
            to: USDC_CONTRACT_ADDRESS,
            feeCurrency: USDC_ADAPTER_ADDRESS,
            data: transactionObject.encodeABI(),
        })
        .then((tx) => tx.waitReceipt())
        .catch((err) => console.error(err))) as CeloTxReceipt;

    console.log(`Done! Transaction hash: ${transactionReceipt.transactionHash}`);
}

// Initiate ERC20 transfer with fee currency
erc20Transfer().catch((err) => {
    console.error("An error occurred:", err);
});
