import { newKit } from "@celo/contractkit";
import "dotenv/config";

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
 * Boilerplate to create a ContractKit instance and ContractKit-compatible wallet
 */
const kit = newKit("https://alfajores-forno.celo-testnet.org"); // Celo testnet
kit.connection.addAccount(`0x${PRIVATE_KEY}`);

/**
 * Makes a transaction to transfer ERC20 tokens using a fee currency
 */
async function erc20Transfer() {
    /**
     *  Set up ERC20 contract
     */
    const contract = await kit.contracts.getErc20(cUSD_CONTRACT_ADDRESS);

    console.log(`Initiating fee currency transaction...`);

    const transactionObject = contract.transfer(
        RECIPIENT,
        // TODO: Adjust the amount to send based on the token's decimals (USDC has 6 decimals)
        kit.web3.utils.toWei("0.01", "ether")
    );

    // Get the sender's address
    const accounts = await kit.connection.getAccounts();
    const sender = accounts[0];

    const transactionReceipt = await transactionObject.sendAndWaitForReceipt({
        from: sender,
        to: RECIPIENT,
        feeCurrency: cUSD_CONTRACT_ADDRESS,
    });

    console.log(transactionReceipt);
}

erc20Transfer().catch((err) => {
    console.error("An error occurred:", err);
});
