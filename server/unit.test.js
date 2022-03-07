/**
 * Test suite for the api, this will be added to as and when new routes are created and
 * have the need to stay the same. in order to run the suite you can type 'npm test' in
 * the console and it will run through jester. The port files have been separated so in
 * order to run the server you must now type 'node app' rather than previously 'node server'.
 *
 * @author Jordan Short
 */
require('mysql2/node_modules/iconv-lite').encodingExists('foo')
const request = require('supertest')
const app = require('./server')

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjQ2MTQyODYyLCJleHAiOjE2NDYzMTU2NjJ9.qgFkgvdIvFgOIhtpAHF51gP5kPaFd6YLkrw3ggJteRs'

describe('Root path', () => {
  test('Should return status code of 200', async () => {
    const response = await request(app).get('/api/test/all')
    expect(response.statusCode).toBe(200)
  })
})

describe('Signup path', () => {
  test('Should send status code of 400 as user should already be in the database', async () => {
    const response = await request(app).post('/api/auth/signup').send({
      username: 'Test',
      email: 'test@test',
      password: '12356'
    })
    expect(response.statusCode).toBe(400)
  })
})

describe('Login path', () => {
  test('Login should return status code of 200', async () => {
    const response = await request(app).post('/api/auth/signin').send({
      username: 'Test',
      password: '12356'
    })
    await expect(response.statusCode).toBe(200)
  })
  test('Login should return JSON formatted information', async () => {
    const response = await request(app).post('/api/auth/signin').send({
      username: 'Test',
      password: '12356'
    })
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
  })
})

describe('Admin Panel', () => {
  test('User list should return status code of 200', async () => {
    const response = await request(app).post('/api/admin/users').set({ Authorization: token }).send({
    })
    expect(response.statusCode).toBe(200)
  })
})
