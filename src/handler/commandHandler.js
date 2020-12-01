const fs = require('fs');

// init handler
const commands = [];

const commandFiles = fs.readdirSync('./src/command').filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
    const command = require(`../command/${file}`);
    commands.push(command)
});

module.exports = {
    handle(message) {
        // build better guard
        if (!message) return;

        const arguments = message.split(' ')
        const commandIdentifier = arguments.shift().slice(1)
        const command = commands.find(x => x.name === commandIdentifier)

        if (!command) {
            console.log('no command found')
            return;
        }

        if (command.adminOnly && /*if author is no Admin*/false) {
            console.log('you cannot execute this command')
            return;
        }

        if (command.serverModeratorOnly && /*if author is no server owner */false) {
            console.log('you must be a server owner')
        }

        command.execute(message, arguments)
    }
}