FROM golang

ARG port=8085
ARG redis_port=6379
ARG redis_server="ft-redis"

ENV PORT $port
ENV REDIS_PORT $redis_port
ENV REDIS_SERVER $redis_server

ADD . /go/src/featuretoggle

RUN if [ ! -f go.mod ]; then go mod init featuretoggle; fi
RUN go get github.com/redis/go-redis/v9@latest \
    && go get github.com/gorilla/mux@v1.8.1 \
    && go mod download

#RUN go install featuretoggle

ENTRYPOINT /go/bin/featuretoggle

EXPOSE $port


# FROM golang:1.22 AS builder
# WORKDIR /app

# ARG port=8085
# ARG redis_port=6379
# ARG redis_server="ft-redis"

# ENV PORT=${port} \
#     REDIS_PORT=${redis_port} \
#     REDIS_SERVER=${redis_server}

# # Copy everything (handles repos without go.mod/go.sum gracefully)
# COPY . .

# # Initialize module if missing (adjust module path if you want)
# RUN if [ ! -f go.mod ]; then go mod init featuretoggle; fi
# # add required deps explicitly to avoid tidy surprises
# RUN go get github.com/redis/go-redis/v9@latest \
#     && go get github.com/gorilla/mux@v1.8.1 \
#     && go mod download

# # Build (adjust path if main isn't at repo root)
# RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
#     go build -trimpath -ldflags="-s -w" -o /src/featuretoggle .

# # ---- Runtime stage ----
# FROM gcr.io/distroless/static-debian12:nonroot
# WORKDIR /app

# ARG port=8085
# ARG redis_port=6379
# ARG redis_server="ft-redis"
# ENV PORT=${port} \
#     REDIS_PORT=${redis_port} \
#     REDIS_SERVER=${redis_server}

# COPY --from=builder /out/featuretoggle /app/featuretoggle
# EXPOSE ${port}
# USER nonroot:nonroot
# ENTRYPOINT ["/app/featuretoggle"]


