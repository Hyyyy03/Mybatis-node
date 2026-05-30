export class ORMError extends Error {
    public readonly code: string;
    public readonly details?: any;
    public readonly timestamp: Date;

    constructor(code: string, message: string, details?: any) {
        super(message);

        this.name = 'ORMError';
        this.code = code;
        this.details = details;
        this.timestamp = new Date();

        // 保持正确的堆栈信息
        Error.captureStackTrace(this, ORMError);
    }

    // 转换为 JSON（便于日志记录）
    toJSON(): object {
        return {
            name: this.name,
            code: this.code,
            message: this.message,
            details: this.details,
            timestamp: this.timestamp,
            stack: this.stack
        };
    }

    // 获取用户友好的错误信息
    toString(): string {
        return `[${this.code}] ${this.message}`;
    }
}
