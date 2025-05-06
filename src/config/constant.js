import emailConfig from "./email_config";


export const COINTYPES = {
    BNB: { code: 'BNB', fullname: 'Binance Coin', token: 'bep20', decimal: 7, chain: 'BNB' },
    BTC: { code: 'BTC', fullname: 'Bitcoin', token: '', decimal: 5, chain: 'BTC' },
    BTC_LN: { code: 'BTC', fullname: 'Bitcoin Lightning', token: 'lightning', decimal: 5, chain: 'BTC' },
    BCH: { code: 'BCH', fullname: 'Bitcoin Cash', token: '', decimal: 5, chain: 'BCH' },
    LTC: { code: 'LTC', fullname: 'Litecoin', token: '', decimal: 5, chain: 'LTC' },
    DOGE: { code: 'DOGE', fullname: 'Dogecoin', token: 'native', decimal: 5, chain: 'DOGE' },
    ETH: { code: 'ETH', fullname: 'Ethereum', token: 'erc20', decimal: 5, chain: 'ETH' },
    TRX: { code: 'TRX', fullname: 'TRON', token: 'trc20', decimal: 5, chain: 'TRON' },
    SOL: { code: 'SOL', fullname: 'Solana', token: '', decimal: 5, chain: 'SOL' },
    RP: { code: 'RP', fullname: `${emailConfig.appName}`, token: 'erc20', decimal: 2, chain: 'ETH' }
};


export const CURRENCIES = {
    BNB: 'BNB',
    BTC: 'BTC',
    BCH: 'BCH',
    LTC: 'LTC',
    DOGE: 'DOGE',
    ETH: 'ETH',
    TRX: 'TRX',
    SOL: 'SOL',
    RP: 'RP'
};

export const BLACKJACK_CARD_RESULT = {
    NONE: 0,
    WIN: 1,
    LOST: 2,
    DRAW: 3
};

export const BLACKJACK_CARD_TYPE = {
    HEARTS: 'hearts',
    SPADES: 'spades',
    DIAMONDS: 'diamonds',
    CLUBS: 'clubs'
};

export const BLACKJACK_CARD_NUMBER = {
    NUMBER_2: '2',
    NUMBER_3: '3',
    NUMBER_4: '4',
    NUMBER_5: '5',
    NUMBER_6: '6',
    NUMBER_7: '7',
    NUMBER_8: '8',
    NUMBER_9: '9',
    NUMBER_10: '10',
    NUMBER_J: 'J',
    NUMBER_Q: 'Q',
    NUMBER_K: 'K',
    NUMBER_A: 'A'
};