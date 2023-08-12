"use strict";

const { app } = require("../../src/server");
const { db } = require('../../src/models/index');
const supertest = require("supertest");

beforeAll(async () => {
  await db.sync();
})


function makeid(length) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result.toLowerCase();
}

describe("Authentication and Endpoint Tests", () => {
    let newUser = {};
    let server;
    let req;
    let res;
    let next;

    beforeAll(() => {
        server = app.listen(3001);
    });

    afterAll(() => {
        server.close();
    });

    beforeEach(() => {
        req = {
            headers: {},
            query: {},
        };
        res = {
            status: jest.fn(() => res),
            send: jest.fn(() => res),
        };
        next = jest.fn();
    });

    it("Signup", (done) => {
        const randomString = makeid(10);
        const body = {
            username: randomString,
            email: `${randomString}@gmail.com`,
            password: "secretpassword",
            phoneNumber: "1234567890",
            role: "user",
        };

        supertest(app)
            .post("/signupuser")
            .send(body)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                newUser = { ...res.body };
                return done();
            });
    });
    it("Should successfully sign up a new company", (done) => {
        const randomString = makeid(10);
        const companyInfo = {
            name: randomString,
            email: `${randomString}@company.com`,
            password: "secretpassword",
            phoneNumber: "1234567890",
            role: "company",
        };

        supertest(app)
            .post("/signupcompany")
            .send(companyInfo)
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) return done(err);
                // Verify response properties as needed
                expect(res.body).toHaveProperty("id");
                expect(res.body).toHaveProperty("name", companyInfo.name);
                return done();
            });
    });

    it("Should successfully sign up a new handyman", (done) => {
        const randomString = makeid(10);
        const handymanInfo = {
            username: randomString,
            email: `${randomString}@handyman.com`,
            password: "bashar123",
            phoneNumber: "1234567890",
            role: "handyman",
            genreId: 1 ,
        };

        supertest(app)
            .post("/signuphandyman")
            .send(handymanInfo)
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) return done(err);
                // Verify response properties as needed
                expect(res.body).toHaveProperty("id");
                expect(res.body).toHaveProperty(
                    "username",
                    handymanInfo.username
                );
                return done();
            });
    });

    it("Signin", (done) => {
        const credentials = Buffer.from(
            `${newUser.username}:secretpassword`
        ).toString("base64");

        supertest(app)
            .post("/signin?role=user")
            .set("Authorization", `Basic ${credentials}`)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                console.log("content", res.body);
                newUser = { ...newUser, ...res.body };
                return done();
            });
    });

    it("Create Expertise", (done) => {
        const expertise = {
            name: "electrician",
        };

        supertest(app)
            .post("/experties")
            .send(expertise)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).toHaveProperty("id");
                expect(res.body).toHaveProperty("name", expertise.name);
                return done();
            });
    });

    it("Signup Handyman", (done) => {
        const randomString = makeid(10);
        const expertise = {
            name: "electrician",
        };
        const handymanData = {
            username: randomString,
            email: `${randomString}@gmail.com`,
            password: "secretpassword",
            phoneNumber: "1234567890",
            role: "handyman",
        };

        supertest(app)
            .post("/experties")
            .send(expertise)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);

                const genreId = res.body.id;
                handymanData.genreId = genreId;

                supertest(app)
                    .post("/signuphandyman")
                    .send(handymanData)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        expect(res.body).toHaveProperty("id");

                        return done();
                    });
            });
    });
});




const mockServer = supertest(app);





