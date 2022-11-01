const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Lobby', {
        lobby_id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true,
        },
        message: { type: Sequelize.TEXT },
        max_spots: { type: Sequelize.INTEGER },
        num_players: { type: Sequelize.INTEGER, defaultValue: 0 }
        // num_supp: { type: Sequelize.INTEGER },
        // num_dps: { type: Sequelize.INTEGER },
    }, { timestamps: false });
}; 