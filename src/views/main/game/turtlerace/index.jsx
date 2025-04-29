import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import TurtleSocketManager from "./TurtleSocketManager";
import { useSelector } from "react-redux";
import GamePanel from "./components/GamePanel";
import BetInputBox from "./components/BetInputBox";
import AnimationBox from "./components/AnimationBox";
import { makeStyles } from "@mui/styles";
import HistoryBox from "./components/HistoryBox";
import SettingBox from "views/components/setting";
import LoadingGameBox from "views/loading_box/loading_game_box";

const useStyles = makeStyles(() => ({
    TurtleLayout: {
        width: '100%',
        paddingRight: '50px',

        "@media (max-width: 940px)": {
            padding: '0px'
        }
    },
    TurtleGameLayout: {
        width: '100%',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        gap: '16px',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundImage: 'url("/assets/images/turtle/Main_Bg.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '829px',
        padding: '22px 0px 0px 22px',
        borderRadius: '30px',
        position: 'relative',
        "@media (max-width: 1444px)": {
            padding: '0px',
            borderRadius: '0px',
            height: 'calc(100vh - 85px)'
        }
    },
    HistoryBox: {
        margin: '24px auto 0',
        color: '#f0ecff'
    },
    AnimationBox: {
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        padding: '24px 32px 0px',
        flexDirection: 'column',
        width: '100%',
        "@media (max-width: 1444px)": {
            padding: '24px 0px 0px'
        }
    }
}));

const TurterlaceWidget = () => {

    const [loading, setLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(0);

    const images = [
        "assets/images/turtle_red_idle.png",
        "assets/images/turtle_red_run.png",
        "assets/images/turtle_blue_idle.png",
        "assets/images/turtle_blue_run.png",
        "assets/images/turtle_yellow_idle.png",
        "assets/images/turtle_yellow_run.png",
        "/assets/images/turtle/PrevWinner_bg.png",
        "/assets/images/turtle/CountDown_Bg.png"
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
            setLoading(false); // Une fois le délai écoulé, mettre loading à false

            // const randomTime = Math.floor(Math.random() * 150) + 150; // entre 1500ms (1.5s) et 3000ms (3s)
            // setTimeout(() => {
            //     setLoading(false); // Une fois le délai écoulé, mettre loading à false
            // }, randomTime);
        }
    }, [imagesLoaded, images.length]); // Dépendance sur `images.length`









    const authData = useSelector((state) => state.authentication);
    const classes = useStyles();

    useEffect(() => {
        TurtleSocketManager.getInstance().connect(authData);
        return () => {
            TurtleSocketManager.getInstance().disconnect();
        };
        // eslint-disable-next-line
    }, []);

    return <>
        {

            <Box className={classes.TurtleLayout}>
                {loading &&
                    <LoadingGameBox />
                }
                <Box className={classes.TurtleGameLayout}>
                    <SettingBox />
                    <GamePanel />
                    <Box className={classes.AnimationBox}>
                        <AnimationBox />
                        <BetInputBox />
                    </Box>
                </Box>
                <Box className={classes.HistoryBox}>
                    <HistoryBox />
                </Box>
            </Box>
        }
    </>
};

export default TurterlaceWidget;