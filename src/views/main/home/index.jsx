import { Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { LoadingContext } from "layout/Context/loading";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import DataTable from "views/components/datatable";
import { getBannerText } from "redux/actions/auth";
import BonusesCard from "./BonusCard";
import AuthenticationModal from "../modals/AuthModal";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
    RootContainer: {
        width: '100%',
        height: '100%'
    },
    CarouselBox: {
        marginTop: "30px",
        width: '100%',
        paddingRight: '50px',
        "@media (max-width: 940px)": {
            padding: '0px 14px',
            marginTop: "25px",

        }
    },
    BannerBox: {
        background: "linear-gradient(48.57deg, #5A45D1 24.42%, #BA6AFF 88.19%)",
        backgroundPosition: '26% 50%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        color: '#FFF',
        borderRadius: '30px',
        height: '402px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        "@media (max-width: 681px)": {
            height: '220px',
            borderRadius: '10px',
            backgroundPosition: '16% 50%',

        },
        marginBottom: "30px"
    },
    BonusBannerBox: {
        background: "linear-gradient(48.57deg, #5A45D1 24.42%, #BA6AFF 88.19%)",
        backgroundPosition: '26% 50%',

        marginTop: '40px',
        height: '362px',
        "@media (max-width: 681px)": {
            height: '300px',

        }
    },
    BannerCharacter: {
        position: 'absolute',
        left: '450px',
        bottom: '-24px',
        width: '650px',
        height: '370px',
        "@media (max-width: 681px)": {
            left: 'unset',
            right: '-45px',
            bottom: '0px',
            width: '285px',
            height: '250px',
        }
    },
    BonusBannerCharacter: {
        left: '757px',
        width: '752px',
        height: '452px',
        bottom: '-65px',
        "@media (max-width: 681px)": {
            width: '294px',
            left: 'unset',
            right: '0px',
            bottom: '0px',
            height: 'auto'
        }
    },
    BannerTextBox: {
        display: 'flex',
        flexDirection: 'column',
        width: '515px',
        position: 'absolute',
        left: '97px',
        top: '40px',
        "@media (max-width: 681px)": {
            transform: 'translate(-50%)',
            left: '50%',
            width: '100%',
            padding: '0px 20px',
            top: '10px'
        }
    },
    BannerTitle: {
        paddingTop: "10px",
        fontFamily: 'Styrene A Web',
        fontWeight: '900',
        fontSize: "39.391px",
        lineHeight: "53px",
        textTransform: "uppercase",
        color: "#FFFFFF",
        textShadow: "-6.73513px 6.73513px 0px rgba(0, 0, 0, 0.25)",
        "&>span": {
            fontFamily: 'Styrene A Web',
            color: '#FED847'
        },
        "@media (max-width: 681px)": {
            paddingTop: "20px",
            fontSize: '18px',
            lineHeight: '23px',
            textShadow: "-4.73513px 4.73513px 0px rgba(0, 0, 0, 0.25)",

        }
    },
    BannerTitleBonus: {
        marginTop: "35px",
        fontFamily: 'Styrene A Web',
        fontWeight: '900',
        fontSize: "33.391px",
        lineHeight: "30px",
        textTransform: "uppercase",
        color: "#FFFFFF",
        textShadow: "-6.73513px 6.73513px 0px rgba(0, 0, 0, 0.25)",
        "&>span": {
            fontFamily: 'Styrene A Web',
            color: '#FED847'
        },
        "@media (max-width: 681px)": {
            textShadow: "-4.73513px 4.73513px 0px rgba(0, 0, 0, 0.25)",
            fontSize: '15px',
            lineHeight: '15px'
        }
    },
    BannerDesc: {
        fontFamily: 'Styrene A Web',
        fontWeight: '900',
        fontSize: "73.28px",
        lineHeight: "94px",
        textTransform: "uppercase",
        color: "#FFFFFF",
        textShadow: "-9.99288px 9.99288px 0px rgba(0, 0, 0, 0.25)",
        "@media (max-width: 681px)": {
            fontSize: '23px',
            lineHeight: '34px'
        }
    },
    BannerText: {
        marginTop: "10px",
        fontFamily: 'Styrene A Web',
        fontWeight: '400',
        fontSize: "14px",
        lineHeight: "18px",
        color: "#FFFFFF",
        "@media (max-width: 681px)": {
            width: "200px"
        }
    },
    BannerButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        cursor: 'pointer',
        gap: "10px",
        width: "171px",
        height: "51px",
        border: "1px solid #715AE0",
        borderRadius: "8px",
        textTransform: 'uppercase',
        fontFamily: 'Styrene A Web',
        fontWeight: '700',
        fontSize: '14px',
        lineHeight: '18px',
        "&:hover": {
            opacity: '0.6'
        }
    },
    RegisterButton: {
        background: "#FED847",
        color: '#1F1E25',
        "@media (max-width: 681px)": {
            marginTop: "10px",
            height: "40px",
            width: "65%"
        }
    },
    DemoButton: {
        background: "#4D33AB",
        color: '#FFF',
        "@media (max-width: 681px)": {
            background: 'unset',
            border: 'none'
        }
    },
    BannerButtonBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "10px",
        marginTop: "16px",
        "@media (max-width: 681px)": {
            flexDirection: 'column',
            alignItems: 'start',
            marginTop: '5px'
        }
    },
    GameListBox: {
        width: '100%',    

        // Masquer sur mobile et tablette
        display: "block", // Par défaut, visible sur desktop
        "@media (max-width: 1024px)": {
            display: "none", // Masquer sur mobile et tablette
        },

        "&>span": {
            fontFamily: "'Styrene A Web'",
            fontStyle: "normal",
            fontWeight: "900",
            fontSize: "32px",
            lineHeight: "41px",
            textTransform: "uppercase",
            color: "#FFFFFF",
            opacity: "0.5",
            textShadow: "-8.08791px 8.08791px 0px rgba(0, 0, 0, 0.25)",

            "@media (max-width: 681px)": {
                fontSize: '19px', // Plus petit texte pour mobile
                lineHeight: '24px',
            }
        }
    },

    GameListBoxBonus: {
        width: '100%',

        "&>span": {
            fontFamily: "'Styrene A Web'",
            fontStyle: "normal",
            fontWeight: "900",
            fontSize: "32px",
            lineHeight: "41px",
            textTransform: "uppercase",
            color: "#FFFFFF",
            opacity: "0.5",
            textShadow: "-8.08791px 8.08791px 0px rgba(0, 0, 0, 0.25)",

            "@media (max-width: 681px)": {
                fontSize: '19px', // Plus petit texte pour mobile
                lineHeight: '24px',
            }
        }
    },
    GameListMobile: {
        display: 'grid', // Utilisation de CSS Grid
        gridTemplateColumns: 'repeat(2, 1fr)', // Grille avec 3 colonnes
        gap: '10px', // Espacement entre les éléments de la grille
        width: '100%',
        marginTop: '22px', // Espacement supérieur

        // "@media (max-width: 1024px)": {
        //     gridTemplateColumns: 'repeat(2, 1fr)', // 2 colonnes pour tablette
        // },

    },

    GameListItem: {
        width: '100%', // Remplir la largeur disponible
        height: '160px', // Taille fixe de la box
        "@media (min-width: 430px)": {
            height: '270px', // Taille fixe de la box

        },

        "@media (min-width: 414px)": {
            height: '200px', // Taille fixe de la box

        },

        "@media (min-width: 750px)": {
            height: '200px', // Taille fixe de la box

        },
        position: 'relative', // Pour positionner l'image en arrière-plan correctement
        backgroundSize: 'cover', // L'image couvre toute la box
        backgroundPosition: 'center', // Centrer l'image dans la box
        borderRadius: '10px', // Optionnel : coins arrondis pour la box
        overflow: 'hidden', // Empêche l'image de dépasser de la box
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Optionnel : ajout d'une ombre autour de la box
    },

    GameListBoxMobile: {
        marginTop: '15px', // Espacement en haut
        width: '100%',
        display: "block", // Visible sur mobile et tablette
        "@media (min-width: 940px)": {
            display: "none", // Masquer sur les écrans de largeur égale ou supérieure à 940px
        },
        "& > span": {
            fontFamily: "'Styrene A Web'",
            fontStyle: "normal",
            fontWeight: "900",
            fontSize: "32px",
            lineHeight: "41px",
            textTransform: "uppercase",
            color: "#FFFFFF",
            opacity: "0.5",
            textShadow: "-8.08791px 8.08791px 0px rgba(0, 0, 0, 0.25)",
            paddingBottom: '5px', // Ajout du padding en bas
            display: 'block', // Garantit que le texte occupe toute la ligne
            fontSize: '19px', // Plus petit texte pour mobile
            lineHeight: '24px',
        }
    },



    GameList: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: '22px',
        width: '100%',
        overflow: 'auto',
        flexWrap: 'wrap',
        "@media (max-width: 681px)": {
            gap: '20px',  // Espacement entre les éléments pour mobile
            marginTop: '6px',
        },
        "@media (max-width: 1370px)": {
            justifyContent: 'space-between',  // Ajuster l'espacement sur les tailles intermédiaires
            gap: '30px 0px',
        },
        "@media (min-width: 1370px)": {
            gap: '30px',
            justifyContent: 'flex-start',  // Alignement pour les grands écrans
        }
    },

    GameList2: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: '22px',
        width: '100%',
        overflow: 'auto',
        flexWrap: 'wrap',
        "@media (max-width: 681px)": {
            justifyContent: 'flex-start',  // Alignement à gauche pour mobile
            gap: '20px',
            marginTop: '20px',
        },
        "@media (max-width: 1370px)": {
            justifyContent: 'center',  // Alignement centré pour les écrans moyens
            gap: '30px 30px',
        },
        "@media (min-width: 1370px)": {
            gap: '30px',
            justifyContent: 'flex-start',  // Alignement à gauche pour les grands écrans
        }
    }
    ,
    GameListButton: {
        width: '241px',
        height: '242px',
        padding: '0px',
        borderRadius: '20px',
        flex: 'none',
        "&>img": {
            width: '100%',
            height: '100%'
        },
        "@media (max-width: 681px)": {
            width: '100px',
            height: '100px'
        }
    },
    BounsList: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '20px',
        marginTop: '55px',
        flexWrap: 'wrap',
        "@media (max-width: 1149px)": {
            gap: '40px'
        }
    },
    BonusBannerText: {
        width: '682px',
        top: '47px',
        "@media (max-width: 681px)": {
            top: '10px',
            width: '200px',
            padding: '0px 10px',
            left: '100px'
        }
    },
    HistoryBox: {
        width: '100%',
        marginTop: '65px'
    },
    HistoryStateBox: {
        // border: '1px solid #363646',
        // borderRadius: '8px',
        // width: '180px',
        // marginBottom: '20px',
        // "@media (max-width: 830px)": {
        //     width: '100%',
        // },
        // "@media (max-width: 681px)": {
        //     borderRadius: '0px'
        // }
    },
    HistoryTabButton: {
        width: '229px',
        height: '47px',
        borderRadius: '8px',
        color: '#FFF',
        textTransform: 'uppercase',
        fontSize: '14px',
        fontWeight: '700',
        lineHeight: '18px',
        fontFamily: 'Styrene A Web',
        padding: '0px',
        "@media (max-width: 830px)": {
            width: '100%',
            marginBottom: "10px"
        },
        "@media (max-width: 681px)": {
            borderRadius: '0px'
        }
    },
    SelectedButton: {
        background: 'linear-gradient(48.57deg, #5A45D1 24.42%, #BA6AFF 88.19%)'
    }
}));

