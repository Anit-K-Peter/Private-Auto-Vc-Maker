### Setting Up Your Discord Bot

1. **Clone the Repository**
   - Clone or download the repository containing your Discord bot's source code from GitHub or your preferred hosting service.

2. **Install Dependencies**
   - Make sure Node.js and npm (Node Package Manager) are installed on your system.
   - Navigate to the directory where your bot's code is located using the terminal or command prompt.
   - Run `npm install` to install all required dependencies listed in `package.json`.

3. **Configuration**
   - Locate the `config.js` file in your project directory.

4. **Configure `config.js`**
   - Open `config.js` in a text editor.
   - Replace the placeholder values with your actual bot token, client ID, guild ID, channel IDs, and any other necessary configuration details.

   Example `config.js`:

   ```javascript
   module.exports = {
       token: 'YOUR_BOT_TOKEN', // Replace with your bot token
       clientId: 'YOUR_CLIENT_ID', // Replace with your bot's client ID
       guildId: 'YOUR_GUILD_ID', // Replace with your server ID (guild ID)
       channelToMonitorId: 'CHANNEL_ID_TO_MONITOR', // Replace with the channel ID you want to monitor
       categoryToCreateChannelId: 'CATEGORY_ID_TO_CREATE_CHANNEL', // Replace with the category ID where new channels will be created
       channelNameFormat: '{username}\'s Channel', // Customize the format of the new channel names
       prefix: '!', // Replace with your bot's prefix for commands
   };
   ```

5. **Run Your Bot**
   - Save `config.js` after making changes.
   - Start your bot by running `node bot.js` (replace `bot.js` with your main bot file if it's named differently).

6. **Invite Your Bot to Your Server**
   - Create a Discord application at the [Discord Developer Portal](https://discord.com/developers/applications).
   - Under the "OAuth2" tab, select the bot scope and copy the generated OAuth2 URL.
   - Paste the URL into your browser, select the server where you want to add the bot, and authorize it.

7. **Start Using Your Bot**
   - Once invited, your bot should be online in your server. Use the specified prefix (e.g., `!`) followed by commands to interact with it.

### Additional Notes

- **Security**: Never share your bot token publicly. Keep `config.js` and other sensitive information secure.
- **Troubleshooting**: If you encounter issues, check console logs for error messages and ensure your bot has necessary permissions.
- **Customization**: Modify the `channelNameFormat` and other settings in `config.js` to fit your specific bot's functionality and server setup.
