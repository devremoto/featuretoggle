package main

import "net/http"

//Route - Route cunficuration
//
type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

// Routes - array of Routes
//
type Routes []Route

var routes = Routes{

	Route{
		"GetByKey",
		"GET",
		"/feature/{key}",
		GetByKey,
	},
	Route{
		"GetAll",
		"GET",
		"/feature/",
		GetAll,
	},
	Route{
		"Create",
		"POST",
		"/feature",
		Create,
	},
}
