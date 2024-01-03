"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSession = void 0;
const express_session_1 = require("express-session");
function configureSession(app) {
    app.use((0, express_session_1.default)({
        secret: "iamabarbiegirl",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 * 7,
        },
    }));
}
exports.configureSession = configureSession;
//# sourceMappingURL=session.config.js.map