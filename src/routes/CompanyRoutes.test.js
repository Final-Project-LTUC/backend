const request = require("supertest");
const express = require("express");
const { companyModel } = require("../models/index"); // Import your company model
const companyRoutes = require("./CompanyRoutes"); // Import the routes to be tested

const app = express();
app.use(express.json());
app.use("/", companyRoutes);

jest.mock("../models/index", () => ({
    companyModel: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
    },
}));

describe("Company Routes", () => {
    // Test for GET /companies
    describe("GET /companies", () => {
        it("should return all companies", async () => {
            const mockCompanies = [
                { id: 1, name: "Company A" },
                { id: 2, name: "Company B" },
            ];
            companyModel.findAll.mockResolvedValue(mockCompanies);

            const response = await request(app).get("/companies");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCompanies);
        });

        it("should handle errors", async () => {
            companyModel.findAll.mockRejectedValue(new Error("Database error"));

            const response = await request(app).get("/companies");

            expect(response.status).toBe(500);
            expect(response.text).toBe("Internal Server Error");
        });
    });

    // Test for GET /companies/:id
    describe("GET /companies/:id", () => {
        it("should return a specific company by ID", async () => {
            const mockCompany = { id: 1, name: "Company A" };
            companyModel.findByPk.mockResolvedValue(mockCompany);

            const response = await request(app).get("/companies/1");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCompany);
        });

        it("should handle company not found", async () => {
            companyModel.findByPk.mockResolvedValue(null);

            const response = await request(app).get("/companies/999");

            expect(response.status).toBe(404);
            expect(response.text).toBe("Company not found");
        });

        it("should handle errors", async () => {
            companyModel.findByPk.mockRejectedValue(
                new Error("Database error")
            );

            const response = await request(app).get("/companies/1");

            expect(response.status).toBe(500);
            expect(response.text).toBe("Internal Server Error");
        });
    });
});
