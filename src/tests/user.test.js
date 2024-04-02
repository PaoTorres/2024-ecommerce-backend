const request = require('supertest');
const app = require('../app')

let id;
let userData = {
    firstName: "FirstName1",
    lastName: "LastName1",
    email: "test1@test.com",
    password: "1234567890",
    phone: "300000000",
}
let token;

test("POST(Create user) '/users' se obtiene status 201 y un id de usuario",async()=>{
    const res= await request(app).post('/users').send(userData);
    id= res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(userData.firstName)
})

test("POST(Login user) '/users/login' status 200 y el token de usuario",async()=>{
    const credentials = {
        email: userData.email, 
        password: userData.password
    }
    const res= await request(app).post(`/users/login`).send(credentials);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(userData.email)
})

test("POST(Login user) '/users/login' con credenciales incorrectas status 401",async()=>{
    const credentials = {
        email: "aaa@prueba.com",
        password: "123"
    }
    const res= await request(app).post(`/users/login`).send(credentials);
    expect(res.status).toBe(401);
})

test("GET(Get all users) '/users' status 200 y se obtiene un arreglo de usuarios",async()=>{
    const res= await request(app)
                        .get('/users')
                        .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test("GET(Get user) '/users/:id' returns status 200 and the user data.",async()=>{
    const res= await request(app)
                        .get(`/users/${id}`)
                        .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
    expect(res.body.firstName).toBe(userData.firstName)
})

test("GET(Get logged user) '/users/me' returns status 200 and users data.",async()=>{
    const res= await request(app)
                        .get("/users/me")
                        .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
    expect(res.body.firstName).toBe(userData.firstName)
})

test("PUT(Update logged user) '/users' returns status 200 and a the user data. The data sent and received must match.",async()=>{
    const updatedUserData = {
        firstName: "Amada Isabel",
        lastName: "Flores Centeno",
        phone: "300000000",
    }
    const res= await request(app)
                        .put(`/users`)
                        .send(updatedUserData)
                        .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
    expect(res.body.firstName).toBe(updatedUserData.firstName)
})

test("DELETE(Delete logged user) '/users' returns status 204",async()=>{
    const res= await request(app)
                        .delete(`/users`)
                        .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
})

