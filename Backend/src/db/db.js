import mysql from "mysql2"

const MYSQL = mysql;

const pool = MYSQL.createPool({
    host:"localhost",
    port:'3307',
    user:'root',
    password:"4723",
    database:"barber_app"

}).promise();


export default pool;