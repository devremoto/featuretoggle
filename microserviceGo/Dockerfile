# Use the official Go image as the base image
FROM golang:1.22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Use a minimal image for the final stage
FROM alpine:latest

# Install ca-certificates for HTTPS requests (if needed)
RUN apk --no-cache add ca-certificates

# Create a non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Set the working directory
WORKDIR /root/

# Copy the binary from the builder stage
COPY --from=builder /app/main .

# Change ownership of the binary
RUN chown appuser:appgroup main

# Switch to non-root user
USER appuser

# Define build arguments with default values
ARG port=8085
ARG redis_port=6379
ARG REDIS_SERVER=localhost

# Expose the port the app runs on (using the build argument)
EXPOSE ${port}

# Set environment variables with fallbacks to build arguments
ENV PORT=${port}
ENV GO_PORT=${port}
ENV REDIS_SERVER=${REDIS_SERVER}
ENV REDIS_PORT=${redis_port}

# Command to run the application
CMD ["./main"]