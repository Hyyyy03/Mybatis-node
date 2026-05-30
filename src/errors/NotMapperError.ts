export class NotMapperError extends Error {
    public readonly code: string = 'MISSING_MAPPER_EXTEND';
    public readonly details: any;

    constructor(mapper: Object) {
        const className = mapper.constructor.name;
        const message = `Class "${className}" passed to mapper constructor is not extended from BaseMapper.`;
        const suggestion = `Extend BaseMapper when defining your mapper class`;

        super(`${message}\n\nSuggestion: ${suggestion}`);

        this.name = 'NotMapperError';

        this.details = {
            className,
            suggestion,
            mapper
        };

        Error.captureStackTrace(this, NotMapperError);
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
