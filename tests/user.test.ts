// tests/user.e2e.test.ts
import request from 'supertest';

const API_URL = 'http://localhost:3000/api';

const testUser = {
  email: `user${Date.now()}@mail.com`,
  password: 'testpassword123',
  name: 'Test User',
};

let jwtToken: string;

describe('User API E2E', () => {
  it('POST /users/signup - should register a user', async () => {
    const res = await request(API_URL)
      .post('/users/signup')
      .send(testUser);

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();

    jwtToken = res.body.token;
  });

  it('POST /users/login - should login user', async () => {
    const res = await request(API_URL)
      .post('/users/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();

    jwtToken = res.body.token;
  });

  it('GET /users/me - should return user info when authenticated', async () => {
    const res = await request(API_URL)
      .get('/users/me')
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(testUser.email);
    expect(res.body.name).toBe(testUser.name);
  });

  it('GET /users/me - should return 401 without token', async () => {
    const res = await request(API_URL).get('/users/me');
    expect(res.status).toBe(401);
  });
});