const GameBannerItems = [
    { name: 'scissor', link: '/app/games/scissor' },
    { name: 'turtle', link: '/app/games/turtlerace' },
    { name: 'mines', link: '/app/games/mines' },
    { name: 'slot', link: '/app/games/slot' },
];

const GameBannerItems2 = [

    { name: 'plinko', link: '/app/games/plinko' },
    { name: 'dice', link: '/app/games/dice' },
    { name: 'crash', link: '/app/games/crash' },

];


const GameBannerItemsMobile = [
    { name: 'scissor', link: '/app/games/scissor' },
    { name: 'turtle', link: '/app/games/turtlerace' },
    { name: 'mines', link: '/app/games/mines' },
    { name: 'slot', link: '/app/games/slot' },
    { name: 'plinko', link: '/app/games/plinko' },
    { name: 'dice', link: '/app/games/dice' },
    { name: 'crash', link: '/app/games/crash' },
];



const Home = () => {
    const classes = useStyles();
    const { addToast } = useToasts();
    const { showLoading, hideLoading } = useContext(LoadingContext);

    const [historyState, setHistoryState] = useState(0);
    const [topBannerData, setTopBannerData] = useState({ text1: '', text2: '', text3: '' });
    const [bottomBannerData, setBottomBannerData] = useState({ text1: '', text2: '', text3: '' });

    // afficher et cacher la modal d'auth
    const [authModalOpen, setAuthModalOpen] = useState(false);


    useEffect(() => {
        initFunc();
        // eslint-disable-next-line
    }, []);

    const initFunc = async () => {
        showLoading();
        const response = await getBannerText();
        if (response.status) {
            let topData = response.data.find(item => item.type === 'top');
            setTopBannerData({ ...topData });
            let bottomData = response.data.find(item => item.type === 'bottom');
            setBottomBannerData({ ...bottomData });
        }
        else {
            addToast(response.message, { appearance: 'error', autoDismiss: true });
        }
        hideLoading();
    };

    const authData = useSelector((state) => state.authentication);

    return (
        <Box className={classes.RootContainer}>
            <Box className={classes.CarouselBox}>
                {/* if it is not logged */}
                {!authData.isAuth &&

                    <Box className={classes.BannerBox}>
                        <img className={classes.BannerCharacter} src="/assets/images/BannerCharacter.png" alt="banner-character" />
                        <Box className={classes.BannerTextBox}>
                            <Box className={classes.BannerTitle}>{topBannerData.text1}</Box>
                            <Box className={classes.BannerDesc}>{topBannerData.text2}</Box>
                            <span className={classes.BannerText}>{topBannerData.text3}</span>
                            <Box className={classes.BannerButtonBox}>
                                <Box className={clsx(classes.BannerButton, classes.RegisterButton)} onClick={() => { setAuthModalOpen(true) }}>Register Now</Box>
                                {/* <Box className={clsx(classes.BannerButton, classes.DemoButton)}>Demo Game</Box> */}
                            </Box>
                        </Box>
                    </Box>

                }
                {
                    // -------------------------------------------/ desktop 
                    <Box
                        style={{ marginTop: !authData.isAuth ? "50px" : "25px" }}
                        className={clsx(classes.GameListBox)}
                    >
                        <span>Our Games</span>
                        <Box className={clsx(classes.GameList)}>
                            {
                                GameBannerItems.map((item, index) => (
                                    <Link to={item.link} key={index}>
                                        <Button className={classes.GameListButton}>
                                            <img src={`/assets/images/games/${item.name}.png`} alt="icon" />
                                        </Button>
                                    </Link>
                                ))
                            }

                        </Box>
                        <Box className={clsx(classes.GameList2)}>
                            {
                                GameBannerItems2.map((item, index) => (
                                    <Link to={item.link} key={index}>
                                        <Button className={classes.GameListButton}>
                                            <img src={`/assets/images/games/${item.name}.png`} alt="icon" />
                                        </Button>
                                    </Link>
                                ))
                            }

                        </Box>
                    </Box>
                }

                {
                    // -------------------------------------------/ mobile 
                    <Box className={clsx(classes.GameListBoxMobile)}>
                        <span>Our Games</span>
                        <Box className={clsx(classes.GameListMobile)}>
                            {GameBannerItemsMobile.map((item, index) => (
                                <Link to={item.link} key={index}>
                                    <Box
                                        className={classes.GameListItem}
                                        style={{ backgroundImage: `url(/assets/images/games/${item.name}.png)` }}
                                    >
                                        {/* Tu peux ajouter d'autres éléments ou effets ici si nécessaire */}
                                    </Box>
                                </Link>
                            ))}
                        </Box>
                    </Box>



                }
                <Box style={{ marginTop: "50px" }} className={classes.GameListBoxBonus}>
                    <span>MINUS PLAY</span>
                    <Box className={classes.BounsList}>
                        <BonusesCard
                            title={'SOCIAL GIVEAWAY'}
                            text={'Spin for daily rewards on our socials. Follow us on X and Telegram.'}
                            icon="BonusFreeSpinIcon"
                            colored={false}
                        />
                        <BonusesCard
                            title={'Tournaments'}
                            text={'Join the action! Participate in daily, weekly & monthly wager tournaments and compete for Big Prizes.'}
                            icon="BonusTournamentsIcon"
                            colored={true}
                        />
                        <BonusesCard
                            title={'And more coming soon!'}
                            text={'We are developing the next crypto provably fair wagering gaming platform with zero KYC and innovative features.'}
                            icon="BonusComingSoonIcon"
                            colored={false}
                        />
                    </Box>
                </Box>
                <Box className={classes.HistoryBox}>
                    <Box className={classes.HistoryStateBox}>
                        <Button onClick={() => setHistoryState(0)} className={clsx(classes.HistoryTabButton, historyState === 0 ? classes.SelectedButton : '')}>Recent games</Button>
                        {/* <Button onClick={() => setHistoryState(1)} className={clsx(classes.HistoryTabButton, historyState === 1 ? classes.SelectedButton : '')}>Lucky Wins</Button>
                        <Button onClick={() => setHistoryState(2)} className={clsx(classes.HistoryTabButton, historyState === 2 ? classes.SelectedButton : '')}>High Rollers</Button>
                 */}
                    </Box>
                    <DataTable historyState={historyState} />
                </Box>
                {/* <Box className={clsx(classes.BannerBox, classes.BonusBannerBox)}>
                    <img className={clsx(classes.BannerCharacter, classes.BonusBannerCharacter)} src="/assets/images/BonusBannerCharacter.png" alt="banner-character" />
                    <Box className={clsx(classes.BannerTextBox, classes.BonusBannerText)}>
                        <Box className={classes.BannerTitle}>{bottomBannerData.text1}</Box>
                        <Box className={classes.BannerTitle}>{bottomBannerData.text2}</Box>
                        <span className={classes.BannerText} style={{ marginTop: '20px' }}>{bottomBannerData.text3}</span>
                        <Box className={classes.BannerButtonBox}>
                            <Box className={clsx(classes.BannerButton, classes.RegisterButton)}>About Bonuses</Box>
                        </Box>
                    </Box>
                </Box> */}

                <Box className={clsx(classes.BannerBox, classes.BonusBannerBox)}>
                    <img className={classes.BannerCharacter} src="/assets/images/BonusBannerCharacter.png" alt="banner-character-bonus" />
                    <Box className={classes.BannerTextBox}>
                        <Box className={classes.BannerTitleBonus}>{bottomBannerData.text1}</Box>
                        <Box className={classes.BannerTitleBonus}>{bottomBannerData.text2}</Box>
                        <span className={classes.BannerText} style={{ marginTop: '20px' }}>{bottomBannerData.text3}</span>

                        <Link
                            to={'/app/bonues'}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className={classes.BannerButtonBox}>
                            <Box className={clsx(classes.BannerButton, classes.RegisterButton)}>About Bonuses</Box>
                        </Link>
                    </Box>
                </Box>
            </Box>


            <AuthenticationModal open={authModalOpen} setOpen={setAuthModalOpen} />
        </Box>
    );
};

export default Home; 