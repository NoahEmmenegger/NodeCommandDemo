const fs = require('fs');

// init handler
const commands = [];

const commandFiles = fs.readdirSync('./src/command').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`../command/${file}`);
    commands.push(command)
}

module.exports = {
    handle(message) {
        // build better guard
        if(!message) return;

        const arguments = message.split(' ')
        const commandIdentifier = arguments.shift().slice(1)
        const command = commands.find(x => x.name === commandIdentifier)

        if(!command) {
            console.log('no command found')
            return;
        }

        command.execute(arguments)
    }
}