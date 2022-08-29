const { MessageActionRow } = require('discord.js');

module.exports = {
    data: {
        name: 'select-char-menu',
    },
    async execute(db, interaction) {
        try {

        }
        catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Something went wrong with the select-char-menu.', ephemeral: true });
        }
    },
};