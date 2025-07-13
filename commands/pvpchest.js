const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pvpchest')
    .setDescription('Estimate value based on PvP chest rarity')
    .addStringOption(option =>
      option.setName('rarity')
        .setDescription('Select the rarity of the chest reward')
        .setRequired(true)
        .addChoices(
          { name: 'Very Rare', value: 'veryrare' },
          { name: 'Rare', value: 'rare' },
          { name: 'Common/Uncommon', value: 'common' }
        )
    ),

  async execute(interaction) {
    const rarity = interaction.options.getString('rarity');

    const priceMap = {
      veryrare: '💰 Estimated Value: **10m+**',
      rare: '💰 Estimated Value: **~5m**',
      common: '💰 Estimated Value: **Less than 5m**'
    };

    const displayName = {
      veryrare: 'Very Rare',
      rare: 'Rare',
      common: 'Common / Uncommon'
    };

    const embed = new EmbedBuilder()
      .setColor(0x6a0dad)
      .setTitle('🎖️ PvP Chest Value')
      .addFields(
        { name: 'Rarity', value: displayName[rarity], inline: true },
        { name: 'Value', value: priceMap[rarity], inline: true }
      )
      .setFooter({ text: 'Values are based on average PvP reward markets.' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
