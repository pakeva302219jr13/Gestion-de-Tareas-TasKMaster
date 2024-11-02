import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connection from './config/basedatos.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ruta raíz
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bienvenido al servidor de TaskMaster.'
  });
});

// Conectar rutas de autenticación
app.use('/api/auth', authRoutes); 

// Conectar rutas de tareas
app.use('/api/tasks', taskRoutes);



const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
