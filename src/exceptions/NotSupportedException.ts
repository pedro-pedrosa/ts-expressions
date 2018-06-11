export class NotSupportedException extends Error {
    constructor() {
        super('This feature is currently not supported');
    }
}