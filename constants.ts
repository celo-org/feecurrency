import "dotenv/config";

export const RECIPIENT = "0x22579CA45eE22E2E16dDF72D955D6cf4c767B0eF"; // arbitrary address
export const cUSD_TOKEN_ADDRESS = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"; // ERC20
export const USDC_TOKEN_ADDRESS = "0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B"; // ERC20
export const USDC_ADAPTER_ADDRESS = "0x4822e58de6f5e485eF90df51C41CE01721331dC0"; // Adapter
export const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
    throw new Error(
        "PRIVATE_KEY is not set in .env file. Please set PRIVATE_KEY in .env file."
    );
}