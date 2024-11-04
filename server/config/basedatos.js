import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.message);
  } else {
    console.log(`Conectado a la base de datos MySQL: ${process.env.DATABASE_NAME}`);  
  }
});

export default connection;
