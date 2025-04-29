// Prix des devises au 21-11-2024 4pm
const btcPrice = 97111; // USD
const ethPrice = 3348;  // USD
const bnbPrice = 625;   // USD
const trxPrice = 0.21;  // USD
const solPrice = 215;   // USD
const mupPrice = 1;     // USD

const min = 0.1; // $ (montant minimal en USD)
const max = 500; // $ (montant maximal en USD)

// Configuration des précisions par devise
const precisionByCurrency = {
    btc: 7,
    eth: 6,
    bnb: 5,
    trx: 3,
    mup: 0,
    sol: 5,
};

// Configuration des montants minimum et maximum par devise
const configPlayAmount = {
    btc: {
        min: parseFloat((min / btcPrice).toFixed(precisionByCurrency.btc)),
        max: parseFloat((max / btcPrice).toFixed(precisionByCurrency.btc)),
    },
    eth: {
        min: parseFloat((min / ethPrice).toFixed(precisionByCurrency.eth)),
        max: parseFloat((max / ethPrice).toFixed(precisionByCurrency.eth)),
    },
    bnb: {
        min: parseFloat((min / bnbPrice).toFixed(precisionByCurrency.bnb)),
        max: parseFloat((max / bnbPrice).toFixed(precisionByCurrency.bnb)),
    },
    trx: {
        min: parseFloat((min / trxPrice).toFixed(precisionByCurrency.trx)),
        max: parseFloat((max / trxPrice).toFixed(precisionByCurrency.trx)),
    },
    mup: {
        min: 0.1,
        max: parseFloat((max / mupPrice).toFixed(precisionByCurrency.mup)),
    },
    sol: {
        min: parseFloat((min / solPrice).toFixed(precisionByCurrency.sol)),
        max: parseFloat((max / solPrice).toFixed(precisionByCurrency.sol)),
    },
};

// Fonction d'arrondi selon la précision par devise
const roundToCurrencyPrecision = (amount, currency, maxPrecision = null) => {
    // Récupération de la précision par devise
    let precision = precisionByCurrency[currency];
    if (precision === undefined) {
        throw new Error(`Devise inconnue: ${currency}`);
    }

    // Appliquer maxPrecision uniquement si la devise est BTC
    if (currency === 'btc' && maxPrecision !== null && maxPrecision >= 0) {
        return parseFloat(amount.toFixed(maxPrecision));
    }

    return parseFloat(amount.toFixed(precision));
};

// Configuration des retraits par devise
// const configWithdraw = {
//     btc: {
//         fee: 0.00005, // ~ 4.82$
//         min: 0.0001,  // ~ 48.24$
//         max: 0.05     // ~ 4,823.59$
//     },
//     eth: {
//         fee: 0.003,   // ~ 10.31$
//         min: 0.03,    // ~ 103.10$
//         max: 1.5      // ~ 5,154.87$
//     },
//     trx: {
//         fee: 1.89,    // ~ 0.5$
//         min: 37.79,   // ~ 10$
//         max: 20000    // ~ 5258.05$
//     },
//     sol: {
//         fee: 0.0005,  // ~ 0.11$
//         min: 0.005,   // ~ 1.075$
//         max: 200      // ~ 43,000$
//     },
// };

const configWithdraw = {
    btc: {
        // fee: 0.000003, // from blockbee
        fee: 0.000004, // from blockbee
        min: 0.00008, // minimum blockbee
        max: 0.00485  // ~ 4,823.59$
    },
    eth: {
        // fee: 0.00023, // from blockbee ~ 0.61
        fee: 0.00025, // from blockbee ~ 0.61
        min: 0.0045, // from blockbee
        max: 0.15, // ~ 5,154.87$
    },
    trx: {
        // fee: 3,  // from blockbee ~ 0.29$
        fee: 4,  // from blockbee ~ 0.29$
        min: 10, // from blockbee
        max: 2025 // ~500$

    },
    bnb: {
        // fee: 0.000084, // ~ 0.053$
        fee: 0.000085, // ~ 0.053$
        min: 0.001,
        max: 0.5 // ~ 500$
    },
};

// Export des configurations et de la fonction d'arrondi
export { configPlayAmount, roundToCurrencyPrecision, configWithdraw, precisionByCurrency };