describe('Server test', () => {
  it(' Not found pages', async () => {
    const res = await mockServer.get('/ttyy');
    expect(res.status).toEqual(404);
  })

  it(' Not found pages', async () => {
    const res = await mockServer.put('/ttyy');
    expect(res.status).toEqual(404);
  })

  it('new task posted with handyman and client ', async () => {
    const res = await mockServer.post('/tasks').send({
        title: "Fix Plumbing Issue",
        description: "Leaky faucet needs to be fixed",
        clientName: "laith",
        dateOfReq: "2023-08-11",
        interval: "5000",
      
       
    
        handymanId: 1,
      
        clientId: 1,
      
        schdualedAt: 1678999200000
      
      }
      );
    
    expect(res.status).toBe(200);
   
  });//
//   describe('Server Error Testing', () => {
//     it('should return 500 internal server error', async () => {
//       const response = await mockServer.get('/error');
//       expect(response.status).toBe(500);
//     });
//   });

  it('get handyman task from his id ', async () => {
    const res = await mockServer.get('/handytasks/1');
    expect(res.status).toBe(200);

  })
  it('get client  task from his id ', async () => {
    const res = await mockServer.get('/clienttasks/1');
    expect(res.status).toBe(200);

  })

  it('get client  task from his id ', async () => {
    const res = await mockServer.patch('/taskshandy/1').send({
        onTime : true,
        costEstimate: {name:"laith"},
     
        reviewOfClient: 5
      
      });
    expect(res.status).toBe(200);

  })
  it('get client  task from his id ', async () => {
    const res = await mockServer.patch('/taskclient/1').send({
        onTime : true,
        costEstimate: {name:"laith"},
     
        reviewOfClient: 5
      
      });
    expect(res.status).toBe(200);

  })




});

describe('handyman routes', () => {
    it(' Not found pages', async () => {
      const res = await mockServer.get('/ttyy');
      expect(res.status).toEqual(404);
    })
  
    it(' Not found pages', async () => {
      const res = await mockServer.put('/ttyy');
      expect(res.status).toEqual(404);
    })
    ////////////////////
  
  //   it('Add new experty record', async () => {
  //     const res = await mockServer.post('/experties').send({
  //       name: 'electric'
       
  //     });
  //     const createEx = JSON.parse(res.text);
  //     expect(res.status).toBe(201);
  //     expect(createEx.name).toEqual('electric')
  //   });//
  
    describe('Server Error Testing', () => {
      it('should return 500 internal server error', async () => {
        const response = await mockServer.get('/error');
        expect(response.status).toBe(500);
      });
    });
  
    it('all handymen records ', async () => {
      const res = await mockServer.get('/handymen');
      expect(res.status).toBe(200);
  
    })
    it('one  handyman record ', async () => {
      const res = await mockServer.get('/handymen/1');
      expect(res.status).toBe(200);
  
    })
  
  
  
  
    it('get handyman with this proffesion id ', async () => {
      const res = await mockServer.get('/handymen/genre/1');
      expect(res.status).toBe(200);
    })
  
  
  
  });




  describe('Dashboard Routes', () => {
    it('should get personal data for a user', async () => {
      const response = await mockServer.get('/dashboard').query({ role: 'user', id: '1' });
         
        
  
      expect(response.status).toBe(200);
  
    });

    it('should get personal data for a handyman', async () => {
      const response = await mockServer.get('/dashboard').query({ role: 'handyman', id: '1' });
        
       
  
      expect(response.status).toBe(200);
  
    });
    it('should get personal data for a company', async () => {
      const response = await mockServer
        .get('/dashboard') 
        .query({ role: 'company', id: '1' });
  
      expect(response.status).toBe(200);
  
    });
    it('should give error 400 that role is not allowed', async () => {
      const response = await mockServer
        .get('/dashboard') 
        .query({ role: 'sasdasd', id: '1' });
  
      expect(response.status).toBe(400);
  
    });
    
    
  
  
  
  
  
  
    it('should update personal data for a client', async () => {
      const response = await mockServer
        .patch('/dashupdate') 
        .query({ role: 'user', id: '1' }) 
        .send({  });
  
      expect(response.status).toBe(200);
     
    });
  
    it('should update personal data for a handyman', async () => {
      const response = await mockServer
        .patch('/dashupdate') 
        .query({ role: 'handyman', id: '1' })
        .send({  });
  
      expect(response.status).toBe(200);
    
    });
  
    it('should update personal data for a company', async () => {
      const response = await mockServer
        .patch('/dashupdate') 
        .query({ role: 'company', id: '1' }) 
        .send({ });
  
      expect(response.status).toBe(200);
   
    });
    it('should give error 400 that role is not allowed', async () => {
      const response = await mockServer
        .patch('/dashupdate') 
        .query({ role: 'asdasda', id: '1' }) 
        .send({  });
  
      expect(response.status).toBe(400);
     
    });
    it('entity not found ', async () => {
      const response = await mockServer
        .patch('/dashupdate') 
        .query({ role: 'company', id: '2' }) 
        .send({  });
  
      expect(response.status).toBe(404);
     
    });
  
  });