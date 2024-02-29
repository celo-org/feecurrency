import {
    createPublicClient,
    createWalletClient,
    http,
    getContract,
    erc20Abi,
    parseUnits,
    formatUnits,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { celoAlfajores } from "viem/chains";
import {
    PRIVATE_KEY,
    RECIPIENT,
    USDC_CONTRACT_ADDRESS,
    USDC_ADAPTER_ADDRESS,
} from "./constants";

/**
 * Boilerplate to create a viem client and viem-compatible wallet
 */
const read = createPublicClient({
    chain: celoAlfajores,
    transport: http(),
});
const write = createWalletClient({
    chain: celoAlfajores, // Celo testnet
    transport: http(),
});
const sender = privateKeyToAccount(`0x${PRIVATE_KEY}`);

/**
 *  Set up ERC20 contract
 */
const contract = getContract({
    address: USDC_CONTRACT_ADDRESS,
    abi: erc20Abi,
    client: { public: read, wallet: write },
});

/**
 * Makes a transaction to transfer ERC20 tokens using a fee currency
 */
async function erc20Transfer() {
    console.log(`Initiating fee currency transaction...`);
    
    const [symbol, decimals, tokenBalance] = await Promise.all([
        contract.read.symbol(),
        contract.read.decimals(),
        contract.read.balanceOf([sender.address]),
    ]);
    console.log(`${symbol} balance of ${sender.address}: ${formatUnits(tokenBalance, decimals)}`);

    const transactionHash = await contract.write.transfer(
        [RECIPIENT, parseUnits("0.01", decimals)],
        { account: sender, feeCurrency: USDC_ADAPTER_ADDRESS }
    );
    console.log(`Done! Transaction hash: ${transactionHash}`);
}

erc20Transfer().catch((err) => {
    console.error("An error occurred:", err);
});
