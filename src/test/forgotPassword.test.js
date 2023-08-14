const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const { userModel, companyModel, handymenModel } = require("../models/index"); // Update the path
const router = require("../auth/authRoutes/forgotPassword"); // Update the path
const app = express();
app.use(express.json());
app.use(router);

describe("Password Reset API", () => {
    it("sends a password reset email on POST /forgot-password", async () => {
        const mockUser = { email: "test@example.com" };

        // Mock userModel.findOne
        const mockFindOne = jest.spyOn(userModel, "findOne");
        mockFindOne.mockResolvedValue(mockUser);

        // Mock companyModel.findOne
        const mockCompanyFindOne = jest.spyOn(companyModel, "findOne");
        mockCompanyFindOne.mockResolvedValue(null);

        // Mock handymenModel.findOne
        const mockHandymenFindOne = jest.spyOn(handymenModel, "findOne");
        mockHandymenFindOne.mockResolvedValue(null);

        // Mock jwt.sign
        const mockToken = "mocked-token";
        const mockSign = jest.spyOn(jwt, "sign");
        mockSign.mockReturnValue(mockToken);

        const response = await request(app)
            .post("/forgot-password")
            .send({ email: "test@example.com" });

        expect(response.status).toBe(200);
        expect(mockFindOne).toHaveBeenCalled();
        expect(mockCompanyFindOne).toHaveBeenCalled();
        expect(mockHandymenFindOne).toHaveBeenCalled();
        expect(mockSign).toHaveBeenCalledWith(
            { email: "test@example.com" },
            process.env.PASSWORD_RESET_SECRET || "THISISTHESECRET",
            { expiresIn: "1h" }
        );

        // Clean up mocks
        mockFindOne.mockRestore();
        mockCompanyFindOne.mockRestore();
        mockHandymenFindOne.mockRestore();
        mockSign.mockRestore();
    });

    it("handles user not found on POST /forgot-password", async () => {
        // Mock userModel.findOne
        const mockFindOne = jest.spyOn(userModel, "findOne");
        mockFindOne.mockResolvedValue(null);

        // Mock companyModel.findOne
        const mockCompanyFindOne = jest.spyOn(companyModel, "findOne");
        mockCompanyFindOne.mockResolvedValue(null);

        // Mock handymenModel.findOne
        const mockHandymenFindOne = jest.spyOn(handymenModel, "findOne");
        mockHandymenFindOne.mockResolvedValue(null);

        const response = await request(app)
            .post("/forgot-password")
            .send({ email: "nonexistent@example.com" });

        expect(response.status).toBe(404);

        // Clean up mocks
        mockFindOne.mockRestore();
        mockCompanyFindOne.mockRestore();
        mockHandymenFindOne.mockRestore();
    });

    it("handles internal server error on POST /forgot-password", async () => {
        // Mock userModel.findOne to throw an error
        const mockFindOne = jest.spyOn(userModel, "findOne");
        mockFindOne.mockRejectedValue(new Error("Database error"));

        // Mock companyModel.findOne
        const mockCompanyFindOne = jest.spyOn(companyModel, "findOne");
        mockCompanyFindOne.mockResolvedValue(null);

        // Mock handymenModel.findOne
        const mockHandymenFindOne = jest.spyOn(handymenModel, "findOne");
        mockHandymenFindOne.mockResolvedValue(null);

        const response = await request(app)
            .post("/forgot-password")
            .send({ email: "test@example.com" });

        expect(response.status).toBe(500);

        // Clean up mocks
        mockFindOne.mockRestore();
        mockCompanyFindOne.mockRestore();
        mockHandymenFindOne.mockRestore();
    });
});
