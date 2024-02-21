import Web3 from "web3";
import { Connection } from "@celo/connect";
import { LocalWallet } from "@celo/wallet-local"
import "dotenv/config"; // use to read private key from environment variable
import { AbiItem } from 'web3-utils';
import { ERC20ABI } from "./erc20Abi";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
    throw new Error(
        "PRIVATE_KEY is not set in .env file. Please set PRIVATE_KEY=<your_private_key> in .env file."
    );
}
const RECIPIENT = "0x22579CA45eE22E2E16dDF72D955D6cf4c767B0eF"; // arbitrary address
const CONTRACT_ADDRESS = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"; // cUSD contract address

// Set up web3js client and wallet
const web3 = new Web3("https://alfajores-forno.celo-testnet.org"); // Celo testnet
const celoWallet = new LocalWallet();
celoWallet.addAccount(`0x${PRIVATE_KEY}`);
const connection = new Connection(web3, celoWallet);

// Set up ERC20 contract
const contract = new web3.eth.Contract(ERC20ABI as AbiItem[], CONTRACT_ADDRESS);

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
            to: CONTRACT_ADDRESS,
            feeCurrency: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1", // cUSD fee currency
            data: transactionObject.encodeABI(),
        })
        .then((tx) => tx.waitReceipt())
        .catch((err) => console.error(err));
    
    console.log(transactionReceipt);
}

// Initiate the transfer
erc20Transfer().catch((err) => {
    console.error("An error occurred:", err);
});
