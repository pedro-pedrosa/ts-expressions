export class NotSupportedException extends Error {
    constructor(message?: string) {
        super(message || 'This feature is currently not supported');
    }
}