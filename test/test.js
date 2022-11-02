const request = require('supertest');

const app = require('../server/index');

describe('API Routes Testing', () => {
  it('test GET request /qa/questions', async () => {
    const response = await request(app).get('/qa/questions');
    expect(response.statusCode).toBe(200);
  });

  it('test POST request /qa/questions', async () => {
    const response = await request(app).post('/qa/questions');
    expect(response.statusCode).toBe(200);
  });
});

// describe('Sample Test', () => {
//   const add = (a, b) => (
//     a + b
//   );

//   test('add 3 + 7 to equal 10', () => {
//     expect(add(3, 7)).toBe(10);
//   });
// });
