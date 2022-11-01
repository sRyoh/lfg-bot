const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register/update a character for LFG lobbies.')
        .addStringOption(option =>
            option.setName('character-name')
                .setDescription('name of character')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('class')
                .setDescription('class of character')
                .setRequired(true)
                .addChoices(
                    { name: 'Berserker', value: 'Berserker' },
                    { name: 'Paladin', value: 'Paladin' },
                    { name: 'Gunlancer', value: 'Gunlancer' },
                    { name: 'Destroyer', value: 'Destroyer' },
                    { name: 'Striker', value: 'Striker' },
                    { name: 'Wardancer', value: 'Wardancer' },
                    { name: 'Scrapper', value: 'Scrapper' },
                    { name: 'Soulfist', value: 'Soulfist' },
                    { name: 'Glaivier', value: 'Glaivier' },
                    { name: 'Gunslinger', value: 'Gunslinger' },
                    { name: 'Artillerist', value: 'Artillerist' },
                    { name: 'Deadeye', value: 'Deadeye' },
                    { name: 'Sharpshooter', value: 'Sharpshooter' },
                    { name: 'Machinist', value: 'Machinist' },
                    { name: 'Bard', value: 'Bard' },
                    { name: 'Sorceress', value: 'Sorceress' },
                    { name: 'Arcanist', value: 'Arcanist' },
                    { name: 'Shadowhunter', value: 'Shadowhunter' },
                    { name: 'Deathblade', value: 'Deathblade' },
                )
        )
        .addIntegerOption(option =>
            option.setName('ilvl')
                .setDescription('item level of character')
                .setRequired(true)
        ),
    async execute(db, interaction) {
        try {
            const account_id = interaction.user.id;
            const name = interaction.options.getString('character-name');
            const char = await db.models.Character.findOne({ where: { name: name, account_id: account_id } });

            const _class = interaction.options.getString('class');
            const ilvl = interaction.options.getInteger('ilvl');
            if (char) {
                await db.models.Character.update({ class: _class, ilvl: ilvl }, {
                    where: { name: name, account_id: account_id }
                });
                await interaction.reply({ content: 'Successfully edited character.', ephemeral: true });
            } else {
                // Create an account within database if the discord user does not already have one
                const account = await db.models.Account.findOne({ where: { account_id: account_id } });
                if (!account) await db.models.Account.create({ account_id: account_id });

                await db.models.Character.create({ account_id: account_id, name: name, class: _class, ilvl: ilvl });
                await interaction.reply({ content: 'Successfully added character.', ephemeral: true });
            }
        }
        catch (error) {
            console.log(error);
            return interaction.reply({ content: 'Something went wrong with adding/editing a character.', ephemeral: true });
        }
    },
};