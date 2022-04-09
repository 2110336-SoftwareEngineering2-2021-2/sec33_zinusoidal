// Package docs GENERATED BY SWAG; DO NOT EDIT
// This file was generated by swaggo/swag
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "name": "API Support",
            "url": "http://www.swagger.io/support",
            "email": "support@swagger.io"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/api/fortune168/v1/block": {
            "post": {
                "description": "provider the id of person to be blocked",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "chat"
                ],
                "summary": "block user from sending message to you",
                "operationId": "BlockHandler",
                "parameters": [
                    {
                        "description": "id of person to be blocked",
                        "name": "BlockReq",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/chat.BlockRequest"
                        }
                    },
                    {
                        "type": "string",
                        "default": "Bearer \u003cAdd access token here\u003e",
                        "description": "Send token if log-in, to check authority to send message",
                        "name": "Authorization",
                        "in": "header"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "400": {
                        "description": "invalid request or invalid jwt",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "error message",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/fortune168/v1/confirm_email/{key}": {
            "post": {
                "description": "send the key from confirmation email to activate",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "auth"
                ],
                "summary": "use the key in the confirmation email to activate",
                "operationId": "ActivateEmailHandler",
                "parameters": [
                    {
                        "type": "string",
                        "description": "uuid values",
                        "name": "key",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "email confirmed",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "400": {
                        "description": "invalid key",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "error message",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/fortune168/v1/customer_register": {
            "post": {
                "description": "See body for request details. Return message if registration is success. Also send the confirmation email",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "auth"
                ],
                "summary": "customer registeration and send confirmation email",
                "operationId": "CustomerRegisterHandler",
                "parameters": [
                    {
                        "type": "string",
                        "name": "citizenId",
                        "in": "formData"
                    },
                    {
                        "type": "string",
                        "name": "email",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "name": "firstName",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "name": "lastName",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "name": "password",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "name": "username",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "file",
                        "description": "profile pic file",
                        "name": "profilePic",
                        "in": "formData"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "400": {
                        "description": "invalid request",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "registration is not successful",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/fortune168/v1/delete_account": {
            "post": {
                "description": "just send the request to delete account. Note that this is a hard delete, no way to recover account later.",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "auth"
                ],
                "summary": "Delete account for both customer and provider",
                "operationId": "DeleteAccountHandler",
                "parameters": [
                    {
                        "type": "string",
                        "default": "Bearer \u003cAdd access token here\u003e",
                        "description": "Send token if log-in, to check authority to send message",
                        "name": "Authorization",
                        "in": "header"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "400": {
                        "description": "invalid jwt token",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "error message",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/fortune168/v1/login": {
            "post": {
                "description": "login by username and password, return jwt token",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "auth"
                ],
                "summary": "login by unsername and password",
                "operationId": "LoginHandler",
                "parameters": [
                    {
                        "description": "username and password for login",
                        "name": "LoginReq",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/auth.LoginRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/auth.LoginResponse"
                        }
                    },
                    "400": {
                        "description": "invalid request",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "error message",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/fortune168/v1/make_appointment": {
            "post": {
                "description": "customer provider information about service they want and make request to provider",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "appointment"
                ],
                "summary": "Customer make appointment with provider",
                "operationId": "MakeAppointmentHandler",
                "parameters": [
                    {
                        "description": "Detail of services",
                        "name": "AppointmentReq",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/appointment.AppointmentRequest"
                        }
                    },
                    {
                        "type": "string",
                        "default": "Bearer \u003cAdd access token here\u003e",
                        "description": "Send token if log-in, to check authority to send message, also this must be customer token",
                        "name": "Authorization",
                        "in": "header"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "400": {
                        "description": "invalid request or invalid jwt(must be customer)",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "error message",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/fortune168/v1/provider_register": {
            "post": {
                "description": "See body for request details. Return message if registration is success and send confirmation email",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "auth"
                ],
                "summary": "provider registeration and send confirmation email",
                "operationId": "ProviderRegisterHandler",
                "parameters": [
                    {
                        "type": "string",
                        "name": "biography",
                        "in": "formData"
                    },
                    {
                        "type": "string",
                        "name": "citizenId",
                        "in": "formData"
                    },
                    {
                        "type": "string",
                        "name": "email",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "name": "firstName",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "name": "fortuneList",
                        "in": "formData"
                    },
                    {
                        "type": "string",
                        "name": "lastName",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "name": "password",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "name": "schedule",
                        "in": "formData"
                    },
                    {
                        "type": "string",
                        "name": "username",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "name": "workSchedule",
                        "in": "formData"
                    },
                    {
                        "type": "file",
                        "description": "profile pic file",
                        "name": "profilePic",
                        "in": "formData"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "400": {
                        "description": "invalid request",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "registration is not successful",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/fortune168/v1/response_appointment/{app_id}/{status}": {
            "post": {
                "description": "provider can accept and reject the request. The status can be complete after the service and reviewed if customer submit review",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "appointment"
                ],
                "summary": "change status of request",
                "operationId": "ResponseAppointmentHandler",
                "parameters": [
                    {
                        "type": "string",
                        "description": "appointment_id",
                        "name": "app_id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "status to be changed",
                        "name": "status",
                        "in": "path",
                        "required": true
                    },
                    {
                        "type": "string",
                        "default": "Bearer \u003cAdd access token here\u003e",
                        "description": "Send token if log-in, to check authority to send message, also this must be customer token",
                        "name": "Authorization",
                        "in": "header"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "400": {
                        "description": "invalid request or invalid jwt",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "error message",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/fortune168/v1/send_message": {
            "post": {
                "description": "if message is not null, the endpoint will send message, otherwise create new chatroom(if not exist)",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "chat"
                ],
                "summary": "send message to other users",
                "operationId": "SendMessageHandler",
                "parameters": [
                    {
                        "description": "id to person who will receive message and text",
                        "name": "SendMessageReq",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/chat.SendMessageRequest"
                        }
                    },
                    {
                        "type": "string",
                        "default": "Bearer \u003cAdd access token here\u003e",
                        "description": "Send token if log-in, to check authority to send message",
                        "name": "Authorization",
                        "in": "header"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "400": {
                        "description": "invalid request or invalid jwt",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "error message",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/api/fortune168/v1/unblock": {
            "post": {
                "description": "unblock user to allow message from them",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "chat"
                ],
                "summary": "unblock user",
                "operationId": "UnBlockHandler",
                "parameters": [
                    {
                        "description": "id of person to be blocked",
                        "name": "UnBlockReq",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/chat.BlockRequest"
                        }
                    },
                    {
                        "type": "string",
                        "default": "Bearer \u003cAdd access token here\u003e",
                        "description": "Send token if log-in, to check authority to send message",
                        "name": "Authorization",
                        "in": "header"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ok",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "400": {
                        "description": "invalid request or invalid jwt",
                        "schema": {
                            "type": "string"
                        }
                    },
                    "500": {
                        "description": "error message",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "appointment.AppointmentRequest": {
            "type": "object",
            "required": [
                "date",
                "providerId"
            ],
            "properties": {
                "appointment": {
                    "$ref": "#/definitions/model.Appointment"
                },
                "date": {
                    "type": "string"
                },
                "providerId": {
                    "type": "string"
                }
            }
        },
        "auth.LoginRequest": {
            "type": "object",
            "required": [
                "password",
                "username"
            ],
            "properties": {
                "password": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "auth.LoginResponse": {
            "type": "object",
            "properties": {
                "first_name": {
                    "type": "string"
                },
                "last_name": {
                    "type": "string"
                },
                "profile_image": {
                    "type": "string"
                },
                "token": {
                    "type": "string"
                },
                "user_id": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "chat.BlockRequest": {
            "type": "object",
            "required": [
                "blockedUserId"
            ],
            "properties": {
                "blockedUserId": {
                    "type": "string"
                }
            }
        },
        "chat.SendMessageRequest": {
            "type": "object",
            "required": [
                "receiverId"
            ],
            "properties": {
                "message": {
                    "type": "string"
                },
                "receiverId": {
                    "type": "string"
                }
            }
        },
        "model.Appointment": {
            "type": "object",
            "properties": {
                "appointmentList": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/model.AppointmentInfo"
                    }
                },
                "information": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "value": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            }
        },
        "model.AppointmentInfo": {
            "type": "object",
            "properties": {
                "appointmentId": {
                    "type": "string"
                },
                "fortuneType": {
                    "type": "string"
                },
                "price": {
                    "type": "integer"
                },
                "time": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            }
        }
    },
    "securityDefinitions": {
        "ApiKeyAuth": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        },
        "BasicAuth": {
            "type": "basic"
        },
        "OAuth2AccessCode": {
            "type": "oauth2",
            "flow": "accessCode",
            "authorizationUrl": "https://example.com/oauth/authorize",
            "tokenUrl": "https://example.com/oauth/token",
            "scopes": {
                "admin": " Grants read and write access to administrative information"
            }
        },
        "OAuth2Application": {
            "type": "oauth2",
            "flow": "application",
            "tokenUrl": "https://example.com/oauth/token",
            "scopes": {
                "admin": " Grants read and write access to administrative information",
                "write": " Grants write access"
            }
        },
        "OAuth2Implicit": {
            "type": "oauth2",
            "flow": "implicit",
            "authorizationUrl": "https://example.com/oauth/authorize",
            "scopes": {
                "admin": " Grants read and write access to administrative information",
                "write": " Grants write access"
            }
        },
        "OAuth2Password": {
            "type": "oauth2",
            "flow": "password",
            "tokenUrl": "https://example.com/oauth/token",
            "scopes": {
                "admin": " Grants read and write access to administrative information",
                "read": " Grants read access",
                "write": " Grants write access"
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:1323",
	BasePath:         "/",
	Schemes:          []string{},
	Title:            "Swagger Example API",
	Description:      "This is a sample server celler server.",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
