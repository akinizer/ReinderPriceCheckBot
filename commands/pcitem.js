const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pcitem')
    .setDescription('Check the price of a popular held item')
    .addStringOption(option =>
      option.setName('item')
        .setDescription('Select the held item')
        .setRequired(true)
        .addChoices(
          { name: 'Choice Item', value: 'choiceitem' },
          { name: 'Leftovers', value: 'leftovers' },
          { name: 'Life Orb', value: 'lifeorb' },
          { name: 'Assault Vest', value: 'assaultvest' },
          { name: 'Rocky Helmet', value: 'rockyhelmet' },
          { name: 'Focus Sash', value: 'focussash' },
          { name: 'Eviolite', value: 'eviolite' },
          { name: 'Black Glasses', value: 'blackglasses' },
          { name: 'Black Sludge', value: 'blacksludge' },
          { name: 'Heat Rock', value: 'heatrock' },
          { name: 'Damp Rock', value: 'damprock' },
          { name: 'Smooth Rock', value: 'smoothrock' },
          { name: 'Flame Orb', value: 'flameorb' },
          { name: 'Toxic Orb', value: 'toxicorb' },
          { name: 'Light Clay', value: 'lightclay' },
          { name: 'Quick Claw', value: 'quickclaw' },
          { name: 'King\'s Rock', value: 'kingsrock' },
          { name: 'Wide Lens', value: 'widelens' }
        )
    ),

  async execute(interaction) {
    const item = interaction.options.getString('item');

    // 🔧 Example price map
    const priceMap = {
      leftovers: '5k',
      lifeorb: '40k',
      assaultvest: '200-250k',
      rockyhelmet: '150k',
      focussash: '1k-2.5k',
      eviolite: '50k-60k',
      blackglasses: '8k-10k',
      blacksludge: '20k',
      heatrock: '20k-30kk',
      damprock: '20k-30k',
      smoothrock: '10k-30k',
      flameorb: '30k-50k',
      toxicorb: '25k-30k',
      lightclay: '20k-35k',
      quickclaw: '15k-25k',
      kingsrock: '15k',
      widelens: '20k'
    };

    const price = priceMap[item] || 'Unknown';

    const embed = new EmbedBuilder()
      .setColor(0xffd700)
      .setTitle('💼 Item Price Check')
      .addFields(
        { name: 'Item', value: item.replace(/(^\\w|\\s\\w)/g, l => l.toUpperCase()), inline: true },
        { name: 'Estimated Price', value: price, inline: true }
      )
      .setFooter({ text: 'Prices are estimates and may vary by server.' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
