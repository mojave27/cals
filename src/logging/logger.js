const style = {
  plain: 'color:white;backgroundColor:#222;',
  alert:
    'color:yellow;backgroundColor:red;border:1px solid yellow;font-weight:bold'
}

const logger = {
  info: (message, value) =>
    console.log(`%${message}: ${value}`, `${style.plain}`),
  alert: (message, value) =>
    console.log(`%${message}: ${value}`, `${style.alert}`),
  logColor: (message, value, color) => {
    console.log(
      `%c${message}: ${value}`,
      `color:${color};backgroundColor:#222;border:1px solid ${color}`
    )
  }
}

/*  example usage:
 *  logger.info('id', item.id)
 *  logger.alert('ERROR', err.message)
 *  logger.logColor('AFTER', JSON.stringify(program.schedule.days), 'cyan')
 */

module.exports = {
  logger
}
