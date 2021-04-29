const request = require('supertest')
const buildApp = require('../../app')
const UsersRepo = require('../../repos/users-repo')
const Context = require('../context')

let context
beforeAll(async () => {
  context = await Context.build()
})

beforeEach(() => context.reset())

afterAll(() => context.close())

it('Create a user', async () => {
  const startingCount = await UsersRepo.count()

  await request(buildApp())
    .post('/users')
    .send({ username: 'test user', bio: 'test bio' })
    .expect(200)

  const finishCount = await UsersRepo.count()
  expect(finishCount - startingCount).toEqual(1)
})