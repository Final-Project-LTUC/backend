const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel, companyModel, handymenModel } = require("../models/index");
const router = require("../auth/authRoutes/resetPassword"); // Update the path
const app = express();
app.use(express.json()); // Don't forget this middleware
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

        // Mock companyModel.findOne
        const mockCompany = { update: jest.fn() };
        const mockCompanyFindOne = jest.spyOn(companyModel, "findOne");
        mockCompanyFindOne.mockResolvedValue(mockCompany);

        // Mock handymenModel.findOne
        const mockHandymen = { update: jest.fn() };
        const mockHandymenFindOne = jest.spyOn(handymenModel, "findOne");
        mockHandymenFindOne.mockResolvedValue(mockHandymen);

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
        expect(mockCompanyFindOne).toHaveBeenCalled();
        expect(mockHandymenFindOne).toHaveBeenCalled();
        expect(mockBcryptHash).toHaveBeenCalled();
        expect(mockUser.update).toHaveBeenCalledWith({ password: mockHash });
        expect(mockCompany.update).toHaveBeenCalledWith({ password: mockHash });
        expect(mockHandymen.update).toHaveBeenCalledWith({
            password: mockHash,
        });

        // Clean up mocks
        mockVerify.mockRestore();
        mockFindOne.mockRestore();
        mockCompanyFindOne.mockRestore();
        mockHandymenFindOne.mockRestore();
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

        // Mock companyModel.findOne
        const mockCompanyFindOne = jest.spyOn(companyModel, "findOne");
        mockCompanyFindOne.mockResolvedValue(null);

        // Mock handymenModel.findOne
        const mockHandymenFindOne = jest.spyOn(handymenModel, "findOne");
        mockHandymenFindOne.mockResolvedValue(null);

        const response = await request(app)
            .post("/reset-password")
            .send({ token: "mockedToken", newPassword: "newpassword123" });

        expect(response.status).toBe(404);

        // Clean up mocks
        mockVerify.mockRestore();
        mockFindOne.mockRestore();
        mockCompanyFindOne.mockRestore();
        mockHandymenFindOne.mockRestore();
    });
});
