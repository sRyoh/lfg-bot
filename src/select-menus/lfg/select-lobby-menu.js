const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: {
        name: 'select-lobby-menu',
    },
    async execute(db, interaction) {
        try {
            const message = interaction.values[0].split(" ");
            const temp = message.splice(1);
            const msg = temp.join(" ");
            const username = interaction.user.username;
            const iconURL = interaction.user.displayAvatarURL();
            const embed = new MessageEmbed()
                .setColor('#0399af')
                .setTitle(`Lobby for ${message[0]} Raid`)
                .setDescription(msg)
                .setAuthor({ name: `Party Leader: ${username}`, iconURL: iconURL })
                .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                .setImage('https://i.imgur.com/AfFp7pu.png');

            const button = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('post-button')
                        .setLabel('Post')
                        .setStyle('PRIMARY'),
                );

            await interaction.update({ embeds: [embed], components: [button], ephemeral: true });
        }
        catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Something went wrong with the select-lobby-menu.', ephemeral: true });
        }
    },
};