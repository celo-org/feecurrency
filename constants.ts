import "dotenv/config";

export const RECIPIENT = "0x22579CA45eE22E2E16dDF72D955D6cf4c767B0eF"; // arbitrary address
export const cUSD_CONTRACT_ADDRESS = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"; // ERC20
export const USDC_CONTRACT_ADDRESS = "0x780c1551C2Be3ea3B1f8b1E4CeDc9C3CE40da24E"; // ERC20
export const USDC_ADAPTER_ADDRESS = "0xDB93874fE111F5a87Acc11Ff09Ee9450Ac6509AE"; // Adapter
export const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
    throw new Error(
        "PRIVATE_KEY is not set in .env file. Please set PRIVATE_KEY in .env file."
    );
}