const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');
require('../models');

let id;
let token;
const newProduct = {  //title,	description, brand, price, categoryId.
    title: "Test Title",
    description: "Test Description",
    brand: "Test brand",
    price: 99.99,
}  
const updatedProduct = { 
    title: "Updated Test Title",
    description: "Updated Test Description",
    brand: "Updated Test Brand",
    price: 33.99,
}

beforeAll(async()=>{
    const credentials = {
      email: "test@test.com",
      password: "1234567890"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
})


test("GET(Get all products) '/products' retorna status 200", async()=>{
    const res= await request(app).get('/products');
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});


test("POST(Create product) '/products' retorna status 201 y un id", async()=>{
    const testCategory = await Category.create({name: "Test Category"});
    newProduct.categoryId = testCategory.id;
    const res= await request(app)
                         .post('/products')
                         .send(newProduct)
                         .set("Authorization", `Bearer ${token}`);
    id = res.body.id;
    //console.log(`OJOOOOOOOOOOOOOOOOOOO ${id}`)
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe(newProduct.title);
    await testCategory.destroy();
});

test("GET(Get product) '/products/:id' retorna status 200", async()=>{
    const res = await request(app).get(`/products/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(newProduct.title);
});

test("PUT(Update product) '/products/:id' retorna status 200", async()=>{
    const res= await request(app)
                         .put(`/products/${id}`)
                         .send(updatedProduct)
                         .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updatedProduct.title);
});

test("DELETE(Delete product) '/products/:id' retorna status 204", async()=>{
    const res= await request(app)
                         .delete(`/products/${id}`)
                         .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
});
