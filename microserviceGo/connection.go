package main

import (
	"context"
	"fmt"
	"os"

	"github.com/redis/go-redis/v9"
)

type connection struct {
	client *redis.Client
}

func newConnection() connection {
	client := connect()
	return client
}

func connect() connection {
	redisServer := os.Getenv("REDIS_SERVER")
	redisPort := os.Getenv("REDIS_PORT")
	addr := "localhost:6379" //default redis address if PORT and REDIS_POR env vars are not set

	if redisServer != "" && redisPort != "" {
		addr = (redisServer + ":" + redisPort)
	}
	client := redis.NewClient(&redis.Options{
		Addr: addr,
	})

	client.Ping(context.Background())
	return connection{
		client: client,
	}
}

func (c connection) get(key string) string {
	value, err := c.client.Get(context.Background(), key).Result()
	if err != nil {
		fmt.Printf("%s not found", key)
	} else {
		fmt.Println(key, value)
	}

	return value
}

func (c connection) set(key string, value interface{}) {
	err := c.client.Set(context.Background(), key, value, 0).Err()
	if err != nil {
		panic(err)
	}
}

func (c connection) keys(pattern string) []string {
	value, err := c.client.Keys(context.Background(), pattern).Result()
	if err != nil {
		panic(err)
	}
	return value
}
