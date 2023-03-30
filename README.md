# Simple REST API with Express and MongoDB.

### Tech Stack used :

- Node js With Express (Backend Framework).
- MongoDB as our Database.
- dotenv to use environment variables.
- mongoose to create and operate mongoDB.
- yarn as the package manager.

* Insomnia as the REST client , you can use postman if you want..

## To run this project locally

- Clone this repo or downlaod it as a zip file.

```sh
    yarn add or npm install
```

```sh
  yarn dev
```

## Endpoints

### Register a new User

method : post

> http://localhost:PORT/api/v1/user

### Get all users

method : get

> http://localhost:PORT/api/v1/user

### Update users

method : patch

> http://localhost:PORT/api/v1/user

### Delete users

method : delete

> http://localhost:PORT/api/v1/user

---

# Protected Rotues inside the Employee Router

1. Get all employess

method : GET

> http://localhost:6060/api/v1/employees

2. Add a new Employee

method : POST

> http://localhost:6060/api/v1/employees

3. Update Employee
   method : patch

   > http://localhost:6060/api/v1/employees/id

4. Delete Employee
   method : delete
   > http://localhost:6060/api/v1/employees/id
