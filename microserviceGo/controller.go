package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

type jsonErr struct {
	Code int
	Text string
}

type data struct {
	Key   string
	Value interface{}
}

var conn = newConnection()

func fill(key string) string {
	var str, value string
	str = conn.get(key)
	if str != "" {
		value = "{\"key\":\"" + key + "\",\"value\":" + str + "}"
		fmt.Println("==========================================")
		fmt.Println(value)
	}
	return value

}

// Find - It finds feature base on key
// key
func Find(key string) interface{} {
	var feat interface{}
	json.Unmarshal([]byte(fill(strings.Replace(key, "+", " ", -1))), &feat)
	return feat
}

// All - It returns all features on redis
func All() interface{} {
	var arr []string
	var feat []interface{}
	keys := conn.keys("*")
	for _, key := range keys {
		r := fill(key)
		arr = append(arr, r)
	}
	str := "[" + strings.Join(arr, ",") + "]"
	fmt.Println("=======================================")
	fmt.Println(str)
	json.Unmarshal([]byte(str), &feat)
	return feat
}

// Set - It sets data on redis
func Set(data data) {
	conn.set(data.Key, data.Value)
}

// GetByKey godoc
// @Summary Get feature by key
// @Description Get a specific feature toggle by its key
// @Tags features
// @Accept  json
// @Produce  json
// @Param key path string true "Feature Key"
// @Success 200 {object} data
// @Failure 404 {object} jsonErr
// @Router /feature/{key} [get]
func GetByKey(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	key := vars["key"]
	result := Find(key)
	if result != nil {
		fmt.Println(result)
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(result); err != nil {
			panic(err)
		}
	} else {
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.WriteHeader(http.StatusNotFound)
		if err := json.NewEncoder(w).Encode(jsonErr{Code: http.StatusNotFound, Text: "The key (" + key + ") Was Not Found"}); err != nil {
			panic(err)
		}
	}

}

// GetAll godoc
// @Summary Get all features
// @Description Get all feature toggles from Redis
// @Tags features
// @Accept  json
// @Produce  json
// @Success 200 {array} data
// @Router /feature/ [get]
func GetAll(w http.ResponseWriter, r *http.Request) {

	result := All()
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(result); err != nil {
		panic(err)
	}

}

// Create godoc
// @Summary Create a new feature
// @Description Create a new feature toggle in Redis
// @Tags features
// @Accept  json
// @Produce  json
// @Param feature body data true "Feature Toggle Data"
// @Success 201 {object} data
// @Failure 422 {object} string
// @Router /feature [post]
func Create(w http.ResponseWriter, r *http.Request) {
	var toggle data
	body, err := io.ReadAll(io.LimitReader(r.Body, 1048576))
	if err != nil {
		panic(err)
	}
	if err := json.Unmarshal(body, &toggle); err != nil {
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.WriteHeader(422) // unprocessable entity
		if err := json.NewEncoder(w).Encode(err); err != nil {
			panic(err)
		}
	} else {
		Set(toggle)
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.WriteHeader(http.StatusCreated)
		if err := json.NewEncoder(w).Encode(toggle); err != nil {
			panic(err)
		}
	}
}
