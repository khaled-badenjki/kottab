import * as express from 'express'

import UserService from '@kottab/api/services/user'
import {writeJsonResponse} from '@kottab/utils/express'
import logger from '@kottab/utils/logger'

export function auth(req: express.Request, res: express.Response, next: express.NextFunction): void {
  const token = req.headers.authorization!
  UserService.auth(token)
    .then(authResponse => {
      if (!(authResponse as any).error) {
        res.locals.auth = {
          userId: (authResponse as {userId: string}).userId
        }
        next()
      } else {
        writeJsonResponse(res, 401, authResponse)
      }
    })
    .catch(err => {
      writeJsonResponse(res, 500, {error: {type: 'internal_server_error', message: 'Internal Server Error'}})
    })
}

export function createUser(req: express.Request, res: express.Response, next: express.NextFunction): void {
  const {email, password, name} = req.body

  UserService.createUser(email, password, name)
    .then(resp => {
      if ((resp as any).error) {
        if ((resp as any).error.type === 'account_already_exists') {
          writeJsonResponse(res, 409, resp)
        } else {
          throw new Error(`unsupported ${resp}`)
        }
      } else {
        writeJsonResponse(res, 201, resp)
      }
    })
    .catch((err: any) => {
      logger.error(`createUser: ${err}`)
      writeJsonResponse(res, 500, {error: {type: 'internal_server_error', message: 'Internal Server Error'}})
    })
}
