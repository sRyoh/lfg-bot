const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('LobbyMember', {
        // lm_id necessary? 
        // lm_id: {
        //     type: Sequelize.INTEGER,
        //     unique: true,
        //     autoIncrement: true,
        //     primaryKey: true,
        // },
        lobby_spot: { type: Sequelize.INTEGER },
        role: { type: Sequelize.STRING },
    }, { timestamps: false });
};
