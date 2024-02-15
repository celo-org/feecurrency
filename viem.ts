import { createPublicClient, createWalletClient, http, parseEther, parseGwei } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { celoAlfajores } from "viem/chains";

import "dotenv/config"; // use to read private key from environment variable

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RECIPIENT = "0x22579CA45eE22E2E16dDF72D955D6cf4c767B0eF"; // arbitrary address

/**
 * Boilerplate to create a viem client
 */
const account = privateKeyToAccount(`0x${PRIVATE_KEY}`);
const publicClient = createPublicClient({
    chain: celoAlfajores,
    transport: http(),
});
const walletClient = createWalletClient({
    chain: celoAlfajores, // Celo testnet
    transport: http(),
});

async function feeCurrencyTransfer() {
    console.log(`Initiating fee currency transaction...`);
    const transactionHash = await walletClient.sendTransaction({
        account, // Sender
        to: RECIPIENT, // recipient
        value: parseEther("0.01"), // 0.01 CELO
        feeCurrency: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1", // cUSD fee currency
        maxFeePerGas: parseGwei("10"), // Special field for dynamic fee transaction type (EIP-1559)
        maxPriorityFeePerGas: parseGwei("10"), // Special field for dynamic fee transaction type (EIP-1559)
    });

    const transactionReceipt = await publicClient.waitForTransactionReceipt({
        hash: await transactionHash,
    });

    console.log(transactionReceipt);
}

feeCurrencyTransfer().catch((err) => {
    // Handle any errors that might occur in the demos
    console.error("An error occurred:", err);
});
