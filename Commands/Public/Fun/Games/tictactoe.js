const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const { TicTacToe } = require("discord-gamecord");

module.exports = {
  subCommand: "games.tic-tac-toe",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const user = interaction.options.getUser("user");

    const Game = new TicTacToe({
      message: interaction,
      isSlashGame: true,
      opponent: user,
      embed: {
        title: "Tic Tac Toe",
        rejectTitle: "Cancelled Request",
        statusTitle: "Status",
        overTitle: "Game Over",
        color: "#00FF00",
        rejectColor: "#ED4245",
      },
      emojis: {
        xButton: "❌",
        oButton: "🔵",
        blankButton: "➖",
      },
      mentionUser: true,
      timeoutTime: 50000,
      buttonStyle: "PRIMARY",
      turnMessage: "{emoji} | Its the turn of player **{player}**!",
      winMessage: "{emoji} | **{player}** has won the Tic Tac Toe Game!",
      tieMessage: "Game tied! The Game has no winner!",
      timeoutMessage: "The Game wasn't completed! The Game has no winner! ",
      playerOnlyMessage: "Only {player} and {opponent} can use these buttons!",
    });

    await Game.startGame();
  },
};
