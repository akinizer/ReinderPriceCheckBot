require('dotenv').config();
const { REST, Routes } = require('discord.js');
const rest = new REST().setToken(process.env.TOKEN);

(async () => {
  try {
    const commands = await rest.get(
      Routes.applicationCommands(process.env.CLIENT_ID)
    );

    for (const command of commands) {
      console.log(`🗑️ Deleting global command: ${command.name}`);
      await rest.delete(
        Routes.applicationCommand(process.env.CLIENT_ID, command.id)
      );
    }

    console.log('✅ Done cleaning up global commands.');
  } catch (error) {
    console.error('❌ Error cleaning global commands:', error);
  }
})();
