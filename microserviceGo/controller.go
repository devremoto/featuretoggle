package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
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
//
func Find(key string) interface{} {
	var feat interface{}
	json.Unmarshal([]byte(fill(strings.Replace(key, "+", " ", -1))), &feat)
	return feat
}

// All - It returns all features on redis
//
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
//
func Set(data data) {
	conn.set(data.Key, data.Value)
}

// GetByKey - It tries to find a feature base on key
//
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

// GetAll - It returns all features on redis
//
func GetAll(w http.ResponseWriter, r *http.Request) {

	result := All()
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(result); err != nil {
		panic(err)
	}

}

// Create - It creates a feture on redis
func Create(w http.ResponseWriter, r *http.Request) {
	var toggle data
	body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))
	if err != nil {
		panic(err)
	}
	if err := r.Body.Close(); err != nil {
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
