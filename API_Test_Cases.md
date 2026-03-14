# API Test Cases — Swagger Petstore

This document outlines the test cases implemented in the Playwright API automation suite.

## 1. Pet Operations (`tests/pet.spec.ts`)

| ID  | Title                | Type       | Description                                      | Expected Result                               |
| --- | -------------------- | ---------- | ------------------------------------------------ | --------------------------------------------- |
| P1  | Create Pet           | Happy Path | POST /pet with valid JSON                        | 200 OK, ID and Name match input               |
| P2  | Update Pet           | Happy Path | PUT /pet with existing ID & new status           | 200 OK, Status updated to 'sold'              |
| P3  | Get Pet by ID        | Happy Path | GET /pet/{id} with existing ID                   | 200 OK, validation of all fields              |
| P4  | Get Non-Existent Pet | Negative   | GET /pet/{id} with numeric ID that doesn't exist | 404 OK, type: error, message: 'Pet not found' |
| P5  | Invalid ID Format    | Boundary   | GET /pet/{id} with string ID                     | 400/404/405 (Error)                           |

## 2. User Operations (`tests/user.spec.ts`)

| ID  | Title               | Type       | Description                     | Expected Result                   |
| --- | ------------------- | ---------- | ------------------------------- | --------------------------------- |
| U1  | Create User         | Happy Path | POST /user with valid user data | 200 OK                            |
| U2  | Get User            | Happy Path | GET /user/{username}            | 200 OK, Username, Email, ID match |
| U3  | Delete User         | Happy Path | DELETE /user/{username}         | 200 OK                            |
| U4  | Delete Non-Existent | Negative   | DELETE /user/non_existent_id    | 404/405 (Error)                   |
| U5  | Invalid Username    | Boundary   | GET /user/{username} with empty | 400/404/405 (Error)               |

## Cleanup Strategy

- Each test that creates data includes a deletion step or uses unique IDs (randomly generated) to ensure repeatability and independence.
