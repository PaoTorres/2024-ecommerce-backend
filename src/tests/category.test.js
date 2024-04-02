const request = require('supertest');
const app = require('../app');

let token;
let id;
const categoryInfo = { name: "Test Category"};
const updatedCategory = { name: "Updated Test Category"};

beforeAll(async()=>{
  const credentials = {
    email: "test@test.com",
    password: "1234567890"
  }
  const res = await request(app).post('/users/login').send(credentials);
  token = res.body.token;
})

test("GET(Get all categories) '/categories'", async()=>{
  const res = await request(app).get('/categories');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
})

test("POST(Create category) '/categories'", async()=>{
  const res = await request(app)
                          .post(`/categories`)
                          .send(categoryInfo)
                          .set("Authorization", `Bearer ${token}`);
  id= res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(categoryInfo.name);  
})

test("GET(Get category) '/categories/:id'", async()=>{
  const res = await request(app).get(`/categories/${id}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(categoryInfo.name);
})

test("PUT(Update category) '/categories/:id'", async()=>{
  const res = await request(app)
                          .put(`/categories/${id}`)
                          .send(updatedCategory)
                          .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updatedCategory.name);  
})

test("DELETE(Delete category) '/categories/:id'", async()=>{
  const res = await request(app)
                          .delete(`/categories/${id}`)
                          .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
})


