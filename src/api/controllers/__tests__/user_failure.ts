import request from 'supertest'
import {Express} from 'express-serve-static-core'

import UserService from '@kottab/api/services/user'
import {createServer} from '@kottab/utils/server'

jest.mock('@kottab/api/services/user')

let server: Express
beforeAll(async () => {
  server = await createServer()
})

describe('auth failure', () => {
  it('should return 500 & valid response if auth rejects with an error', done => {
    (UserService.auth as jest.Mock).mockRejectedValue(new Error())
    request(server)
      .get(`/api/v1/goodbye`)
      .set('Authorization', 'Bearer fakeToken')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err)
        expect(res.body).toMatchObject({error: {type: 'internal_server_error', message: 'Internal Server Error'}})
        done()
      })
  })
})
