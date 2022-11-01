module.exports = function applyExtraSetup(sequelize) {
    console.log(sequelize.models);
    const { Account, Character, Lobby, LobbyMember } = sequelize.models;

    Account.hasMany(Character, { foreignKey: 'account_id' });
    Character.belongsTo(Account, { foreignKey: 'account_id' });

    Account.hasMany(Lobby, { foreignKey: 'account_id' });
    Lobby.belongsTo(Account, { foreignKey: 'account_id' });

    Lobby.belongsToMany(Character, { through: LobbyMember, foreignKey: 'lobby_id' });
    Character.belongsToMany(Lobby, { through: LobbyMember, foreignKey: 'character_id' });

    LobbyMember.belongsTo(Character, { foreignKey: 'character_id' });
    LobbyMember.belongsTo(Lobby, { foreignKey: 'lobby_id' });
}