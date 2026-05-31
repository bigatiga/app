const request = require('supertest');
const app = require('../src/app');

describe('GET /health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /api/greet', () => {
  it('greets with default name', async () => {
    const res = await request(app).get('/api/greet');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello, World!');
  });

  it('greets with custom name', async () => {
    const res = await request(app).get('/api/greet?name=Alice');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello, Alice!');
  });

  it('rejects empty name', async () => {
    const res = await request(app).get('/api/greet?name=');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});
