import { Box, Button, Slider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DiceL from "./utils/DiceL";
import DiceR from "./utils/DiceR";
import DiceSocketManager from "./utils/DiceSocketManager";
import HistoryItem from "./utils/HistoryItem";
import { useToasts } from "react-toast-notifications";
import HistoryBox from "./utils/HistoryBox";
import FlipMove from "react-flip-move";
import EmptyItem from "./utils/EmptyItem";
import { LoadingButton } from "@mui/lab";
import { useRef } from "react";
import SettingBox from "views/components/setting";
import useSound from "use-sound";
import bgSound from "assets/sounds/bitkong/bg.mp3";
import clickSound from "assets/sounds/bitkong/cell-click.mp3";
import lostSound from "assets/sounds/bitkong/lost.mp3";
import profitSound from "assets/sounds/bitkong/profit.mp3";
import { configPlayAmount } from "config/config_play_amount";
import LoadingGameBox from "views/loading_box/loading_game_box";

const ChanceData = [
    { over: 3, under: 11, multiplier: 1.03, chance: 91.67 },
    { over: 4, under: 10, multiplier: 1.14, chance: 83.33 },
    { over: 5, under: 9, multiplier: 1.31, chance: 72.22 },
    { over: 6, under: 8, multiplier: 1.62, chance: 58.33 },
    { over: 7, under: 7, multiplier: 2.28, chance: 41.67 },
    { over: 8, under: 6, multiplier: 3.42, chance: 27.78 },
    { over: 9, under: 5, multiplier: 5.70, chance: 16.67 },
    { over: 10, under: 4, multiplier: 11.40, chance: 8.33 },
    { over: 11, under: 3, multiplier: 34.20, chance: 2.78 }
];

const useStyles = makeStyles(() => ({
    MainContainer: {
        width: '100%',
        paddingRight: '50px',
        "@media (max-width: 940px)": {
            padding: '0px'
        }
    },
    GamePanelBox: {
        width: '100%',
        height: 'calc(100vh - 85px)', // Correction de l'unité pour `vh`
        borderRadius: '30px',
        backgroundImage: 'url("/assets/images/dice/background.png")',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        position: 'relative',
        overflow: 'hidden',
        "@media (max-width: 940px)": {
            height: 'calc(70vh)',
        },
        "@media (max-width: 681px)": {
            height: '641px',
        }
    },
    DicePanelBox: {
        position: 'absolute',
        backgroundImage: 'url("/assets/images/dice/PanelBg.png")',
        width: '586px',
        height: 'calc(100vh - 75px)',
        top: '8px',
        backgroundSize: 'cover',
        left: 'calc((100% - 586px) / 2)',
        "@media (max-width: 681px)": {
            backgroundImage: 'url("/assets/images/dice/PanelBgMobile.png")',
            width: 'calc(100vw - 30px)',
            left: '15px',
            backgroundSize: '100% 100%',
            height: '552px',
            marginTop: "60px"

        }
    },
    WolfImage: {
        position: 'absolute',
        width: '284px',
        top: '331px',
        left: 'calc((100% - 284px) / 2 - 400px)'
    },
    ManImage: {
        position: 'absolute',
        width: '717px',
        top: '8px',
        right: 'calc((100% - 717px) / 2 - 363px)'
    },
    HistoryBox: {
        width: '100%',
        display: 'flex',
        gap: '5px',
        height: '42px',
        overflow: 'hidden',
        justifyContent: 'flex-end',
        "@media (max-width: 681px)": {
            height: '34px'
        }
    },
    DiceBox: {
        width: '100%',
        backgroundImage: 'url("/assets/images/dice/DicePanel.png")',
        height: '25vh',
        backgroundSize: '100% 100%',
        marginTop: '21px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
        "@media (max-width: 681px)": {
            marginTop: '17px',
            height: '184px'
        }
    },
    Dices: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
    },
    BottomBox: {
        width: '190px',
        height: '9px',
        background: '#FDF6CB',
        "@media (max-width: 681px)": {
            width: '150px',
            height: '7px'
        }
    },
    SubBox: {
        marginTop: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        "@media (max-width: 681px)": {
            marginTop: '9px'
        }
    },
    MultipleBox: {
        width: 'calc(50% - 4px)',
        height: '31px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 14px',
        backgroundImage: 'url("/assets/images/dice/MultipleBg.png")',
        backgroundSize: '100% 100%',
        "&>span": {
            fontFamily: "'Styrene A Web'",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "12px",
            lineHeight: "15px",
            color: "#FFFFFF"
        },
        "@media (max-width: 681px)": {
            height: '25px'
        }
    },
    ChanceBox: {
        width: 'calc(50% - 4px)',
        height: '31px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 14px',
        backgroundImage: 'url("/assets/images/dice/ChanceBg.png")',
        backgroundSize: '100% 100%',
        "&>span": {
            fontFamily: "'Styrene A Web'",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "12px",
            lineHeight: "15px",
            color: "#FFFFFF"
        },
        "@media (max-width: 681px)": {
            height: '24px'
        }
    },
    PayoutBox: {
        width: '100%',
        height: '31px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 14px',
        backgroundImage: 'url("/assets/images/dice/PayoutBg.png")',
        backgroundSize: '100% 100%',
        "&>span": {
            fontFamily: "'Styrene A Web'",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "12px",
            lineHeight: "15px",
            color: "#FFFFFF"
        },
        "@media (max-width: 681px)": {
            height: '25px'
        }
    },
    DeactiveUnderBox: {
        backgroundImage: 'url("/assets/images/dice/UnderBg1.png") !important',
        opacity: '0.5'
    },
    UnderBox: {
        width: 'calc(50% - 4px)',
        height: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0px 14px',
        backgroundImage: 'url("/assets/images/dice/UnderBg.png")',
        backgroundSize: '100% 100%',
        "&>span": {
            fontFamily: "'Styrene A Web'",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "17px",
            lineHeight: "22px",
            color: "#FFFFFF"
        },
        "&>label": {
            fontFamily: "'Styrene A Web'",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "12px",
            lineHeight: "11px",
            color: "#FFFFFF"
        },
        "@media (max-width: 681px)": {
            height: '44px'
        }
    },
    DeactiveOverBox: {
        backgroundImage: 'url("/assets/images/dice/OverBg1.png") !important',
    },
    OverBox: {
        width: 'calc(50% - 4px)',
        height: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0px 14px',
        backgroundImage: 'url("/assets/images/dice/OverBg.png")',
        backgroundSize: '100% 100%',
        "&>span": {
            fontFamily: "'Styrene A Web'",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "17px",
            lineHeight: "22px",
            color: "#FFFFFF"
        },
        "&>label": {
            fontFamily: "'Styrene A Web'",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "12px",
            lineHeight: "11px",
            color: "#FFFFFF"
        },
        "@media (max-width: 681px)": {
            height: '44px'
        }
    },
    SliderBox: {
        marginTop: '12px',
        width: '100%',
        height: '50px',
        backgroundColor: '#424253',
        padding: '16px 16px 0px 22px',
        "@media (max-width: 681px)": {
            height: '43px',
            padding: '12px 13px 0px 17px',
            marginTop: '9px'
        }
    },
    CustomSlider: {
        padding: '0px',
        height: '8px',
        "& .MuiSlider-thumb": {
            width: '30px',
            height: '30px',
            backgroundImage: 'url("/assets/images/dice/Spin-Thumb.png")',
            backgroundSize: '100% 100%',
            color: 'transparent',
            '&:focus, &:hover, &.Mui-active': {
                boxShadow: 'unset'
            },
            "&:before": {
                content: 'unset'
            },
            "@media (max-width: 681px)": {
                width: '35px',
                height: '40px',
            }
        },
        "& .MuiSlider-rail": {
            color: '#101013'
        }
    },
    PlayButton: {
        width: '100%',
        height: '40px',
        backgroundImage: 'url("/assets/images/dice/PlayBg.png")',
        backgroundSize: '100% 100%',
        fontFamily: "'Styrene A Web'",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "17px",
        lineHeight: "22px",
        textAlign: "center",
        textTransform: "uppercase",
        color: "#FFFFFF",
        "@media (max-width: 681px)": {
            height: '41px'
        }
    },
    AmountInputBox: {
        marginTop: "8px",
        width: '100%',
        color: 'rgb(223, 245, 255)',
        flex: '1 1 0%',
        outline: 'none',
        background: 'transparent',
        border: 'none',
        fontWeight: '700',
        lineHeight: '1',
        margin: '0px 10px 0px 0px',
        fontSize: '24px',
        "&:disabled": {
            color: "rgb(183, 199, 208)",
            cursor: 'not-allowed',
            pointerEvents: 'auto'
        },
        backgroundImage: 'url("/assets/images/mines/InputBg.png")',
        backgroundSize: '100% 100%',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        "@media (max-width: 681px)": {
            height: '39px'
        }
    },
    AmountInput: {
        width: 'calc(100% - 221px)',
        height: '100%',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        fontFamily: "'Styrene A Web'",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "17px",
        lineHeight: "21px",
        textTransform: "uppercase",
        color: "#FFFFFF",
        marginLeft: '5px'
    },
    CoinItem: {
        marginLeft: '16px',
        width: '35px',
        marginTop: '3px'
    },
    AmountActionBox: {
        display: 'flex',
        height: '100%'
    },
    AmountActionButton: {
        backgroundColor: '#4D3C6A',
        width: '55px',
        minWidth: '55px',
        borderRadius: '0px',
        fontFamily: "'Styrene A Web'",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "14px",
        lineHeight: "16px",
        textTransform: "uppercase",
        color: "#FFFFFF",
        height: '100%'
    },
    AmountMiddleButton: {
        backgroundColor: '#734FA1'
    },
    HistoryTable: {
        marginTop: '24px'
    },
    MainPanelBox: {
        position: 'relative',
        width: '100%',
        height: '100%',
        padding: '24px 61px 0px 63px',
        "@media (max-width: 681px)": {
            padding: '18px 15px 0px'
        }
    }
}));








