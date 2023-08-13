const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const { userModel } = require("../../src/models/index"); // Update the path
const router = require("../../src/auth/authRoutes/forgotPassword"); // Update the path
const app = express();
app.use(express.json());
app.use(router);

describe("Password Reset API", () => {
    it("sends a password reset email on POST /forgot-password", async () => {
        const mockUser = { email: "test@example.com" };

        // Mock userModel.findOne
        const mockFindOne = jest.spyOn(userModel, "findOne");
        mockFindOne.mockResolvedValue(mockUser);

        // Mock jwt.sign
        const mockToken = "mocked-token";
        const mockSign = jest.spyOn(jwt, "sign");
        mockSign.mockReturnValue(mockToken);

        const response = await request(app)
            .post("/forgot-password")
            .send({ email: "test@example.com" });

        expect(response.status).toBe(200);
        expect(mockFindOne).toHaveBeenCalled();
        expect(mockSign).toHaveBeenCalledWith(
            { email: "test@example.com" },
            process.env.PASSWORD_RESET_SECRET || "THISISTHESECRET",
            { expiresIn: "1h" }
        );

        // Clean up mocks
        mockFindOne.mockRestore();
        mockSign.mockRestore();
    });

    it("handles user not found on POST /forgot-password", async () => {
        // Mock userModel.findOne
        const mockFindOne = jest.spyOn(userModel, "findOne");
        mockFindOne.mockResolvedValue(null);

        const response = await request(app)
            .post("/forgot-password")
            .send({ email: "nonexistent@example.com" });

        expect(response.status).toBe(404);

        // Clean up mocks
        mockFindOne.mockRestore();
    });

    it("handles internal server error on POST /forgot-password", async () => {
        // Mock userModel.findOne to throw an error
        const mockFindOne = jest.spyOn(userModel, "findOne");
        mockFindOne.mockRejectedValue(new Error("Database error"));

        const response = await request(app)
            .post("/forgot-password")
            .send({ email: "test@example.com" });

        expect(response.status).toBe(500);

        // Clean up mocks
        mockFindOne.mockRestore();
    });
});
