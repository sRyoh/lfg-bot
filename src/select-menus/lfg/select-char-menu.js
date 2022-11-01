const { MessageEmbed } = require('discord.js');

module.exports = {
    data: {
        name: 'select-char-menu',
    },
    async execute(db, interaction) {
        try {
            const ids = interaction.values[0].split(" ");
            const char = await db.models.Character.findOne({
                attributes: ['name', 'class', 'ilvl'],
                where: { character_id: ids[2] }
            });

            const lobby = await db.models.LobbyMember.findAll({
                attributes: ['lobby_spot'],
                where: { lobby_id: ids[1] },
                order: [
                    ['lobby_spot', 'ASC']
                ]
            });

            // Query checks if the user already has an existing character in the lobby
            const existence = await db.models.LobbyMember.findAll({
                attributes: ['lobby_spot'],
                include: [{
                    model: db.models.Character,
                    required: true,
                    where: {
                        account_id: interaction.user.id
                    }
                }],
                where: {
                    lobby_id: ids[1]
                }
            });

            const availableSpot = (existence[0] === undefined) ? findAvailable(lobby) : existence[0].lobby_spot;

            let role = "DPS";
            if (char.class == "Paladin" || "Bard") role = "Support";

            if (char) {
                await db.models.LobbyMember.upsert({ role: role, lobby_spot: availableSpot, lobby_id: ids[1], character_id: ids[2] });
            }

            const channel = await interaction.client.channels.fetch(ids[0]);
            const lobbyMessage = await channel.messages.fetch(ids[1]);
            const lobbyEmbed = lobbyMessage.embeds[0];

            // Adjust the embed to show newly added character
            const newLobbyEmbed = new MessageEmbed(lobbyEmbed);
            newLobbyEmbed.fields[availableSpot] = { name: `${interaction.user.username} has joined`, value: `IGN: ${char.name}\nClass: ${char.class}\nIlvl: ${char.ilvl}`, inline: true };

            await lobbyMessage.edit({ embeds: [newLobbyEmbed] });
            await interaction.update({ content: `Joined lobby as ${char.name}, ${char.class}, ${char.ilvl}`, components: [], ephemeral: true });
        }
        catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Something went wrong with the select-char-menu.', ephemeral: true });
        }
    },
};

// Find first available spot in the lobby
// Returns -1 if the lobby is full
function findAvailable(lobby) {
    if (lobby === undefined || lobby.length == 0) return 0;

    for (let i = 0; i < lobby.length; i++) {
        if (lobby[i].lobby_spot != i) return i;
        if (i == 8) return -1;
    }

    return lobby.length;
}