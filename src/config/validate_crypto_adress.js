// utils/addressValidators.js
export const validateBTCAddress = (address) => {
    // Format de base pour Bitcoin (p2pkh, p2sh, bech32)
    const btcRegex = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/;
    return btcRegex.test(address);
};

export const validateETHAddress = (address) => {
    // Validation Ethereum standard (0x + 40 hex chars)
    const ethRegex = /^0x[a-fA-F0-9]{40}$/;
    return ethRegex.test(address);
};

export const validateBNBAddress = (address) => {
    // BNB utilise le même format que Ethereum (BEP-20)
    return validateETHAddress(address);
};

export const validateTRXAddress = (address) => {
    // Format Tron (base58check starting with T)
    const trxRegex = /^T[a-zA-Z0-9]{33}$/;
    return trxRegex.test(address);
};

export const validateSOLAddress = (address) => {
    // Solana address (base58, 32-44 chars)
    const solRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    return solRegex.test(address);
};

export const cryptoAddressValidator = (currency, address) => {
    const validators = {
        btc: validateBTCAddress,
        eth: validateETHAddress,
        bnb: validateBNBAddress,
        trx: validateTRXAddress,
        sol: validateSOLAddress
    };

    const validator = validators[currency.toLowerCase()];
    return validator ? validator(address) : false;
};