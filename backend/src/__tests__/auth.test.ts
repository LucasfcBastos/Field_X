import request from 'supertest'
import app from '../app'

// Estes testes validam o comportamento da API sem banco real.
// Para testes de integração completos, configure um ambiente Supabase de teste.

describe('POST /auth/signin', () => {
  it('should return 400 when email is missing', async () => {
    const res = await request(app).post('/auth/signin').send({ password: 'test1234' })
    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
  })

  it('should return 400 when password is too short', async () => {
    const res = await request(app).post('/auth/signin').send({ email: 'test@test.com', password: '123' })
    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
  })
})

describe('POST /auth/signup', () => {
  it('should return 400 when name is missing', async () => {
    const res = await request(app).post('/auth/signup').send({ email: 'test@test.com', password: 'password123' })
    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
  })
})

describe('GET /auth/profile', () => {
  it('should return 401 without token', async () => {
    const res = await request(app).get('/auth/profile')
    expect(res.status).toBe(401)
    expect(res.body.success).toBe(false)
  })
})

describe('GET /farms', () => {
  it('should return 401 without token', async () => {
    const res = await request(app).get('/farms')
    expect(res.status).toBe(401)
  })
})

describe('Response format', () => {
  it('health endpoint returns JSON with status field', async () => {
    const res = await request(app).get('/health')
    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.body.status).toBe('ok')
  })

  it('API error responses have success: false', async () => {
    const res = await request(app).get('/farms')
    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.body.success).toBe(false)
  })
})
