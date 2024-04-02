const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
require('../models')

let token;
let id;

beforeAll(async()=>{
    const credentials = {
      email: "test@test.com",
      password: "1234567890"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
})

test("GET(Get all carts) '/carts' returns status 200 and array", async () => {
    const res = await request(app)
      .get('/carts')
      .set('Authorization', `Bearer ${token}` );
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST(Create cart) '/carts' returns 201", async () => {
    //Las llaves foraneas no son obligatorias pero funcionalmente debemos colocarlas.
    const newCart ={
        quantity: 22
    };
    
    const newProduct = {  //title,	description, brand, price, categoryId.
        title: "Test Title",
        description: "Test Description",
        brand: "Test brand",
        price: 99.99,
    } 
    const product = await Product.create(newProduct);
    newCart.productId = product.id;    
    const res = await request(app)
      .post('/carts')
      .send(newCart)
      .set('Authorization', `Bearer ${token}` );
    id= res.body.id
    await product.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.quantity).toBe(newCart.quantity);
});

test("DELETE(Delete cart) '/carts/:id'", async () => {
    const res = await request(app)
      .delete(`/carts/${id}`)
      .set('Authorization', `Bearer ${token}` );
    expect(res.status).toBe(204);
});




