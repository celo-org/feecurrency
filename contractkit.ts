import { newKit } from "@celo/contractkit";
import {
    PRIVATE_KEY,
    RECIPIENT,
    cUSD_CONTRACT_ADDRESS,
    USDC_CONTRACT_ADDRESS,
    USDC_ADAPTER_ADDRESS,
} from "./constants";

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

    console.log(`Done! Transaction hash: ${transactionReceipt.transactionHash}`);
}

erc20Transfer().catch((err) => {
    console.error("An error occurred:", err);
});
