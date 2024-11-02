import express from 'express';
import { 
  register,
  login,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  resetPassword
} from '../controllers/authController.js';
import { recoverPassword} from '../controllers/authController.js';

import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ruta de inicio de sesión de usuario
router.post('/login', login);

// ruta de registro de usuario
router.post('/register', register);

// rutas de perfil de usuario
router.get('/profile', verifyToken, getUserProfile); // obtene perfil
router.put('/profile', verifyToken, updateUserProfile); // actualiza perfil

// ruta para actualizar contraseña
router.put('/update-password', verifyToken, updateUserPassword); // sctualiza contraseña

// ruta de recuperación de contraseña
router.post('/recover-password', recoverPassword);

// ruta para restablecimiento de contraseña
router.post('/reset-password', resetPassword);

export default router;
