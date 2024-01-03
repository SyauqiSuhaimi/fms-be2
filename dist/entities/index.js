"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs = require("fs");
const entities = [];
function importEntities(basePath) {
    const entityFiles = getFilesRecursively(basePath, /\.entity\.(js|ts)$/);
    entityFiles.forEach((file) => {
        try {
            const importedEntity = require(file);
            entities.push(importedEntity);
        }
        catch (error) {
            console.error(`Error importing entity from ${file}:`, error);
        }
    });
}
function getFilesRecursively(basePath, pattern) {
    const result = [];
    function readDirectory(directory) {
        const files = fs.readdirSync(directory);
        files.forEach((file) => {
            const fullPath = (0, path_1.join)(directory, file);
            if (fs.statSync(fullPath).isDirectory()) {
                readDirectory(fullPath);
            }
            else if (pattern.test(fullPath)) {
                result.push(fullPath);
            }
        });
    }
    readDirectory(basePath);
    return result;
}
importEntities(__dirname);
exports.default = entities;
//# sourceMappingURL=index.js.map