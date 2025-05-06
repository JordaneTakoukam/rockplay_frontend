import emailConfig from "./email_config";


const isLocal = process.env.REACT_APP_MODE === 'dev' ? true : false;

// const pro = 'https://www.api-root-rockplay.fun'; // url du backend
const pro = 'https://api-root.rockplay.fun'; // url du backend

const dev = 'http://localhost:5000';

const url = isLocal ? dev : pro;
//185.170.58.170
const Config = {
    Root: {
        baseUrl: isLocal ? 'http://localhost:8800' : 'https://www.rockplay.fun', // frontend
        apiUrl: `${url}/api`,
        socketServerUrl: isLocal ? `http://localhost:4000` : 'https://manages-services.rockplay.fun',
        socket: null,
        chatSocket: null,
        chatSocketUrl: isLocal ? 'http://localhost:4900' : 'https://chat-services.rockplay.fun',
        turtleraceSocketUrl: isLocal ? 'http://localhost:5100' : 'https://turtlerace-services.rockplay.fun',
        scissorsSocketUrl: isLocal ? 'http://localhost:5200' : 'https://scissor-services.rockplay.fun',
        minesSocketUrl: isLocal ? 'http://localhost:5300' : 'https://mines-services.rockplay.fun',
        diceSocketUrl: isLocal ? 'http://localhost:5400' : 'https://dice-services.rockplay.fun',
        slotSocketUrl: isLocal ? 'http://localhost:5500' : 'https://slot-services.rockplay.fun',
        plinkoSocketUrl: isLocal ? 'http://localhost:5600' : 'https://plinko-services.rockplay.fun',
        crashSocketUrl: isLocal ? 'http://localhost:5700' : 'https://crash-services.rockplay.fun'
    },
    // token: 'PlayZelo',
    token: emailConfig.appName,
    request: {
        getAuthData: '/auth/getAuthData',
        userGoogleLogin: '/auth/google-login',
        metamaskLogin: '/auth/metamask-login',
        emailLogin: '/auth/email-login',
        verifyEmailCode: '/auth/verifyEmailCode',
        updateProfileSet: '/auth/updateProfileSet',
        // getDepositAddress: '/v0/payment/deposit-address', //after from tatum
        getDepositAddress: '/v0/payment/deposit-blockbee-address',
        getMyBalance: '/auth/getMyBalance',
        getMyBalances: '/auth/getMyBalances',
        // withdraw: '/v0/payment/withdraw',
        withdraw: '/v0/payment/withdraw-blockbee-init',
        
        getDailyReward: '/v0/payment/get-daily-reward',
        getProfileData: '/auth/getProfileData',
        getDepositBonus: '/auth/getDepositBonus',
        getBetHistoryData: '/auth/getBetHistoryData',
        updateCurrency: '/auth/updateCurrency',
        updateProfileHistory: '/auth/updateProfileHistory',
        updateUserGameSetting: '/auth/updateUserGameSetting',
        getSeedData: '/auth/getSeedData',
        updateClientSeed: '/auth/updateClientSeed',
        updateServerSeed: '/auth/updateServerSeed',
        getLevelData: '/auth/getLevelData',
        getCurrencies: '/v0/payment/getCurrencies',
        getExchangeRate: '/v0/payment/getExchangeRate',
        swapCoin: '/v0/payment/swapCoin',
        getAvailableGames: '/auth/getAvailableGames',
        getBannerText: '/auth/getBannerText',
        getPrivacyData: '/auth/getPrivacyData',
        updatePrivacyData: '/auth/updatePrivacyData',
        getCampaignCode: '/auth/getCampaignCode',
        getCampaignData: '/auth/getCampaignData',
        claimCampaignAmount: '/auth/claimCampaignAmount',
        getUnlockBalance: '/auth/getUnlockBalance',
        getWargerBalance: '/auth/getWargerBalance',
        claimLockedBalance: '/auth/claimLockedBalance',
        getSpinCount: '/auth/getSpinCount',
        updateSpinCount: '/auth/updateSpinCount',
        getTournamentList: '/auth/getTournamentList',
        participateTournament: '/auth/participateTournament',
        getAffiliateUsersData: '/auth/getAffiliateUsersData',
        getAffiliateEarningData: '/auth/getAffiliateEarningData',
        getTournamentWargerDetail: '/auth/getTournamentWargerDetail',
        getCampaignList: '/auth/getCampaignList',
        addCampaignList: '/auth/addCampaignList',
        getCampaignDetail: '/auth/getCampaignDetail',
        getTransactionHistory: '/auth/getTransactionHistory'
    }
};

export default Config;