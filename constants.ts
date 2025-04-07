import "dotenv/config";

/**
 * Arbitrary recipient address. Feel free to change this to any address you like.
 */
export const RECIPIENT = "0x22579CA45eE22E2E16dDF72D955D6cf4c767B0eF";

/**
 * cUSD: Fee currency that doesn't require an adapter
 */
export const cUSD_TOKEN_ADDRESS = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

/**
 * USDC: Fee currency that requires an adapter
 */
export const USDC_TOKEN_ADDRESS = "0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B";
export const USDC_ADAPTER_ADDRESS = "0x4822e58de6f5e485eF90df51C41CE01721331dC0";

/**
 * Private key of the account that will send the demo transaction
 */
export const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
    throw new Error(
        "PRIVATE_KEY is not set in .env file. Please set PRIVATE_KEY in .env file."
    );
}