import Web3 from "web3";
import { Connection } from "@celo/connect";
import { LocalWallet } from "@celo/wallet-local"
import "dotenv/config";
import { AbiItem } from 'web3-utils';
import { ERC20ABI } from "./erc20Abi";

/**
 * Constants
 */
const RECIPIENT = "0x22579CA45eE22E2E16dDF72D955D6cf4c767B0eF"; // arbitrary address
const cUSD_CONTRACT_ADDRESS = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"; // ERC20
const USDC_CONTRACT_ADDRESS = "0x780c1551C2Be3ea3B1f8b1E4CeDc9C3CE40da24E"; // ERC20
const USDC_ADAPTER_ADDRESS = "0xDB93874fE111F5a87Acc11Ff09Ee9450Ac6509AE"; // Adapter
const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
    throw new Error(
        "PRIVATE_KEY is not set in .env file. Please set PRIVATE_KEY=<your_private_key> in .env file."
    );
}

/**
 * Boilerplate to create a web3js client and web3js-compatible wallet
 */
const web3 = new Web3("https://alfajores-forno.celo-testnet.org"); // Celo testnet
const celoWallet = new LocalWallet();
celoWallet.addAccount(`0x${PRIVATE_KEY}`);
const connection = new Connection(web3, celoWallet);

/**
 *  Set up ERC20 contract
 */
const contract = new web3.eth.Contract(ERC20ABI as AbiItem[], cUSD_CONTRACT_ADDRESS);

/** 
 * Makes a transaction to transfer ERC20 tokens using a fee currency
*/
async function erc20Transfer() {
    console.log(`Initiating fee currency transaction...`);

    const transactionObject = contract.methods.transfer(
        RECIPIENT,
        // TODO: Adjust the amount to send based on the token's decimals (USDC has 6 decimals)
        web3.utils.toWei("0.01", "ether")
    );

    // Get the sender's address
    const sender = celoWallet.getAccounts()[0];

    const transactionReceipt = await connection
        .sendTransaction({
            from: sender,
            to: cUSD_CONTRACT_ADDRESS,
            feeCurrency: cUSD_CONTRACT_ADDRESS,
            data: transactionObject.encodeABI(),
        })
        .then((tx) => tx.waitReceipt())
        .catch((err) => console.error(err));
    
    console.log(transactionReceipt);
}

// TODO(Arthur): Add example using `setFeeCurrency()`

// Initiate the transfer
erc20Transfer().catch((err) => {
    console.error("An error occurred:", err);
});
