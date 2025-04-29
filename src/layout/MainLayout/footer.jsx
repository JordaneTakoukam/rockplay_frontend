import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import FooterCoinItem from "./FooterCoinItem";
import { ReactComponent as FooterLogo } from "assets/icons/Logo.svg";
import { Telegram, Twitter } from "@mui/icons-material";

const useStyles = makeStyles(() => ({
    FooterBox: {
        width: '100%',
        background: '#282836',
        marginTop: '30px',
        padding: '37px 70px 13px 269px',
        "@media (max-width: 940px)": {
            padding: '20px'
        }
    },
    FooterCoinBox: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '44px',
        marginBottom: '33px',
        "@media (max-width: 681px)": {
            gap: '10px'
        }
    },
    DividLine: {
        width: '100%',
        height: '1px',
        background: '#FFF',
        opacity: '0.1',
        border: 'none'
    },
    GambleWareBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '22px',
        marginTop: '16px',
        marginBottom: '15px',
        "@media (max-width: 681px)": {
            flexWrap: 'wrap'
        }
    },
    CopyRightBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '25px',
        marginBottom: '20px',
        flexDirection: 'row', // Par défaut pour desktop
        "@media (max-width: 768px)": { // Modifier ici pour mobile
            flexDirection: 'column'
        }
    },

    CopyRightText: {
        fontWeight: '400',
        opacity: '0.4',
        color: '#FFF',
        fontSize: '13px',
        lineHeight: '16px'
    },
    ContactBox: {
        display: 'flex',
        flexDirection: 'row',
        gap: '6px',
        alignItems: 'center'
    },
    GambleIcon: {
        width: '225px',
        height: '54px'
    },
    GameCareIcon: {
        width: '94px',
        height: '27px'
    },
    IconLink: {
        color: "gray", // Couleur initiale
        transition: "color 0.3s ease", // Animation de transition
        "&:hover": {
            color: "#1DA1F2", // Couleur pour Twitter (bleu)
        },
        "&.telegram:hover": {
            color: "#0088cc", // Couleur pour Telegram
        },
    },
}));

const FooterCoins = [
    { 'btc': 'BitCoin' },
    { 'eth': 'Ethereum' },
    { 'bnb': 'Binance Coin' },
    { 'trx': 'TRON' },

    // { 'btclightning': 'BitcoinLightning' },
    // { 'xrp': 'XRP' },
    // { 'usdc': 'USDCoin' },
    // { 'doge': 'Dogecoin' },
    // { 'lite': 'Litecoin' },
    // { 'dash': 'Dash' },
    // { 'busd': 'BinanceUSD' },
    // { 'dai': 'DAI' },
    // { 'pancake': 'PancakeSwap' },
    // { 'shiba': 'SHIBA' },
    // { 'sushi': 'Sushi' },
    // { 'uniswap': 'Uniswap' },
    // { 'polygon': 'Polygon' },
    // { 'usdt': 'Tether' }
];

const MainFooter = () => {
    const classes = useStyles();

    return (
        <Box className={classes.FooterBox}>
            <Box className={classes.FooterCoinBox}>
                {
                    FooterCoins.map((item, index) => {
                        return (
                            <FooterCoinItem key={index} coin={item} />
                        );
                    })
                }
            </Box>
            <Box className={classes.DividLine}></Box>
            <Box className={classes.GambleWareBox}>
                <img src="/assets/images/gambleaware.png" alt="icon" className={classes.GambleIcon} />
                <img src="/assets/images/gamecare.png" alt="icon" className={classes.GameCareIcon} />
            </Box>
            <Box className={classes.DividLine}></Box>
            <Box className={classes.CopyRightBox}>
                <FooterLogo />
                <span className={classes.CopyRightText}>copyright ©2024</span>
                <Box className={classes.ContactBox}>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.IconLink}
                    >
                        <Twitter />
                    </a>
                    <a
                        href="https://telegram.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${classes.IconLink} telegram`}
                    >
                        <Telegram />
                    </a>
                </Box>

            </Box>
        </Box>
    );
};

export default MainFooter;