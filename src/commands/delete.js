const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('delete a character from your account')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('name of character to delete')
                .setRequired(true)
        ),
    async execute(db, interaction) {
        try {
            const account_id = interaction.user.id;
            const name = interaction.options.getString('name');
            const char = await db.models.Character.destroy({ where: { account_id: account_id, name: name } });
            if (!char) return interaction.reply({ content: 'That character does not exist.', ephemeral: true });

            await interaction.reply({ content: 'Character has been deleted.', ephemeral: true });
        }
        catch (error) {
            console.log(error);
            await interaction.reply({ content: 'Something went wrong deleting a character.', ephemeral: true });
        }
    },
};