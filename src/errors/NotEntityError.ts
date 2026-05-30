export class NotEntityError extends Error {
    public readonly code: string = 'MISSING_ENTITY_DECORATOR';
    public readonly details: any;

    constructor(entity: Object) {
        const className = entity.constructor.name;
        const message = `Entity "${className}" passed to mapper constructor is not decorated with @Entity().`;
        const suggestion = `Add @Entity({ table: '${className.toLowerCase()}s' }) above your class definition`;

        super(`${message}\n\nSuggestion: ${suggestion}`);

        this.name = 'NotEntityError';

        this.details = {
            className,
            suggestion,
            entity
        };

        Error.captureStackTrace(this, NotEntityError);
    }

    toJSON() {
        return {
            name: this.name,
            code: this.code,
            message: this.message,
            details: this.details,
            stack: this.stack
        };
    }
}
