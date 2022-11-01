const { MesageEmbed, MessageEmbed } = require('discord.js');

module.exports = {
    data: {
        name: 'leave-button',
    },
    async execute(db, interaction) {
        try {
            const char = await db.models.LobbyMember.findAll({
                attributes: ['character_id', 'lobby_spot'],
                include: [{
                    model: db.models.Character,
                    required: true,
                    where: {
                        account_id: interaction.user.id
                    }
                }],
                where: {
                    lobby_id: interaction.message.id
                }
            });

            const lobbyEmbed = interaction.message.embeds[0];
            const newLobbyEmbed = new MessageEmbed(lobbyEmbed);
            newLobbyEmbed.fields[char[0].lobby_spot] = { name: `${interaction.user.username} has left the party.`, value: '\u200b' };

            await db.models.LobbyMember.destroy({ where: { character_id: char[0].character_id, lobby_id: interaction.message.id } });
            await interaction.message.edit({ embeds: [newLobbyEmbed] });
            await interaction.reply({ content: 'Successfully left lobby.', ephemeral: true });
        }
        catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Something went wrong with leaving the lobby.', ephemeral: true });
        }
    },
};