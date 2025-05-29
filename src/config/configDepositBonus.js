// Configuration des bonus de dépôt (pourcentages réduits)
const configDepositBonus = [
    {
        min: 10.0,      // 10 $
        max: 29.9,      // 29.9 $
        pourcentage: 120,
    },
    {
        min: 30.0,      // 30 $
        max: 49.9,      // 49.9 $
        pourcentage: 150,
    },
    {
        min: 50.0,      // 50 $
        max: 79.9,      // 79.9 $
        pourcentage: 180,
    },
    {
        min: 80.0,      // 80 $
        max: 99.9,      // 99.9 $
        pourcentage: 200,
    },
];

export { configDepositBonus };
