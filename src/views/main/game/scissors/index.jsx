import { Box, Button, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ScissorsSocketManager from "./utils/ScissorsSocketManager";
import HistoryBox from "./utils/HistoryBox";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { useToasts } from "react-toast-notifications";
import SettingBox from "views/components/setting";
import { LoadingButton } from "@mui/lab";

import ApngComponent from "react-apng";

import VSAnimation from "assets/images/VS.png";

import PaperAnimation from "assets/images/paper.png";
import RockAnimation from "assets/images/rock.png";
import ScissorAnimation from "assets/images/scissors.png";

// import IdleAnimation from "assets/images/idle.png";
// import DrawAnimation from "assets/images/draw.png";
// import WinAnimation from "assets/images/win.png";
// import LostAnimation from "assets/images/lost.png";
import { configPlayAmount } from "config/config_play_amount";
import LoadingGameBox from "views/loading_box/loading_game_box";

const ScissorData = ['rock', 'scissors', 'paper'];

const useStyles = makeStyles(() => ({
    // largeur de la game screen
    MainContainer: {
        width: '100%',
        paddingRight: '50px',
        "@media (max-width: 940px)": {
            paddingRight: '0px'
        },
    },


    // Ecran de jeux de jeux
    GamePanelBox: {
        width: '100%',
        height: 'calc(100vh - 85px)', // Correction de l'unité pour `vh`
        borderRadius: '30px',
        backgroundImage: 'url("/assets/images/scissor/background.png")',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        position: 'relative',
        overflow: 'hidden',
        "@media (max-width: 940px)": {
            borderRadius: '0px',
            height: 'calc(100vh - 75px)',

        }
    },
    HistoryTable: {
        marginTop: '24px'
    },
    FreeGuessingBox: {
        width: '371px',
        height: '50px',
        backgroundImage: 'url("/assets/images/scissor/FreeBg.png")',
        backgroundSize: '100% 100%',
        position: 'absolute',
        top: '8px',
        left: '50%',
        transform: 'translate(-50%)',
        fontFamily: "'Styrene A Web'",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "21px",
        lineHeight: "27px",
        textTransform: "uppercase",
        color: "#FFFFFF",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        "@media (max-width: 940px)": {
            width: 203,
            height: 36,
            fontSize: 12,
            lineHeight: '15px',
            left: 29,
            transform: 'unset',
        }
    },
    HistoryBox: {
        position: 'absolute',
        top: '85px',
        left: '50%',
        transform: 'translate(-50%)',
        display: 'flex',
        flexDirection: 'row',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'center',
        "&>img": {
            width: '61px'
        },
        "@media (max-width: 940px)": {
            top: 53,
            left: 30,
            transform: 'unset',
            gap: 7,
            "&>img": {
                width: 33
            }
        }
    },

    // me et dealer
    PlayerBox: {
        width: '220px',
        height: '66px',
        backgroundSize: '100% 100%',
        fontFamily: "'Styrene A Web'",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "18px",
        lineHeight: "23px",
        textTransform: "uppercase",
        color: "#FFFFFF",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '70px',
        "@media (max-width: 940px)": {
            width: 157,
            height: 52,
            fontSize: 12,
            lineHeight: '15px',
            top: 106
        }
    },
    // main gauche
    LeftBox: {
        backgroundImage: 'url("/assets/images/scissor/MeBg.png")',
        left: '70px',
        "@media (max-width: 940px)": {
            left: 14
        }
    },
    // main gauche
    RightBox: {
        backgroundImage: 'url("/assets/images/scissor/DlBg.png")',
        right: '70px',
        "@media (max-width: 940px)": {
            right: 14
        }
    },
    VSBox: {
        width: '702px',
        height: '565px',
        position: 'absolute',
        top: '0px',
        left: '50%',
        transform: 'translate(-50%)',
        "&>canvas": {
            width: '100%'
        },
        "@media (max-width: 940px)": {
            width: 351,
            height: 'unset',
            bottom: 223,
            top: 'unset'
        }
    },
    HandBox: {
        position: 'absolute',
        top: '100px',
        "&>canvas": {
            width: '300px'
        },
        "@media (max-width: 1440px)": {
            top: '16%',
            "&>canvas": {
                width: '250px'
            }
        },
        "@media (min-width: 940px)": {
            //     top: '18%',
            "&>canvas": {
                width: '350px'
            }
        }
    },
    LeftHand: {
        left: '0px',
        transformOrigin: 'left center'
    },
    RightHand: {
        right: '0px',
        transformOrigin: 'right center'
    },
    BetActionBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '19px',
        position: 'absolute',
        bottom: '5px',
        width: '100%',
        "@media (max-width: 940px)": {
            flexDirection: 'column',
            bottom: 10,
            gap: 5
        }
    },
    AmountInputBox: {
        backgroundImage: 'url("/assets/images/scissor/AmountBg.png")',
        backgroundSize: '100% 100%',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        "@media (max-width: 940px)": {
            width: '100%'
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
        height: '90%'
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
    BetTypeBox: {
        backgroundImage: 'url("/assets/images/scissor/SelectBg.png")',
        width: '278px',
        height: '40px',
        backgroundSize: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '10px',
        paddingLeft: '9px',
        "@media (max-width: 940px)": {
            height: 37,
            width: '100%',
            paddingRight: 20
        }
    },
    PlayButton: {
        backgroundImage: 'url("/assets/images/scissor/PlayBg.png")',
        width: '280px',
        height: '40px',
        fontFamily: "'Styrene A Web'",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "16px",
        lineHeight: "20px",
        textAlign: "center",
        textTransform: "uppercase",
        color: "#FFFFFF",
        "@media (max-width: 940px)": {
            height: 37,
            width: '100%'
        }
    },
    SelectButton: {
        width: '40px',
        height: '40px',
        minWidth: '40px',
        borderRadius: '0px',
        "&>img": {
            width: '40px',
            height: '40px'
        },
        "@media (max-width: 940px)": {
            width: 30,
            height: 30,
            "&>img": {
                width: 30,
                height: 30
            }
        }
    },
    RandomButton: {
        width: '100px',
        height: '40px',
        backgroundColor: '#FED847',
        borderRadius: '5px',
        fontFamily: "'Styrene A Web'",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "12px",
        lineHeight: "15px",
        textTransform: "uppercase",
        color: "#1F1E25",
        "@media (max-width: 940px)": {
            marginLeft: 'auto'
        }
    },
    SelectedType: {
        border: 'solid 2px red'
    },
    ResultBox: {
        position: 'absolute',
        zIndex: 10,
        top: '-10px',
        left: '50%',
        transform: 'translate(-50%)',
        "@media (max-width: 940px)": {
            "&>img": {
                width: 735
            }
        }
    },
    IdleAnimation: {
        position: 'absolute',
        bottom: '70px',
        left: '',
        "@media (max-width: 1440px)": {
            bottom: 68,
            width: 418,
            left: 'calc((100% - 400px) / 2 + 14.5px)'
        },
        "@media (max-width: 940px)": {
            bottom: 136,
            width: 450,
            left: 'calc((100% - 385px) / 2)'
        }
    },
    WinAnimation: {
        position: 'absolute',
        bottom: '0px',
        left: 'calc((100% - 789px) / 2 - 106px)',
        "@media (max-width: 1440px)": {
            bottom: 11,
            width: 641,
            left: 'calc((100% - 871px) / 2 - 41px)'
        },
        "@media (max-width: 940px)": {
            bottom: 101,
            width: 519.5,
            left: 'calc((100% - 469.5px) / 2 - 65px)'
        }
    },
    LostAnimation: {
        position: 'absolute',
        bottom: '0px',
        left: 'calc((100% - 565px) / 2 - 67.5px)',
        "@media (max-width: 1440px)": {
            bottom: 70,
            width: 513,
            left: 'calc((100% - 503px) / 2 - 57.5px)'
        },
        "@media (max-width: 940px)": {
            bottom: 101,
            width: 508,
            left: 'calc((100% - 458px) / 2 - 45.5px)'
        }
    },
    DrawAnimation: {
        position: 'absolute',
        bottom: '0px',
        left: 'calc((100% - 766px) / 2 - 67.5px)',
        "@media (max-width: 1440px)": {
            bottom: 11,
            width: 633,
            left: 'calc((100% - 553px) / 2 - 57.5px)'
        },
        "@media (max-width: 940px)": {
            bottom: 101,
            width: 558,
            left: 'calc((100% - 458px) / 2 - 45.5px)'
        }
    }

}));

const ScissorWidget = () => {

    const [loading, setLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(0);

    const images = [

        '/assets/images/scissor/background.png',
        '/assets/images/scissor/AmountBg.png',

        '/assets/images/scissor/block_paper.png',
        '/assets/images/scissor/block_rock.png',
        '/assets/images/scissor/block_scissors.png',


        '/assets/images/scissor/DlBg.png',
        '/assets/images/scissor/FreeBg.png',
        '/assets/images/scissor/PlayBg.png',
        '/assets/images/scissor/SelectBg.png',


        'assets/images/scissor/draw.png',
        'assets/images/scissor/lost.png',
        'assets/images/scissor/win.png',


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
            const randomTime = Math.floor(Math.random() * 500) + 1000; // entre 0.5 (3s) et 1 (5s)
            setTimeout(() => {
                setLoading(false); // Une fois le délai écoulé, mettre loading à false
            }, randomTime);
        }
    }, [imagesLoaded, images.length]); // Dépendance sur `images.length`






    // ----------------------------------------------------------


    const classes = useStyles();
    const { addToast } = useToasts();



    const authData = useSelector((state) => state.authentication);
    const currency = authData.isAuth ? authData.userData.currency : '';

    const [betHistory, setBetHistory] = useState([]);
    const [betType, setBetType] = useState(0);

    const [betResponse, setBetResponse] = useState(null);
    const [winImage, setWinImage] = useState('');

    const [showWinResult, setShowWinResult] = useState(false);
    const [playLoading, setPlayLoading] = useState(false);

    const winResultref = useRef();
    const lostResultref = useRef();
    const drawResultref = useRef();
    const vsRef = useRef();

    const leftIdleRef = useRef();
    const leftRockRef = useRef();
    const leftScissorRef = useRef();
    const leftPaperRef = useRef();

    const rightIdleRef = useRef();
    const rightRockRef = useRef();
    const rightScissorRef = useRef();
    const rightPaperRef = useRef();


    const [setting, setSetting] = useState({ min: 0, max: 0 });
    const [betAmount, setBetAmount] = useState(0);

    // var setting = { max: configPlayAmount[currency?.coinType?.toLowerCase()].min, min: 0.00001 };
    const rate = 1.5;




    const [handAnimationData, setHandAnimationData] = useState({
        show: false,
        hand: {
            player: 0,
            dealer: 0
        }
    });
    const [vikingAnimationData, setVikingAnimationData] = useState({
        show: false,
        result: 0, //1: win, 2: lost, 3: draw,
    });
    const [vsAnimationData, setVsAnimationData] = useState(false);

    useEffect(() => {
        window.addEventListener('message', onWindowMessage);
        ScissorsSocketManager.getInstance().connect(authData);
        ScissorsSocketManager.getInstance().getHistoryData();

        return () => {
            window.removeEventListener('message', onWindowMessage);
            ScissorsSocketManager.getInstance().disconnect();
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (betResponse !== null) {
            if (!betResponse.result.status) {
                addToast(betResponse.result.message, { appearance: 'error', autoDismiss: true });
                setPlayLoading(false);
                return;
            }
            setVsAnimationData(true);
            setHandAnimationData({
                show: true,
                hand: {
                    player: betResponse.playerNumber,
                    dealer: betResponse.dealerNumber
                }
            });
            setVikingAnimationData({
                show: true,
                result: betResponse.winResult === 'win' ? 1 : betResponse.winResult === 'lost' ? 2 : 3
                // result: 3
            });

            setTimeout(() => {
                ScissorsSocketManager.getInstance().getHistoryData();
                setShowWinResult(true);
                setWinImage(betResponse.winResult);
            }, 5000);
        }
        // eslint-disable-next-line
    }, [betResponse]);

    useEffect(() => {
        if (showWinResult) {
            setTimeout(() => {
                setShowWinResult(false);
                setPlayLoading(false);
            }, 3200);
        }
        // eslint-disable-next-line
    }, [showWinResult]);


    useEffect(() => {
        // Assurez-vous que vsRef est bien défini avant d'y accéder

        try {
            vsRef.current.style.opacity = 0;
        } catch (e) { }

    }, []);

    // configurer le minimum et maximum
    // useEffect(() => {
    //     if (betAmount > setting.max) {
    //         setBetAmount(setting.max);
    //     }
    //     if (betAmount < setting.min) {
    //         setBetAmount(setting.min);
    //     }
    //     // eslint-disable-next-line
    // }, [betAmount]);



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


    useEffect(() => {
        if (handAnimationData.show) {
            if (handAnimationData.hand.player === 0) {
                leftRockRef.current.one();
                updateHandRef('left', 'RockRef');
            }
            else if (handAnimationData.hand.player === 1) {
                leftScissorRef.current.one();
                updateHandRef('left', 'ScissorRef');
            }
            else if (handAnimationData.hand.player === 2) {
                leftPaperRef.current.one();
                updateHandRef('left', 'PaperRef');
            }

            if (handAnimationData.hand.dealer === 0) {
                rightRockRef.current.one();
                updateHandRef('right', 'RockRef');
            }
            else if (handAnimationData.hand.dealer === 1) {
                rightScissorRef.current.one();
                updateHandRef('right', 'ScissorRef');
            }
            else if (handAnimationData.hand.dealer === 2) {
                rightPaperRef.current.one();
                updateHandRef('right', 'PaperRef');
            }

            setTimeout(() => {
                setHandAnimationData({
                    show: false,
                    hand: {
                        player: 0,
                        dealer: 0
                    }
                });
                updateHandRef('left', 'IdleRef');
                updateHandRef('right', 'IdleRef');
            }, 7000);
        }
        // eslint-disable-next-line
    }, [handAnimationData]);

    // useEffect(() => {
    //     if (vikingAnimationData.show) {
    //         setTimeout(() => {
    //             setVikingAnimationData({
    //                 show: false,
    //                 result: 0
    //             });
    //             updateResultRef('idleResultRef');
    //         }, 7000);
    //     }

    //     if (vikingAnimationData.result === 1) {
    //         winResultref.current.one();
    //         updateResultRef('winResultRef');
    //     }
    //     else if (vikingAnimationData.result === 2) {
    //         lostResultref.current.one();
    //         updateResultRef('lostResultRef');
    //     }
    //     else if (vikingAnimationData.result === 3) {
    //         drawResultref.current.one();
    //         updateResultRef('drawResultRef');
    //     }
    //     // eslint-disable-next-line
    // }, [vikingAnimationData]);

    // useEffect(() => {
    //     updateVsRef(vsAnimationData);
    //     if (vsAnimationData) {
    //         vsRef.current.one();
    //         setTimeout(() => {
    //             setVsAnimationData(false)
    //         }, 3000)
    //     }
    // }, [vsAnimationData]);

    const updateResultRef = (ref) => {
        let refList = ['winResultRef', 'lostResultRef', 'drawResultRef', 'idleResultRef'];
        // eslint-disable-next-line
        refList.map((item) => {
            if (item !== ref) {
                document.getElementById(item).style.opacity = 0;
            }
            else {
                document.getElementById(item).style.opacity = 1;
            }
        });
    };

    const updateVsRef = (flag) => {
        try {
            document.getElementById('vsRef').style.opacity = flag ? 1 : 0;

        } catch (e) { }
    };

    const updateHandRef = (direction, ref) => {
        let refList = ['RockRef', 'ScissorRef', 'PaperRef', 'IdleRef'];
        // eslint-disable-next-line
        refList.map((item) => {
            if (item !== ref) {
                document.getElementById(direction + item).style.opacity = 0;
            }
            else {
                document.getElementById(direction + item).style.opacity = 1;
            }
        });
    }

    const onWindowMessage = (event) => {
        if (event?.data?.type === 'playzelo-Scissors-BetResult') {
            setBetResponse(event.data.data);
        }
        if (event?.data?.type === 'playzelo-Scissors-HistoryResult') {
            const response = event.data.data;
            let historyData = [];
            // eslint-disable-next-line
            response.history.map((history) => {
                historyData.push(history.betNumber);
            });
            setBetHistory([...historyData]);
        }
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

    const handleBetAmount = (e) => {
        setBetAmount(e.target.value);
    };

    const handleBet = () => {
        if (authData.isAuth) {

            var currentCoin = currency?.coinType?.toLowerCase();

            if (currentCoin != null) {
                if (betAmount < configPlayAmount[currentCoin].min) {
                    addToast(`Min amount is ${configPlayAmount[currentCoin].min} ${currentCoin}`, { appearance: 'error', autoDismiss: true });

                } else if (betAmount > configPlayAmount[currentCoin].max) {
                    addToast(`Max amount is ${configPlayAmount[currentCoin].max} ${currentCoin}`, { appearance: 'error', autoDismiss: true });

                } else {
                    setPlayLoading(true);

                    const request = {
                        playerNumber: betType,
                        userId: authData.userData._id,
                        betAmount: betAmount,
                        coinType: currency
                    };
                    ScissorsSocketManager.getInstance().joinBet(request);
                }
            }

        }
        else {
            addToast('Please login and try again', { appearance: 'warning', autoDismiss: true });
        }

    };

    const updateBetType = (type) => {
        setBetType(type);
    };







    return (

        <>
            <Box className={classes.MainContainer} >

                {loading &&
                    <LoadingGameBox />
                }

                <Box className={classes.GamePanelBox}>
                    <SettingBox />
                    <Box className={classes.FreeGuessingBox}>
                        Freeguessing 0
                    </Box>
                    <Box className={classes.HistoryBox}>
                        {
                            betHistory.map((item, index) => (
                                <img src={`/assets/images/scissor/block_${ScissorData[item]}.png`} alt="icon" key={index} />
                            ))
                        }
                    </Box>
                    <Box className={clsx(classes.PlayerBox, classes.LeftBox)}>
                        Me
                    </Box>
                    <Box className={clsx(classes.PlayerBox, classes.RightBox)}>
                        Dealer
                    </Box>



                    {/*  ----------------------- player ------------------------ */}
                    {/* initial */}
                    {/* <ApngComponent
                        rate={rate}
                        id="idleResultRef"
                        autoPlay={false}
                        src={IdleAnimation}
                        className={classes.IdleAnimation}
                    /> */}

                    {/* win animation */}
                    {/* <ApngComponent
                        rate={rate}
                        id="winResultRef"
                        ref={winResultref}
                        src={WinAnimation}
                        className={classes.WinAnimation}
                        style={{ opacity: 0 }}
                    /> */}
                    {/* <ApngComponent
                        rate={rate}
                        id="lostResultRef"
                        ref={lostResultref}
                        src={LostAnimation}
                        className={classes.LostAnimation}
                        style={{ opacity: 0 }}
                    /> */}
                    {/* <ApngComponent
                        rate={rate}
                        id="drawResultRef"
                        ref={drawResultref}
                        src={DrawAnimation}
                        className={classes.DrawAnimation}
                        style={{ opacity: 0 }}
                    /> */}

                    <Box className={classes.VSBox}>
                        <ApngComponent rate={rate} id="vsRef" ref={vsRef} autoPlay={false} src={VSAnimation} style={{ opacity: 0 }} />
                    </Box>


                    {/* ---------------------- animation resultat win, draw, lost ------------------ */}
                    {
                        showWinResult &&
                        <Box className={classes.ResultBox}>
                            <img src={`/assets/images/scissor/${winImage}.png`} alt="result" />
                        </Box>
                    }


                    {/* ---------------------- main gauche et droite ------------------ */}
                    <Box className={clsx(classes.HandBox, classes.LeftHand)}>
                        <ApngComponent id="leftIdleRef" ref={leftIdleRef} src={RockAnimation} autoPlay={false} style={{ transform: 'rotateY(180deg)', opacity: 1 }} />
                    </Box>
                    <Box className={clsx(classes.HandBox, classes.LeftHand)}>
                        <ApngComponent rate={rate} id="leftRockRef" ref={leftRockRef} src={RockAnimation} autoPlay={false} style={{ transform: 'rotateY(180deg)', opacity: 0 }} />
                    </Box>
                    <Box className={clsx(classes.HandBox, classes.LeftHand)}>
                        <ApngComponent rate={rate} id="leftScissorRef" ref={leftScissorRef} src={ScissorAnimation} autoPlay={false} style={{ transform: 'rotateY(180deg)', opacity: 0 }} />
                    </Box>
                    <Box className={clsx(classes.HandBox, classes.LeftHand)}>
                        <ApngComponent rate={rate} id="leftPaperRef" ref={leftPaperRef} src={PaperAnimation} autoPlay={false} style={{ transform: 'rotateY(180deg)', opacity: 0 }} />
                    </Box>
                    <Box className={clsx(classes.HandBox, classes.RightHand)}>
                        <ApngComponent id="rightIdleRef" ref={rightIdleRef} src={RockAnimation} autoPlay={false} style={{ opacity: 1 }} />
                    </Box>
                    <Box className={clsx(classes.HandBox, classes.RightHand)}>
                        <ApngComponent rate={rate} id="rightRockRef" ref={rightRockRef} src={RockAnimation} autoPlay={false} style={{ opacity: 0 }} />
                    </Box>
                    <Box className={clsx(classes.HandBox, classes.RightHand)}>
                        <ApngComponent rate={rate} id="rightScissorRef" ref={rightScissorRef} src={ScissorAnimation} autoPlay={false} style={{ opacity: 0 }} />
                    </Box>
                    <Box className={clsx(classes.HandBox, classes.RightHand)}>
                        <ApngComponent rate={rate} id="rightPaperRef" ref={rightPaperRef} src={PaperAnimation} autoPlay={false} style={{ opacity: 0 }} />
                    </Box>



                    {/* -------------------------------------------- barre de jeux --------------------------------------------*/}
                    <Box className={classes.BetActionBox}>

                        {/* input  1/2 2x et max */}
                        <Box className={classes.AmountInputBox}>
                            <img src={`/assets/images/coins/${currency?.coinType?.toLowerCase()}.png`} alt="mup" className={classes.CoinItem} />
                            <input className={classes.AmountInput} type="number" value={betAmount} onChange={handleBetAmount} />
                            <Box className={classes.AmountActionBox}>
                                <Button onClick={() => handleAmountAction(0)} className={classes.AmountActionButton}>1/2</Button>
                                <Button onClick={() => handleAmountAction(1)} className={clsx(classes.AmountActionButton, classes.AmountMiddleButton)}>2X</Button>
                                <Button onClick={() => handleAmountAction(2)} className={classes.AmountActionButton}>Max</Button>
                            </Box>
                        </Box>

                        {/* choix du jeux */}
                        <Box className={classes.BetTypeBox}>
                            <Button onClick={() => updateBetType(0)} className={clsx(classes.SelectButton)}>
                                <img src="/assets/images/scissor/block_rock.png" alt="rock" className={betType === 0 ? classes.SelectedType : ''} />
                            </Button>
                            <Button onClick={() => updateBetType(1)} className={clsx(classes.SelectButton)}>
                                <img src="/assets/images/scissor/block_scissors.png" alt="scissor" className={betType === 1 ? classes.SelectedType : ''} />
                            </Button>
                            <Button onClick={() => updateBetType(2)} className={clsx(classes.SelectButton)}>
                                <img src="/assets/images/scissor/block_paper.png" alt="paper" className={betType === 2 ? classes.SelectedType : ''} />
                            </Button>
                            <Button onClick={() => updateBetType(3)} className={clsx(classes.RandomButton, betType === 3 ? classes.SelectedType : '')}>
                                Random
                            </Button>
                        </Box>


                        {/* playing button */}
                        <LoadingButton className={classes.PlayButton} onClick={handleBet} loading={playLoading}>Play</LoadingButton>
                    </Box>
                    {/* -------------------------------------------- barre de jeux --------------------------------------------*/}


                </Box>
                <Box className={classes.HistoryTable}>
                    <HistoryBox />
                </Box>
            </Box >



        </>
    );
};

export default ScissorWidget;