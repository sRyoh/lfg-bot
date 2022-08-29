module.exports = function applyExtraSetup(sequelize) {
    const { Account, Character, Raid, RaidMember } = sequelize.models;

    Account.hasMany(Character, {
        foreignKey: 'disc_id',
    });

    Account.hasMany(Raid, {
        foreignKey: 'disc_id',
    });

    Raid.hasMany(RaidMember, {
        foreignKey: 'raid_id',
    });

    Character.hasMany(RaidMember, {
        foreignKey: 'char_id',
    });
}