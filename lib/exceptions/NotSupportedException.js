"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotSupportedException extends Error {
    constructor() {
        super('This feature is currently not supported');
    }
}
exports.NotSupportedException = NotSupportedException;
