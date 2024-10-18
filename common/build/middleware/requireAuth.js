"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const not_authenticate_1 = require("../errors/not-authenticate");
const requireAuth = (req, res, next) => {
    if (!req.currentUser) {
        throw new not_authenticate_1.notAuthorizedError();
    }
    next();
};
exports.requireAuth = requireAuth;
