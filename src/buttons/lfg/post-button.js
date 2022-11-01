
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: {
        name: 'post-button',
    },
    async execute(db, interaction) {
        try {
            const embed = interaction.message.embeds[0];
            const buttons = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('join-button')
                        .setLabel('Join')
                        .setStyle('PRIMARY'),
                )
                .addComponents(
                    new MessageButton()
                        .setCustomId('leave-button')
                        .setLabel('Leave')
                        .setStyle('PRIMARY'),
                )
                .addComponents(
                    new MessageButton()
                        .setCustomId('kick-button')
                        .setLabel('Kick')
                        .setStyle('PRIMARY'),
                )
                .addComponents(
                    new MessageButton()
                        .setCustomId('delete-button')
                        .setLabel('Delete')
                        .setStyle('PRIMARY'),
                );

            const account_id = interaction.user.id;
            const account = await db.models.Account.findOne({
                attributes: ['message'],
                where: { account_id: account_id }
            });

            const msg = await interaction.channel.send({ embeds: [embed], components: [buttons], ephemeral: true });

            // msg.id saved as future interactions will be need the original message's id
            await db.models.Lobby.create({ lobby_id: msg.id, account_id: account_id, message: account.message, max_spots: 8 });
            await interaction.update({ content: "Successfully posted your lobby.", embeds: [], components: [], ephemeral: true });
        }
        catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Something went wrong with posting the LFG lobby.' })
        }
    },
};