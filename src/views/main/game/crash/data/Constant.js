// Définition de la largeur du jeu
export const GAME_WIDTH = 1128; 

// Définition de la hauteur du jeu
export const GAME_HEIGHT = 771; 

// État du jeu, représentant différentes phases du jeu
export const GAME_STATE = {
    COUNTDOWN: 0,  // Phase de compte à rebours avant le début du jeu
    WAITING: 1,    // Phase d'attente où le jeu est en pause
    FLY: 2,        // Phase où l'avion vole
    CRASH: 3,      // Phase où l'avion se crashe
    COMPLETED: 4,  // Phase où le jeu est terminé
    NONE: 5         // Aucune phase active (état initial ou non défini)
};

// Statut des paris, représentant les différents états d'un pari
export const BET_STATUS = {
    BET: 0,       // Le pari est en cours
    DIRECT: 1,    // Pari direct, généralement mis en place immédiatement
    WAITING: 2,   // En attente de la résolution du pari
    CASHOUT: 3    // L'option de retrait du pari est disponible
};

// Fréquence d'images du jeu, exprimée en images par seconde
export const FRAME_RATE = 30; 

// Nombre maximal de frames pour la phase de vol
export const MAX_FLY_FRAME = 230; 

// Durée maximale du compte à rebours en secondes
export const MAX_COUNTDOWN = 10; 
