const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: {
        name: 'select-raid-menu',
    },
    async execute(db, interaction) {
        const button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('post-button')
                    .setLabel('Post')
                    .setStyle('PRIMARY'),
            );

        try {
            if (interaction.values[0] === 'valtan') {
                await interaction.update({ components: [button], ephemeral: true });
            } else if (interaction.values[0] === 'argos') {
                await interaction.update({ components: [button], ephemeral: true });
            }
        }
        catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Something went wrong with the select-raid-menu.', ephemeral: true });
        }
    },
};