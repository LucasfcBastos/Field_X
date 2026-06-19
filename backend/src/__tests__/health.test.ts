import request from 'supertest'
import app from '../app'

describe('GET /health', () => {
  it('should return 200 with status ok', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
    expect(res.body.timestamp).toBeDefined()
  })
})

describe('GET /nonexistent', () => {
  it('should return 404', async () => {
    const res = await request(app).get('/nonexistent-route')
    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
  })
})
