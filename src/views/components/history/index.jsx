import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getTransactionHistory } from "redux/actions/auth";
import { useSelector } from "react-redux";

import TrendingDownIcon from "@mui/icons-material/TrendingDown"; // Dépôt
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom"; // Retrait en attente
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Retrait confirmé

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; // Flèche bas
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";     // Flèche haut

const useStyles = makeStyles(() => ({
    MainLayout: {
        padding: 33,
    },
    ListLayout: {
        background: "#424253",
        width: "100%",
        padding: 20,
        borderRadius: 7,
    },
    TransactionRow: {
        background: "#2C2C3A",
        borderRadius: 7,
        width: "100%",
        height: "auto",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: 10,
    },
    TransactionCoinIcon: {
        width: 40,
        height: 40,
    },
    TransactionContent: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    Amount: {
        fontWeight: 700,
        fontSize: 16,
        display: "flex",
        alignItems: "center",
        gap: 6,
    },
    TxId: {
        fontSize: 13,
        color: "#aaa",
    },
    StatusBox: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontWeight: 600,
        fontSize: 14,
        padding: "4px 8px",
        borderRadius: 5,
    },
}));

const HistoryContainer = () => {
    const classes = useStyles();
    const authData = useSelector((state) => state.authentication);
    const currencyData = useSelector((state) => state.currencyOption);
    const currencies = currencyData.currencies;

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (authData.isAuth) initFunc();
        // eslint-disable-next-line
    }, []);

    const initFunc = async () => {
        const response = await getTransactionHistory({ userId: authData.userData._id });
        if (response.status) {
            const history = [];

            response.data.forEach((walletData) => {
                walletData.transactionData.forEach((transaction) => {
                    const currency = currencies.find(
                        (item) =>
                            item.name.toLowerCase() === transaction.currency?.name?.toLowerCase() &&
                            item.token.toLowerCase() === transaction.currency?.token?.toLowerCase()
                    );

                    if (currency) {
                        history.push({
                            currency,
                            amount: transaction.amount,
                            txId: transaction.txId,
                            pending: transaction.pending,
                            withdraw_request: transaction.withdraw_request,
                            type_transaction: transaction.type_transaction,
                        });
                    }
                });
            });

            setTransactions(history);
        }
    };

    const getStatusInfo = (item) => {
        if (item.type_transaction === "deposit") {
            return {
                label: "Deposit",
                icon: <TrendingDownIcon style={{ color: "#4caf50" }} />,
                color: "#4caf50",
                prefix: "+",
                arrowIcon: <KeyboardArrowDownIcon style={{ fontSize: 18 }} />,
            };
        } else {
            if (item.withdraw_request === 1) {
                return {
                    label: "Pending withdrawal",
                    icon: <HourglassBottomIcon style={{ color: "#ff9800" }} />,
                    color: "#ff9800",
                    prefix: "-",
                    arrowIcon: <KeyboardArrowUpIcon style={{ fontSize: 18 }} />,
                };
            } else {
                return {
                    label: "Withdrawal confirmed",
                    icon: <CheckCircleIcon style={{ color: "#f44336" }} />,
                    color: "#f44336",
                    prefix: "-",
                    arrowIcon: <KeyboardArrowUpIcon style={{ fontSize: 18 }} />,
                };
            }
        }
    };

    return (
        <Box className={classes.MainLayout}>
            <Box className={classes.ListLayout}>
                {transactions.length > 0 ? (
                    transactions.map((item, index) => {
                        const status = getStatusInfo(item);
                        return (
                            <Box key={index} className={classes.TransactionRow}>
                                <img
                                    className={classes.TransactionCoinIcon}
                                    src={`/assets/images/coins/${item.currency.name.toLowerCase()}.png`}
                                    alt="icon"
                                />
                                <Box className={classes.TransactionContent}>
                                    <Typography className={classes.Amount} style={{ color: status.color }}>
                                        {status.prefix}
                                        {item.amount?.toFixed(item.currency?.decimal)} {item.currency?.name}
                                        {status.arrowIcon}
                                    </Typography>
                                    <Typography className={classes.TxId}>
                                        TX: {item.txId?.slice(0, 8)}...{item.txId?.slice(-6)}
                                    </Typography>
                                </Box>
                                <Box
                                    className={classes.StatusBox}
                                    style={{ backgroundColor: status.color + "22", color: status.color }}
                                >
                                    {status.icon}
                                    {status.label}
                                </Box>
                            </Box>
                        );
                    })
                ) : (
                    <Typography style={{ color: "#fff" }}>No transactions found.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default HistoryContainer;
