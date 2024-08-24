const { Client, Intents, Permissions } = require('discord.js');
const { token, guildId, channelToMonitorId, categoryToCreateChannelId, prefix } = require('./config');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setPresence({
        activities: [{ name: 'Voice Channel', type: 'WATCHING' }], 
        status: 'online', 
    });
});

client.on('voiceStateUpdate', async (oldState, newState) => {
    const guild = client.guilds.cache.get(guildId);
    const categoryToCreateChannel = guild.channels.cache.get(categoryToCreateChannelId);
    const channelToMonitor = guild.channels.cache.get(channelToMonitorId);

    if (!guild || !categoryToCreateChannel || !channelToMonitor) {
        console.error('Guild or channels not found. Check IDs in config.js.');
        return;
    }

    if (newState.channelId === channelToMonitor.id && newState.channelId !== oldState.channelId) {
        try {
            const newChannel = await guild.channels.create(`${newState.member.displayName}'s Channel`, {
                type: 'GUILD_VOICE',
                parent: categoryToCreateChannel.id,
                permissionOverwrites: [
                    {
                        id: newState.member.id,
                        allow: [Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK, Permissions.FLAGS.VIEW_CHANNEL],
                    },
                    {
                        id: guild.roles.everyone.id,
                        deny: [Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK, Permissions.FLAGS.VIEW_CHANNEL],
                    },
                ],
            });

            await newState.setChannel(newChannel);
        } catch (error) {
            console.error('Error creating or moving user to new channel:', error);
        }
    }

    if (oldState.channelId && oldState.channelId !== channelToMonitor.id && oldState.channel && oldState.channel.parentId === categoryToCreateChannelId) {
        try {
            const dynamicChannel = oldState.channel;

            setTimeout(async () => {
                try {
                    await dynamicChannel.delete();

                } catch (error) {
                    console.error('Error deleting channel:', error);
                }
            }, 1000); 
        } catch (error) {
            console.error('Error scheduling channel deletion:', error);
        }
    }
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (commandName === 'addfriend') {
        message.channel.send('Executing addfriend command!');
    } else {
        message.reply(`Command \`${commandName}\` not found.`);
    }
});

client.login(token).catch(console.error);
