// src/config/logger.js

const { createLogger, format, transports } = require('winston');
const util    = require('util')
const moment  = require('moment')
const winston = require('winston')

module.exports = createLogger({  // ......... transporte provisional ...despues implementar con mongo e imprinir tb....
transports:
    new transports.File({
    filename: 'logs/server.log',
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}),
});

//-------------conectar transporte con mongo db

// 

// ...........exportar transporte a index raiz

class Logger {
  constructor() {
    this.winstonLogger = winston.createLogger({
      levels      : { error: 1, warn: 2, info: 3 },
      transports  : this._createTransports(),
      exitOnError : false,
    })
  }

  info(message, data) { this.winstonLogger.info({ message, data }) }
  warn(message, data) { this.winstonLogger.warn({ message, data }) }
  error(message, data) { this.winstonLogger.error({ message, data }) }

  _createTransports() {
    const TRANSPORTS = []
    TRANSPORTS.push(new winston.transports.Console({
      format           : winston.format.printf(this._consoleFormat()),
      level            : 'info', // Muestra logs de nivel 3 o menor
      handleExceptions : false,
      colorize         : false,
      json             : false,
    }))
    Array.from(['info', 'warn', 'error']).forEach(level => {
      TRANSPORTS.push(new winston.transports.File({
        format           : winston.format.printf(this._fileFormat()),
        level            : level,
        handleExceptions : false,
        colorize         : false,
        json             : true,
        filename         : `logs/${level}.log`,
        maxsize          : 5242880, // 5242880 Bytes = 5 MB
        maxFiles         : 5,
      }))
    })
    return TRANSPORTS
  }

  _consoleFormat () {
    const COLORS = {
      error : `\x1b[91m`, // Rojo
      warn  : `\x1b[93m`, // Amarillo
      info  : `\x1b[96m`, // Celeste
      reset : `\x1b[0m`,  // Restaurar al color por defecto
    }
    return (info) => {
      const START     = COLORS[info.level]
      const END       = COLORS.reset
      const TIMESTAMP = moment().format('DD/MM/YYYY HH:mm:ss')
      const LEVEL     = info.level
      const MESSAGE   = info.message
      const DATA      = info.data ? util.inspect(info.data, false, null) : ''
      return `${START} ${TIMESTAMP} [${LEVEL}] ${MESSAGE} ${DATA} ${END}`
    }
  }

  _fileFormat() {
    return (info)  => {
      const TIMESTAMP = moment().format('DD/MM/YYYY HH:mm:ss')
      const LEVEL     = info.level
      const MESSAGE   = info.message
      const DATA      = info.data ? util.inspect(info.data, false, null) : null
      return JSON.stringify({
        timestamp : TIMESTAMP,
        level     : LEVEL,
        message   : MESSAGE,
        data      : DATA,
      })
    }
  }
}

module.exports = Logger
