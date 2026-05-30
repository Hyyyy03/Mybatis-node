export interface DataBaseConnectConfigT {
    host: string,
    database: string,
    port: number,
    user: string,
    password: string,
    debug: boolean,
    key?:string
}
