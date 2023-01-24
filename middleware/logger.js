const chalk = require('chalk');
const logger = (req, res, next) => {
    console.log( chalk.green('####################REQUEST###################'));
    console.log(chalk.inverse.green("METHOD: "), chalk.yellow(req.method) );
    console.log(chalk.inverse.green("HOST: "), chalk.yellow(`${req.hostname}:${req.port}`) )
    next();
} 

module.exports = { logger };