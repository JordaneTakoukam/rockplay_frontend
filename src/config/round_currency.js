import { precisionByCurrency } from "./config_play_amount";

// Fonction pour arrondir un montant à la précision définie pour une crypto-monnaie
const roundToCurrencyPrecision = (amount, currency) => {
    if (typeof amount !== "number") {
        return amount;
    }
    if (typeof currency !== "string") {
        return amount;
    }

    const precision = precisionByCurrency[currency.toLowerCase()];
    if (precision === undefined) {
        throw new Error(`Devise inconnue: ${currency}`);
    }

    return parseFloat(amount.toFixed(precision));
};


export { roundToCurrencyPrecision };
