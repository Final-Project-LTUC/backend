"use strict";

const { app } = require("../server");

const supertest = require("supertest");

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