const Dice = () => {


    const [loading, setLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(0);

    const images = [
        '/assets/images/dice/background.png',
        '/assets/images/dice/PanelBg.png',
        '/assets/images/dice/PanelBgMobile.png',
        '/assets/images/dice/DicePanel.png',
        '/assets/images/dice/MultipleBg.png',
        '/assets/images/dice/ChanceBg.png',
        '/assets/images/dice/PayoutBg.png',
        '/assets/images/dice/UnderBg1.png',
        '/assets/images/dice/UnderBg.png',
        '/assets/images/dice/OverBg1.png',
        '/assets/images/dice/OverBg.png',
        '/assets/images/dice/Spin-Thumb.png',
        '/assets/images/dice/PlayBg.png',
        '/assets/images/mines/InputBg.png',
        '/assets/images/dice/wolf.png',
        '/assets/images/dice/man.png'
    ];

    // Fonction de préchargement des images avec async/await
    const preloadImages = async () => {
        const promises = images.map((src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    setImagesLoaded((prevCount) => prevCount + 1);  // Mettre à jour le compteur des images chargées
                    resolve();
                };
                img.onerror = () => {
                    // En cas d'erreur de chargement, considérer l'image comme chargée
                    setImagesLoaded((prevCount) => prevCount + 1);
                    resolve();
                };
            });
        });

        // Attendre que toutes les images soient chargées
        await Promise.all(promises);
    };

    // Quand le composant est monté, on lance le préchargement des images
    useEffect(() => {
        preloadImages();
    }, []);


    // Quand toutes les images sont chargées, on met à jour le chargement
    useEffect(() => {
        if (imagesLoaded === images.length) {
            setLoading(false);

            //     const randomTime = Math.floor(Math.random() * 1000) + 1000; // entre 1000ms (1s) et 2000
            //     setTimeout(() => {
            //         setLoading(false); // Une fois le délai écoulé, mettre loading à false
            //     }, randomTime);
        }
    }, [imagesLoaded, images.length]); // Dépendance sur `images.length`






    // -----------------------











    // montant de jeux et paris min et max
    const [setting, setSetting] = useState({ min: 0, max: 0 });
    const [betAmount, setBetAmount] = useState(0);


    const classes = useStyles();
    const dispatch = useDispatch();
    const { addToast } = useToasts();

    const authData = useSelector((state) => state.authentication);
    const currency = authData.isAuth ? authData.userData.currency : '';

    const settingData = useSelector((state) => state.settingOption);
    const animation = settingData.animation;

    const [playBgSound, bgSoundOption] = useSound(bgSound);
    const [playClickSound] = useSound(clickSound);
    const [playLostSound] = useSound(lostSound);
    const [playProfitSound] = useSound(profitSound);

    const step = 12.5;
    const [sliderValue, setSliderValue] = useState(0);

    const [isOver, setIsOver] = useState(true);
    const difficulty = parseInt(Number(sliderValue / step));

    const [betResponse, setBetResponse] = useState(null);
    const [historyData, setHistoryData] = useState([]);
    const [diceData, setDiceData] = useState({ l: 6, r: 6 });
    const [playLoading, setPlayLoading] = useState(false);

    const diceBottomRef = useRef();

    useEffect(() => {
        DiceSocketManager.getInstance().connect(authData);
        window.addEventListener('message', onWindowMessage);
        return () => {
            DiceSocketManager.getInstance().disconnect();
            window.removeEventListener('message', onWindowMessage);
            bgSoundOption.stop();
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (settingData.sound && settingData.backgroundSound) {
            playBgSound();
        }
        if (!settingData.sound || !settingData.backgroundSound) {
            bgSoundOption.stop();
        }
        return () => {
            bgSoundOption.stop();
        }
        // eslint-disable-next-line
    }, [settingData]);

    // useEffect(() => {
    //     if (betAmount > setting.max) {
    //         setBetAmount(setting.max);
    //     }
    //     else if (betAmount < setting.min) {
    //         setBetAmount(setting.min);
    //     }
    //     // eslint-disable-next-line
    // }, [betAmount]);

    useEffect(() => {
        if (betResponse !== null) {
            if (betResponse.status) {
                if (animation)
                    document.getElementsByClassName('DiceAnimContainer')[0].classList.add('DiceAnimate');

                let roundData = betResponse.roundData;
                let history = {
                    countL: roundData.fairData.l,
                    countR: roundData.fairData.r,
                    win: roundData.roundResult === 'win'
                };
                setDiceData({ ...roundData.fairData });

                let oldHistory = [...historyData, history];
                setHistoryData([...oldHistory]);
                dispatch({ type: 'SET_BALANCEDATA', data: betResponse.data.balance.data });

                playEffectSound(roundData.roundResult === 'win' ? playProfitSound : playLostSound);

                setTimeout(() => {
                    setPlayLoading(false);
                    if (roundData.roundResult === 'win')
                        diceBottomRef.current.style.backgroundColor = "#FDF6CB";
                    else
                        diceBottomRef.current.style.backgroundColor = "#F00";
                }, animation ? 300 : 0);
            }
            else {
                addToast(betResponse.message, { appearance: 'error', autoDismiss: true });
            }
        }
        // eslint-disable-next-line
    }, [betResponse]);

    const handleChangeSlider = (event, value) => {
        setSliderValue(value)
        playEffectSound(playClickSound);
    };

    const handleBetAmount = (e) => {
        setBetAmount(e.target.value);
    };

    const handleAmountAction = (type) => {
        switch (type) {
            case 0:
                setBetAmount(betAmount / 2);
                break;
            case 1:
                setBetAmount(betAmount * 2);
                break;
            case 2:
                setBetAmount(setting.max);
                break;
            default:
                break;
        }
    };

    const setOver = (flag) => {
        setIsOver(flag);
        playEffectSound(playClickSound);
    };

    const handlePlay = () => {

        if (authData.isAuth) {

            var currentCoin = currency?.coinType?.toLowerCase();

            if (currentCoin != null) {
                if (betAmount < configPlayAmount[currentCoin].min) {
                    addToast(`Min amount is ${configPlayAmount[currentCoin].min} ${currentCoin}`, { appearance: 'error', autoDismiss: true });

                } else if (betAmount > configPlayAmount[currentCoin].max) {
                    addToast(`Max amount is ${configPlayAmount[currentCoin].max} ${currentCoin}`, { appearance: 'error', autoDismiss: true });

                } else {
                    playEffectSound(playClickSound);
                    const requestData = {
                        userId: authData.userData._id,
                        betAmount: betAmount,
                        coinType: currency,
                        isOver: isOver,
                        difficulty: difficulty
                    };
                    document.getElementsByClassName('DiceAnimContainer')[0].classList.remove('DiceAnimate');
                    DiceSocketManager.getInstance().joinBet(requestData);
                    diceBottomRef.current.style.backgroundColor = "#FDF6CB";
                    setPlayLoading(true);
                }
            }

        }
        else {
            addToast('Please login and try again', { appearance: 'warning', autoDismiss: true });
        }
    };

    const onWindowMessage = (event) => {
        if (event?.data?.type === 'playzelo-Dice-BetResult') {

            if (event.data.data.roundData.roundResult == 'win') {
                addToast('You won this round', { appearance: 'success', autoDismiss: true });

            }

            else if (event.data.data.roundData.roundResult == 'lost') {
                addToast('You lost this round', { appearance: 'warning', autoDismiss: true });
            }

            setBetResponse({ ...event.data.data });




        }
    };

    const playEffectSound = (soundPlay) => {
        if (settingData.sound && settingData.effectSound) {
            soundPlay();
        }
    };


    // mettre a jour le min et le max au changement de cryptomonnaie
    useEffect(() => {
        if (currency?.coinType?.toLowerCase() != null) {
            setSetting({
                min: configPlayAmount[currency?.coinType?.toLowerCase()].min,
                max: configPlayAmount[currency?.coinType?.toLowerCase()].max,
            });
        } else {
            setSetting({
                min: 0,
                max: 0,
            })
        }

    }, [currency, currency.coinType]);

    return (


        <>
            {

                <Box className={classes.MainContainer}>

                    {loading &&
                        <LoadingGameBox />
                    }
                    <Box className={classes.GamePanelBox}>
                        <SettingBox />
                        <img src="/assets/images/dice/wolf.png" alt="wolf" className={classes.WolfImage} />
                        <img src="/assets/images/dice/man.png" alt="man" className={classes.ManImage} />
                        <Box className={classes.DicePanelBox}>
                            <Box className={classes.MainPanelBox}>

                                {/* hostorique jouer en haut a droite */}
                                <FlipMove className={clsx(classes.HistoryBox, 'HistoryContainer')}>
                                    {
                                        historyData.length > 0 ?
                                            historyData.map((item, index) => (
                                                <Box key={index}>
                                                    <HistoryItem {...item} index={index} />
                                                </Box>
                                            ))
                                            :
                                            <Box key={0}>
                                                <EmptyItem countL={6} countR={6} />
                                            </Box>
                                    }
                                </FlipMove>


                                {/*  De jouer */}
                                <Box className={classes.DiceBox}>
                                    <Box className={clsx(classes.Dices, "DiceAnimContainer")}>
                                        <DiceL count={diceData.l} />
                                        <DiceR count={diceData.r} />
                                    </Box>
                                    <Box className={classes.BottomBox} ref={diceBottomRef}></Box>
                                </Box>



                                <Box className={classes.SubBox}>
                                    <Box className={classes.MultipleBox}>
                                        <span>MULTIPLIER</span>
                                        <span>x{ChanceData[difficulty].multiplier}</span>
                                    </Box>
                                    <Box className={classes.ChanceBox}>
                                        <span>CHANCE</span>
                                        <span>{ChanceData[difficulty].chance}%</span>
                                    </Box>
                                </Box>
                                <Box className={classes.SubBox}>
                                    <Box className={classes.PayoutBox}>
                                        <span>PAYOUT</span>
                                        <span>{Number(betAmount * ChanceData[difficulty].multiplier).toFixed(2)}</span>
                                    </Box>
                                </Box>

                                {/* bouton  under / over */}
                                <Box className={classes.SubBox}>
                                    <Button className={clsx(classes.UnderBox, isOver ? classes.DeactiveUnderBox : '')} onClick={() => setOver(false)}>
                                        <span>UNDER {ChanceData[difficulty].under}</span>
                                        <label>x{ChanceData[difficulty].multiplier}</label>
                                    </Button>
                                    <Button className={clsx(classes.OverBox, !isOver ? classes.DeactiveOverBox : '')} onClick={() => setOver(true)}>
                                        <span>OVER {ChanceData[difficulty].over}</span>
                                        <label>x{ChanceData[difficulty].multiplier}</label>
                                    </Button>
                                </Box>



                                {/* multiplacteur */}
                                <Box className={classes.SliderBox}>
                                    <Slider
                                        valueLabelDisplay="off"
                                        step={step}
                                        track={false}
                                        className={classes.CustomSlider}
                                        value={sliderValue}
                                        onChange={handleChangeSlider}
                                    />
                                </Box>

                                {/* bouton play */}
                                <Box className={classes.SubBox}>
                                    <LoadingButton loading={playLoading} className={classes.PlayButton} onClick={handlePlay}>PLAY</LoadingButton>
                                </Box>


                                {/* input */}
                                <Box className={clsx(classes.SubBox, classes.AmountInputBox)}>
                                    <img src={`/assets/images/coins/${currency?.coinType?.toLowerCase()}.png`} alt="mup" className={classes.CoinItem} />
                                    <input className={classes.AmountInput} type="number" value={betAmount} onChange={handleBetAmount} />
                                    <Box className={classes.AmountActionBox}>
                                        <Button onClick={() => handleAmountAction(0)} className={classes.AmountActionButton}>1/2</Button>
                                        <Button onClick={() => handleAmountAction(1)} className={clsx(classes.AmountActionButton, classes.AmountMiddleButton)}>2X</Button>
                                        <Button onClick={() => handleAmountAction(2)} className={classes.AmountActionButton}>Max</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.HistoryTable}>
                        <HistoryBox />
                    </Box>
                </Box>

            }

        </>
    );
};

export default Dice;