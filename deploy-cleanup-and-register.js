require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const rest = new REST().setToken(process.env.TOKEN);
const commands = [];

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.warn(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
  }
}

const guilds = process.env.GUILD_IDS?.split(',') || [];

(async () => {
  try {
    // Delete all global commands
    console.log('🧹 Cleaning up global commands...');
    const globalCommands = await rest.get(Routes.applicationCommands(process.env.CLIENT_ID));
    for (const cmd of globalCommands) {
      console.log(`🗑️ Deleting global command: ${cmd.name}`);
      await rest.delete(Routes.applicationCommand(process.env.CLIENT_ID, cmd.id));
    }
    console.log('✅ Global commands cleaned.');

    // Delete all commands from each guild
    for (const guildId of guilds) {
      try {
        console.log(`🧹 Cleaning commands from guild: ${guildId.trim()}...`);
        const guildCommands = await rest.get(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId.trim()));
        for (const cmd of guildCommands) {
          console.log(`🗑️ Deleting guild command: ${cmd.name} from guild ${guildId.trim()}`);
          await rest.delete(Routes.applicationGuildCommand(process.env.CLIENT_ID, guildId.trim(), cmd.id));
        }
        console.log(`✅ Commands cleaned from guild: ${guildId.trim()}`);
      } catch (guildDeleteError) {
        console.error(`❌ Failed to clean guild commands for ${guildId.trim()}:`, guildDeleteError);
      }
    }

    // Register commands to each guild
    for (const guildId of guilds) {
      try {
        console.log(`🔁 Registering commands to guild: ${guildId.trim()}...`);
        await rest.put(
          Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId.trim()),
          { body: commands }
        );
        console.log(`✅ Successfully registered commands for guild: ${guildId.trim()}`);
      } catch (guildRegisterError) {
        console.error(`❌ Failed to register commands for guild ${guildId.trim()}:`, guildRegisterError);
      }
    }

  } catch (error) {
    console.error('❌ Deployment error:', error);
  }
})();

