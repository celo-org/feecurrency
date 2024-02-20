import Web3 from "web3";
import { Connection } from "@celo/connect";
import { ERC20ABI } from "./erc20Abi";
import "dotenv/config"; // use to read private key from environment variable

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
    throw new Error(
        "PRIVATE_KEY is not set in .env file. Please set PRIVATE_KEY=<your_private_key> in .env file."
    );
}
const RECIPIENT = "0x22579CA45eE22E2E16dDF72D955D6cf4c767B0eF"; // arbitrary address
const CONTRACT_ADDRESS = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"; // cUSD contract address

// Set up web3js client
const web3 = new Web3("https://alfajores-forno.celo-testnet.org"); // Celo testnet
const connection = new Connection(web3);

// Set up account
const account = web3.eth.accounts.wallet.add(`0x${PRIVATE_KEY}`);
const sender = web3.eth.accounts.wallet[0].address;

// Set up ERC20 contract
const contract = new web3.eth.Contract(ERC20ABI, CONTRACT_ADDRESS);

async function erc20Transfer() {
    console.log(`Initiating fee currency transaction...`);

    const transactionObject = contract.methods.transfer(
        RECIPIENT,
        // TODO: Adjust the amount to send based on the token's decimals (USDC has 6 decimals)
        web3.utils.toWei("0.01", "ether")
    );

    const transactionReceipt = await connection
        .sendTransaction({
            from: sender,
            to: CONTRACT_ADDRESS,
            gas: 51925, // TODO: implement gas estimation
            maxPriorityFeePerGas: web3.utils.toWei("10", "gwei"),
            maxFeePerGas: web3.utils.toWei("10", "gwei"),
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
