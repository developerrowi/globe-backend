require('dotenv').config()



export const { NODE_ENV, PORT} = process.env;


export const DB_CONNECTION= process.env.DB_CONNECTION
export const DB_HOST=process.env.DB_HOST
export const DB_PORT=process.env.DB_PORT
export const DB_DATABASE=process.env.DB_DATABASE
export const DB_USERNAME=process.env.DB_USERNAME
export const DB_PASSWORD=process.env.DB_PASSWORD
export const JWT_KEY = process.env.API_KEY