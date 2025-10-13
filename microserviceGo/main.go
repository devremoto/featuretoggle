package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	_ "featuretoggle/docs" // This is required for Swagger

	httpSwagger "github.com/swaggo/http-swagger"
)

// @title Feature Toggle API
// @version 1.0
// @description This is a feature toggle microservice API
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8085
// @BasePath /
func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8085"
	}
	router := NewRouter()

	// Add Swagger endpoint
	router.PathPrefix("/swagger/").Handler(httpSwagger.WrapHandler)

	fmt.Println("Servidor rodando na porta " + port)
	fmt.Println("Swagger UI disponível em: http://localhost:" + port + "/swagger/")
	log.Fatal(http.ListenAndServe(":"+port, router))
}
