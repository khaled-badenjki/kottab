import logger from '@kottab/utils/logger'
import {createServer} from '@kottab/utils/server'
import db from '@kottab/utils/db'

db.open()
  .then(() => createServer())
  .then(server => {
    server.listen(3000, () => {
      logger.info(`Listening on http://localhost:3000`)
    })
  })
  .catch(err => {
    logger.error(`Error: ${err}`)
  })

