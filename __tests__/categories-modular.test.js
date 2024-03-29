const Categories = require('../src/models/categories/categories.js');
let categories = new Categories();


const app = require('../src/app.js');
const supertest = require('./supergoose.js');
const mockRequest = supertest(app.server);


describe('Categories Model (Modular)', () => {

  beforeEach(async () => {
    await categories.deleteMany({});
  });

  // How will you handle both the happy path and edge cases in these tests?

  it('can create() a new category', async () => {
    let obj = { _id: '1', name: 'John', description: 'Person' };
    const response = await mockRequest.post('/api/v1/categories').send(obj);  
    const record = JSON.parse(response.res.text);
    Object.keys(obj).forEach(key => {
      expect(record[key]).toEqual(obj[key]);
    });  
  });

  it('can get() a category', async () => {
    let obj = { _id: '1', name: 'John', description: 'Person' };
    await mockRequest.post('/api/v1/categories').send(obj);
    const response = await mockRequest.get('/api/v1/categories');
    const records = JSON.parse(response.res.text);
    Object.keys(obj).forEach(key => {
      expect(records.results[0][key]).toEqual(obj[key]);
    });
  });

  it('can update() a category', async () => {
    let obj = { _id: '1', name: 'John', description: 'Person' };
    await mockRequest.post('/api/v1/categories').send(obj);
    await mockRequest.put('/api/v1/categories/1').send({name: 'Tarzan'});
    const response = await mockRequest.get('/api/v1/categories');
    const records = JSON.parse(response.res.text);
    expect(records.results[0].name).toEqual('Tarzan');
  });

  it('can delete() a category', async () => {
    let obj = { _id: '1', name: 'John', description: 'Person' };
    await mockRequest.post('/api/v1/categories').send(obj);
    await mockRequest.delete('/api/v1/categories/1');
    const response = await mockRequest.get('/api/v1/categories');
    const records = JSON.parse(response.res.text);
    expect(records.count).toEqual(0);
  });

});