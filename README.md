# requirements 
    docker

# how to run 
    run this command in cmd `make start`
    or
    docker-compose down -v 
    docker-compose build --no-cache && docker-compose up -d


# api documentation

Products

`POST | /api/products | Create a new product`
`PUT | /api/products/:id | Edit an existing product`
`DELETE | /api/products/:id | Delete a product`
`GET | /api/products | Get all products (public)`


Users
`POST | /api/users/signup | Register a new user`
`POST | /api/users/login | User login`
`GET | /api/users/me | Verify user session`

# any assumptions or decisions made
    For dev assessment,
      - Created a standalone docker container for both the Backend and Postgres DB
      - The public routes are signup,login and get products (we can add also the middleware of auth checker in products endpoint)
      - due to testing, if in real world, we can add a column of user_id w/ product to have an ownership of user in products table
    