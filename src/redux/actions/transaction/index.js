import Config from 'config/index';

export const getTransactionHistoryAction = (userId, currencies) => async (dispatch) => {
    try {
        const response = await Config.Api.getTransactionHistory({ userId });

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
                        uuid: transaction.uuid || "-",
                    });
                }
            });

            dispatch({
                type: 'SET_TRANSACTION_HISTORY',
                data: history,
            });
        }
    } catch (error) {
        console.error("Error fetching transaction history:", error);
    }
};
