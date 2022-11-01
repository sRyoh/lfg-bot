const { MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = {
    data: {
        name: 'join-button',
    },
    async execute(db, interaction) {
        try {
            const selectMenu = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('select-char-menu')
                        .setPlaceholder('Nothing selected')
                        .addOptions([
                            {
                                label: 'Join with no character',
                                description: 'All values will be shown as none',
                                value: 'none'
                            }
                        ])
                );

            const chars = await db.models.Character.findAll({
                attributes: ['character_id', 'name', 'class', 'ilvl'],
                where: { account_id: interaction.user.id }
            });

            chars.forEach(character => {
                selectMenu.components[0].addOptions([
                    {
                        label: `${character.name}`,
                        description: `${character.class} - ${character.ilvl}`,
                        value: `${interaction.channel.id} ${interaction.message.id} ${character.character_id}` //interaction.message.id acts as lobby_id
                    }
                ]);
            });

            await interaction.reply({ content: ' ', components: [selectMenu], ephemeral: true });
        }
        catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Something went wrong with joining the lobby.', ephemeral: true });
        }
    },
};