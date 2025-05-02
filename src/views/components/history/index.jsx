import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getTransactionHistory } from "redux/actions/auth";
import { useSelector } from "react-redux";

import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

const useStyles = makeStyles(() => ({
  MainLayout: {
    paddingTop: 10,
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
    marginBottom: 10,
    padding: 10,
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    flexWrap: "wrap",
  },
  TransactionCoinIcon: {
    width: 40,
    height: 40,
  },
  TransactionRowContent: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    gap: 10,
    "@media (min-width: 600px)": {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
  },
  TransactionContent: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: 4,
  },
  Amount: {
    fontWeight: 700,
    fontSize: 16,
    display: "flex",
    alignItems: "center",
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
    marginTop: 8,
    "@media (min-width: 600px)": {
      marginTop: 0,
    },
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

    if (response.status && Array.isArray(response.data)) {
      const history = [];

      response.data.forEach((transaction) => {
        const { coinType, type } = transaction.currency || {};

        if (!coinType || !type) return;

        const currency = currencies.find(
          (item) =>
            item.name.toLowerCase() === coinType.toLowerCase() &&
            item.token.toLowerCase() === type.toLowerCase()
        );

        if (currency) {
          history.push({
            currency: currency,
            amount: transaction.amount,
            txId: transaction.txId,
            pending: transaction.pending ?? "-",
            withdraw_request: transaction.withdraw_request ?? "-",
            type_transaction: transaction.type_transaction || "-",
            date: transaction.createdAt || "-",
          });
        }
      });

      setTransactions(history);
    }
  };


  const getStatusInfo = (item) => {
    if (item.type_transaction !== "withdraw") {
      return {
        label: "Deposit confirmed",
        icon: <ArrowDownward style={{ color: "#4caf50" }} />,
        color: "#4caf50",
        isDeposit: true,
      };
    } else {
      if (item.withdraw_request === 1) {
        return {
          label: "Pending withdrawal",
          icon: <HourglassBottomIcon style={{ color: "#ff9800" }} />,
          color: "#ff9800",
          isDeposit: false,
        };
      } else {
        return {
          label: "Withdrawal confirmed",
          icon: <ArrowUpward style={{ color: "#f44336" }} />,
          color: "#f44336",
          isDeposit: false,
        };
      }
    }
  };

  return (
    <Box className={classes.MainLayout}>
      <p style={{ color: 'white' }}>Number of transactions : {transactions.length}</p>
      <Box className={classes.ListLayout}>
        {transactions.length > 0 ? (
          transactions.map((item, index) => {
            const status = getStatusInfo(item);
            const amountIcon = status.isDeposit ? (
              <AddIcon fontSize="small" style={{ marginRight: 4 }} />
            ) : (
              <RemoveIcon fontSize="small" style={{ marginRight: 4 }} />
            );

            const formattedDate = new Date(item.date).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              //   <Box key={index} className={classes.TransactionRow}>
              //     <img
              //       className={classes.TransactionCoinIcon}
              //       src={`/assets/images/coins/${item.currency.name.toLowerCase()}.png`}
              //       alt="icon"
              //     />
              //     <Box className={classes.TransactionRowContent}>
              //       <Box className={classes.TransactionContent}>
              //         <Typography className={classes.Amount} style={{ color: status.color }}>
              //           {amountIcon}
              //           {item.amount?.toFixed(item.currency?.decimal)} {item.currency?.name}
              //         </Typography>
              //         {item.txId && item.txId.trim() !== '' && (
              //           <Typography className={classes.TxId}>
              //             T_ID: {item.txId.slice(0, 8)}...{item.txId.slice(-6)}
              //           </Typography>
              //         )}

              //         <Typography className={classes.TxId}>Date: {formattedDate}</Typography>
              //       </Box>
              //       <Box
              //         className={classes.StatusBox}
              //         style={{
              //           backgroundColor: status.color + "22",
              //           color: status.color,
              //         }}
              //       >
              //         {status.icon}
              //         {status.label}
              //       </Box>
              //     </Box>
              //   </Box>
              // );
              <Box key={index} className={classes.TransactionRow}>
                <img
                  className={classes.TransactionCoinIcon}
                  src={`/assets/images/coins/${item.currency.name.toLowerCase()}.png`}
                  alt="icon"
                />
                <Box className={classes.TransactionRowContent}>
                  <Box className={classes.TransactionContent}>
                    <Typography className={classes.Amount} style={{ color: status.color }}>
                      {amountIcon}
                      {item.amount?.toFixed(item.currency?.decimal)} {item.currency?.name}
                    </Typography>
                    <Typography className={classes.TxId}>
                      ID:{' '}
                      {item.txId && item.txId.trim() !== ''
                        ? `${item.txId.slice(0, 12)}...${item.txId.slice(-8)}`
                        : '-'}
                    </Typography>

                  </Box>
                  <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Typography className={classes.TxId} style={{ marginBottom: 4 }}>
                      {formattedDate}
                    </Typography>
                    <Box
                      className={classes.StatusBox}
                      style={{
                        backgroundColor: status.color + "22",
                        color: status.color,
                      }}
                    >
                      {status.icon}
                      {status.label}
                    </Box>
                  </Box>
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
