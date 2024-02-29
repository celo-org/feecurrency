import { newKit } from "@celo/contractkit";
import { PRIVATE_KEY, RECIPIENT, USDC_CONTRACT_ADDRESS, USDC_ADAPTER_ADDRESS } from "./constants";
import { ERC20ABI } from "./erc20Abi";
import { AbiItem, CeloTxReceipt } from "@celo/connect";

/**
 * Boilerplate to create a ContractKit instance and ContractKit-compatible wallet
 */
const kit = newKit("https://alfajores-forno.celo-testnet.org"); // Celo testnet
kit.connection.addAccount(`0x${PRIVATE_KEY}`);

/**
 *  Set up ERC20 contract
 */
const contract = new kit.web3.eth.Contract(ERC20ABI as AbiItem[], USDC_CONTRACT_ADDRESS);

/**
 * Makes a transaction to transfer ERC20 tokens using a fee currency
 */
async function erc20Transfer() {
    console.log(`Initiating fee currency transaction...`);

    const accounts = await kit.connection.getAccounts();
    const sender = accounts[0];

    const [symbol, decimals, tokenBalance] = await Promise.all([
        contract.methods.symbol().call(),
        contract.methods.decimals().call(),
        contract.methods.balanceOf(sender).call(),
    ]);

    console.log(`${symbol} balance of ${sender}: ${tokenBalance * Math.pow(10, -decimals)}`);

    const transactionObject = contract.methods.transfer(
        RECIPIENT,
        kit.web3.utils.toBN(0.01 * Math.pow(10, decimals))
    );

    const transactionReceipt = (await kit
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
