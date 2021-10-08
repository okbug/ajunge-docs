const config = {
    'port': {
        option: '-p,--port <n>',
        description: 'set server port',
        default: 8080,
        usage: 'zsl --port <n>'
    },
    'directory': {
        option: '-d,--directory <n>',
        description: 'set server directory',
        default: process.cwd(),
        usage: 'zsl -d D:'
    }
}


module.exports = config