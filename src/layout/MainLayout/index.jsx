import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import MainHeader from "./header";
import MainMenu from "./menu";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import MainFooter from "./footer";
import Config from "config/index";
import { useEffect, useState } from "react";
import { getAuthData, getBetHistoryData, getPrivacyData } from "redux/actions/auth";
import { height } from "@mui/system";
import { getTransactionHistoryAction, getTransactionHistoryExceptBonusAction } from "redux/actions/transaction";

// Ajoutez ceci dans votre fichier CSS global (ou via CSS-in-JS)
document.body.style.margin = '0';
document.documentElement.style.height = '100%';
document.body.style.height = '100%';

const useStyles = makeStyles(() => ({
    MainContainer: {
        overflowY: 'auto',  // 'auto' pour afficher la barre uniquement si nécessaire
        width: '100%',
        height: '100%',  // Prendre toute la hauteur disponible
        transition: 'transform .3s ease-in-out, margin .3s ease-in-out, -webkit-transform .3s ease-in-out',
        "& > section": {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    },
    RemovedMenu: {
        marginLeft: '60px',
    },
    MainWrapper: {
        paddingTop: '70px',
        display: 'flex',
        // height: '100vh',
        // Hauteur égale à toute la fenêtre
        // "@media (max-width: 681px)": {
        //     paddingTop: '63px'
        // }
    },
    MainWrapper1: {
        paddingTop: '117px',
        height: '100vh',
        // Hauteur égale à toute la fenêtre
        // "@media (max-width: 681px)": {
        //     paddingTop: '63px'
        // }
    }
}));

const MainLayout = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const authData = useSelector((state) => state.authentication);
    const menuOption = useSelector((state) => state.menuOption);


    useEffect(() => {
        const checkAuthentication = async () => {
            if (!authData.isAuth) {
                const token = Config.Api.getToken();
                if (token !== null) {
                    const response = await getAuthData({ token });
                    if (response.status) {
                        dispatch({ type: 'SET_AUTH' });
                        dispatch({ type: 'SET_USERDATA', data: response.data });
                        dispatch({ type: 'SET_BALANCEDATA', data: response.data.balance.data });

                        const settingData = {
                            inited: true,
                            sound: response.setting.sound,
                            backgroundSound: response.setting.backgroundSound,
                            effectSound: response.setting.effectSound,
                            hotkey: response.setting.hotkey,
                            animation: response.setting.animation,
                            maxBet: response.setting.maxBet
                        };
                        dispatch({ type: 'INIT_SETTING', data: settingData });

                        //
                        // ---------- gestion de l'historique

                        var responseHistoriques = await getTransactionHistoryExceptBonusAction(response.data._id);
                        dispatch({ type: 'SET_TRANSACTION_HISTORY', data: responseHistoriques });

                    }




                }

            }
        }
        checkAuthentication();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        Config?.Root?.socket?.off("balanceUpdated");
        Config?.Root?.socket?.on("balanceUpdated", (data) => {
            if (data._id === authData?.userData?._id) {
                dispatch({ type: 'SET_BALANCEDATA', data: data.balance.data });
            }
        });
        // eslint-disable-next-line
    }, [authData]);

    useEffect(() => {
        if (authData.isAuth) {
            const checkPrivacyData = async () => {
                const response = await getPrivacyData({ userId: authData.userData._id });
                if (response.status) {
                    const data = {
                        privateProfile: response.data.privateProfile,
                        showOnlineIndicator: response.data.showOnlineIndicator
                    };
                    dispatch({ type: 'INIT_PRIVACY', data });
                }
            };
            checkPrivacyData();
        }
        // eslint-disable-next-line
    }, [authData.isAuth]);

    return (
        <div>
            <CssBaseline />
            <div style={{ height: '100vh', overflowY: "scroll" }}>
                <MainHeader />

                <Box className={classes.MainWrapper}>
                    <MainMenu />
                    <main className={!menuOption.menuVisible ? clsx(classes.MainContainer, '')
                        : clsx(classes.MainContainer, classes.RemovedMenu, '')}>
                        <section>
                            <Outlet />
                        </section>
                    </main>
                </Box>


                <MainFooter />

            </div>
        </div>
    );
};

export default MainLayout;
