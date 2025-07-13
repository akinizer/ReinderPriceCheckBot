const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pricecheck')
    .setDescription('Check an item\'s estimated price')
    .addStringOption(option =>
      option.setName('item')
        .setDescription('Enter the item name')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('server')
        .setDescription('Choose the server')
        .setRequired(true)
        .addChoices(
          { name: 'Silver', value: 'silver' },
          { name: 'Gold', value: 'gold' },
          { name: 'Cross', value: 'cross' }
        ))
    .addStringOption(option =>
      option.setName('type')
        .setDescription('Transaction type')
        .setRequired(true)
        .addChoices(
          { name: 'Buy', value: 'buy' },
          { name: 'Sell', value: 'sell' },
          { name: 'Trade', value: 'trade' },
          { name: 'Value Only', value: 'value' }
        )),

  async execute(interaction) {
    const item = interaction.options.getString('item');
    const server = interaction.options.getString('server');
    const type = interaction.options.getString('type');

    // Example static price
    const estimatedPrice = '50k-70k'; // Replace with real logic later

    const embed = new EmbedBuilder()
      .setColor(0x00AE86)
      .setTitle('📦 Price Check Result')
      .addFields(
        { name: '🧾 Item', value: item, inline: true },
        { name: '🗺️ Server', value: server, inline: true },
        { name: '📊 Type', value: type, inline: true },
        { name: '💰 Estimated Price', value: estimatedPrice, inline: false }
      )
      .setFooter({ text: 'Prices are estimated. Use this as a reference only.' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
