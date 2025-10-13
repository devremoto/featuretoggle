declare var process: Process;
interface Process {
    env: ProcessEnv
}
interface ProcessEnv {
    HOST: string
    FRONT_PORT: string,
    MS_MONGO_PORT: string,
    STS_PORT: string,
    STS_SERVER: string,
    STS_ADMIN_SERVER: string,
    GO_PORT: string,
    PATH: any,
    USE_AUTHORITY_SERVER: boolean,
    CLIENT_ID: string
}

interface GlobalEnvironment {
    process: Process
}