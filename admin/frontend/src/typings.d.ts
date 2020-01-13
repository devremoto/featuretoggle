declare var process: Process;
interface Process{
    env:ProcessEnv
}
interface ProcessEnv{
    HOST:string
    FRONT_PORT:string,
    MS_MONGO_PORT:string,
    STS_PORT:string,
    PATH:any
}

interface GlobalEnvironment{
    process:Process
}