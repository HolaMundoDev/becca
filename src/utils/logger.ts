import { config, createLogger, format, transports } from 'winston'

const { combine, timestamp, printf } = format

const logger = createLogger({
  level: 'silly',
  levels: config.npm.levels,
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combined.log' })
  ],
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf(
      (info) =>
        `${info.timestamp} - ${info.level.toUpperCase()} - ${info.message}`
    )
  ),
  exitOnError: false
})

export default logger
