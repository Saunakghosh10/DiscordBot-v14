const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const Database = require("../../../Schemas/giveaway");

module.exports = {
  subCommand: "giveaway.delete",
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const { options } = interaction;
    const id = options.getString("id");

    const errorEmbed = new EmbedBuilder()
      .setTitle("⛔ Error executing command")
      .setColor("Red")
      .setImage("https://media.tenor.com/fzCt8ROqlngAAAAM/error-error404.gif")
      .addFields({
        name: "Error:",
        value: `\`\`\`There were no giveaways found with the provided message ID. - ${id}\`\`\``,
      });

    let giveawayData = await Database.findOne({
      guildId: interaction.guildId,
      messageId: id,
    });
    if (!giveawayData) {
      interaction.reply({
        embeds: [errorEmbed],
        ephemeral: true,
      });
    } else {
      client.giveawaysManager.delete(id);
      await interaction.reply("✅ Success! Giveaway deleted!");
    }
  },
};
