package main

import (
	"fmt"
	"os"

	"github.com/go-redis/redis"
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
	// client.WrapProcess(func(old func(cmd redis.Cmder) error) func(cmd redis.Cmder) error {
	// 	return func(cmd redis.Cmder) error {
	// 		fmt.Printf("starting processing: <%s>\n", cmd)
	// 		err := old(cmd)
	// 		fmt.Printf("finished processing: <%s>\n", cmd)
	// 		return err
	// 	}
	// })
	client.Ping()
	return connection{
		client: client,
	}
}

func (c connection) get(key string) string {
	value, err := c.client.Get(key).Result()
	if err != nil {
		fmt.Printf("%s not found", key)
	} else {
		fmt.Println(key, value)
	}

	return value
}

func (c connection) set(key string, value interface{}) {
	err := c.client.Set(key, value, 0).Err()
	if err != nil {
		panic(err)
	}
}

func (c connection) keys(pattern string) []string {
	value, err := c.client.Keys(pattern).Result()
	if err != nil {
		panic(err)
	}
	return value
}
