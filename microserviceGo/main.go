package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8086"
	}
	router := NewRouter()
	fmt.Println("Servidor rodando na porta " + port)
	log.Fatal(http.ListenAndServe(":"+port, router))

}
