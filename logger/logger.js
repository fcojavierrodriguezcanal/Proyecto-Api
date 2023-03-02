const Logger = require('./src/config/logger');
const logger = new Logger();



logger.info('LOG: Mensaje con datos', { id: 'javier' }) ;

export{logger};