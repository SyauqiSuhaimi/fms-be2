"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const functions = {
    createMulterStorage(destinationPath) {
        const storageOptions = {
            destination: function (req, file, cb) {
                cb(null, destinationPath);
            },
            filename: function (req, file, cb) {
                let ext = "";
                try {
                    ext = file.originalname.split(".")[1];
                }
                catch (e) {
                    console.log(e);
                }
                let uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + "." + ext);
            },
        };
        return multer.diskStorage(storageOptions);
    },
};
exports.default = {
    functions,
};
//# sourceMappingURL=helper.js.map