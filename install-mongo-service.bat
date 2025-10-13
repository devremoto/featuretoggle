call env-vars.bat
docker-compose down ft-microservice

MONGO_PORT=%MS_MONGO_PORT%
REDIS_SERVER=%REDIS_SERVER%
REDIS_PORT=%REDIS_PORT%
MS_MONGO_PORT=%MS_MONGO_PORT%
docker-compose up -d --build ft-microservice
