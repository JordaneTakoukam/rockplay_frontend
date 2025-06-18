// 18 - 06 - 2025 a 14h56
const cryptoPrices = {
  btc: 104184.00,     // Bitcoin (BTC)
  eth: 2488.66,       // Ethereum (ETH)
  bnb: 639.93,        // Binance Coin (BNB)
  trx: 0.270813,      // TRON (TRX)
  btc_ln: 0.00006067, // Bitcoin Lightning (BTC_LN)
  bch: 460.03,        // Bitcoin Cash (BCH)
  ltc: 84.43,         // Litecoin (LTC)
  doge: 0.167006,     // Dogecoin (DOGE)
  sol: 145.06,        // Solana (SOL)
  rp: 1               // Crypto du jeu (valeur fictive)
};



const min = 0.1; // $ (montant minimal en USD)
const max = 500; // $ (montant maximal en USD)

// Configuration des précisions par devise
const precisionByCurrency = {
  btc: 6,
  bnb: 4,
  eth: 4,
  mup: 4,
  sol: 4,
  trx: 2,

};

// Configuration des montants minimum et maximum par devise
const configPlayAmount = {
  btc: {
    min: parseFloat((min / cryptoPrices.btc).toFixed(precisionByCurrency.btc)),
    max: parseFloat((max / cryptoPrices.btc).toFixed(precisionByCurrency.btc)),
  },
  eth: {
    min: parseFloat((min / cryptoPrices.eth).toFixed(precisionByCurrency.eth)),
    max: parseFloat((max / cryptoPrices.eth).toFixed(precisionByCurrency.eth)),
  },
  bnb: {
    min: parseFloat((min / cryptoPrices.bnb).toFixed(precisionByCurrency.bnb)),
    max: parseFloat((max / cryptoPrices.bnb).toFixed(precisionByCurrency.bnb)),
  },
  trx: {
    min: parseFloat((min / cryptoPrices.trx).toFixed(precisionByCurrency.trx)),
    max: parseFloat((max / cryptoPrices.trx).toFixed(precisionByCurrency.trx)),
  },
  mup: {
    min: 0.1,
    max: parseFloat((max / cryptoPrices.rp).toFixed(precisionByCurrency.mup)),
  },
  sol: {
    min: parseFloat((min / cryptoPrices.sol).toFixed(precisionByCurrency.sol)),
    max: parseFloat((max / cryptoPrices.sol).toFixed(precisionByCurrency.sol)),
  },
};

// Fonction d'arrondi selon la précision par devise
const roundToCurrencyPrecision = (amount, currency, maxPrecision = null) => {
  // Récupération de la précision par devise
  let precision = precisionByCurrency[currency];
  if (precision === undefined) {
    throw new Error(`Devise inconnue: ${currency}`);
  }

  // Cas spécial pour BTC avec maxPrecision = 0
  if (currency === 'btc' && maxPrecision === 0) {
    return amount.toFixed(precision); // Retourne une string avec les zéros
  }

  // Appliquer maxPrecision uniquement si la devise est BTC et maxPrecision est défini
  if (currency === 'btc' && maxPrecision !== null && maxPrecision >= 0) {
    return parseFloat(amount.toFixed(maxPrecision));
  }

  return parseFloat(amount.toFixed(precision));
};


const configWithdraw = {
  withdraw_fee: 1, // en pourcentage

  // Blockbee min = 0.00008 BTC (~7.58 $)
  btc: {
    minDeposit: 0.00012, // ~11.34 $
    min: 0.0002,        // ~17.01 $
    max: 0.0032,         // ~301.95 $
    precision: 8
  },

  // Blockbee min = 0.0045 ETH (~8.18 $)
  eth: {
    minDeposit: 0.0055,  // ~10.05 $
    min: 0.00825,        // ~15.08 $
    max: 0.17,           // ~310.62 $
    precision: 6
  },

  // Blockbee min = 10 TRX (~2.50 $)
  trx: {
    minDeposit: 12,      // ~3.00 $
    min: 20,             // ~4.50 $
    max: 1200,           // ~300.00 $
    precision: 2
  },

  // Blockbee min = 0.001 BNB (~0.59 $)
  bnb: {
    minDeposit: 0.002,   // ~1.18 $
    min: 0.005,          // ~1.77 $
    max: 0.51,           // ~301.90 $
    precision: 5
  },

  // Blockbee min = 0.0005 BCH (~0.18 $)
  bch: {
    minDeposit: 0.001,   // ~0.36 $
    min: 0.002,         // ~0.54 $
    max: 0.8,            // ~288.06 $
    precision: 4
  },

  // Blockbee min = 0.002 LTC (~0.18 $)
  ltc: {
    minDeposit: 0.003,   // ~0.26 $
    min: 0.005,         // ~0.39 $
    max: 3.5,            // ~304.37 $
    precision: 4
  },

  // Blockbee min = 10 DOGE (~1.73 $)
  doge: {
    minDeposit: 12,      // ~2.08 $
    min: 20,             // ~3.12 $
    max: 1800,           // ~312.30 $
    precision: 2
  },

  // Blockbee min = 0.004 SOL (~0.59 $)
  sol: {
    minDeposit: 0.006,   // ~0.88 $
    min: 0.01,          // ~1.32 $
    max: 2,              // ~294.00 $
    precision: 4
  }
};




// Export des configurations et de la fonction d'arrondi
export { configPlayAmount, roundToCurrencyPrecision, configWithdraw, precisionByCurrency };
