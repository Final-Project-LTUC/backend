const request = require("supertest");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../../src/models/index");
const router = require("../../src/auth/authRoutes/resetPassword");

const app = express();
app.use(express.json()); // Don't forget to include this middleware
app.use(router);

describe("Reset Password API", () => {
    it("resets password on POST /reset-password", async () => {
        // Mock token verification
        const mockDecodedToken = { email: "test@example.com" };
        const mockVerify = jest.spyOn(jwt, "verify");
        mockVerify.mockImplementation((token, secret, callback) => {
            callback(null, mockDecodedToken);
        });

        // Mock userModel.findOne
        const mockUser = { update: jest.fn() };
        const mockFindOne = jest.spyOn(userModel, "findOne");
        mockFindOne.mockResolvedValue(mockUser);

        // Mock bcrypt.hash
        const mockHash = "mockedHash";
        const mockBcryptHash = jest.spyOn(bcrypt, "hash");
        mockBcryptHash.mockResolvedValue(mockHash);

        const response = await request(app)
            .post("/reset-password")
            .send({ token: "mockedToken", newPassword: "newpassword123" });

        expect(response.status).toBe(200);
        expect(mockVerify).toHaveBeenCalled();
        expect(mockFindOne).toHaveBeenCalled();
        expect(mockBcryptHash).toHaveBeenCalled();
        expect(mockUser.update).toHaveBeenCalledWith({ password: mockHash });

        // Clean up mocks
        mockVerify.mockRestore();
        mockFindOne.mockRestore();
        mockBcryptHash.mockRestore();
    });

    it("handles invalid token on POST /reset-password", async () => {
        // Mock token verification with error
        const mockVerify = jest.spyOn(jwt, "verify");
        mockVerify.mockImplementation((token, secret, callback) => {
            callback(new Error("Invalid token"));
        });

        const response = await request(app)
            .post("/reset-password")
            .send({ token: "invalidToken", newPassword: "newpassword123" });

        expect(response.status).toBe(400);

        // Clean up mocks
        mockVerify.mockRestore();
    });

    it("handles user not found on POST /reset-password", async () => {
        // Mock token verification
        const mockDecodedToken = { email: "nonexistent@example.com" };
        const mockVerify = jest.spyOn(jwt, "verify");
        mockVerify.mockImplementation((token, secret, callback) => {
            callback(null, mockDecodedToken);
        });

        // Mock userModel.findOne
        const mockFindOne = jest.spyOn(userModel, "findOne");
        mockFindOne.mockResolvedValue(null);

        const response = await request(app)
            .post("/reset-password")
            .send({ token: "mockedToken", newPassword: "newpassword123" });

        expect(response.status).toBe(404);

        // Clean up mocks
        mockVerify.mockRestore();
        mockFindOne.mockRestore();
    });

    // Add more test cases as needed
});
