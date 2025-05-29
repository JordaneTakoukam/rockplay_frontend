import Config from 'config/index';

export const getTransactionHistoryAction = async (userId) => {
    try {
        const response = await Config.Api.getTransactionHistory({ userId });

        return response.data;

    } catch (error) {
        console.error("Error fetching transaction history:", error);
        return [];
    }
};






export const getTransactionHistoryExceptBonusAction = async (userId) => {
    try {

        const response = await Config.Api.getTransactionHistory({ userId });

        if (!response) {
            console.warn('⚠️ La réponse de l’API est undefined ou null');
            return [];
        }

        const isArray = Array.isArray(response.data.data);

        const transactions = isArray ? response.data.data : [];

        const filteredTransactions = transactions.filter(
            transaction => transaction.type_transaction !== 'bonus'
        );

        return filteredTransactions;

    } catch (error) {
        console.error("❌ Erreur lors de la récupération des transactions :", error);
        return [];
    }
};
