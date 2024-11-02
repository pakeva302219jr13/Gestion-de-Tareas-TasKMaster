import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { findUserByEmail, findUserById, createUser, updateUserById } from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const register = (req, res) => {
  const { nombre, email, password } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Por favor, ingresa un correo electrónico válido',
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: 'La contraseña debe tener al menos 8 caracteres',
    });
  }

  findUserByEmail(email)
    .then((response) => {
      if (response.success) {
        return res.status(400).json({
          success: false,
          message: 'El usuario ya se encuentra registrado',
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      createUser(nombre, email, hashedPassword)
        .then((result) => {
          return res.status(201).json({
            success: true,
            message: 'Usuario registrado correctamente',
            userId: result.userId,
          });
        })
        .catch(() => {
          return res.status(500).json({
            success: false,
            message: 'Error al registrar el usuario',
          });
        });
    })
    .catch(() => {
      return res.status(500).json({
        success: false,
        message: 'Error al verificar el email',
      });
    });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email)
    .then((response) => {
      if (!response.success) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no registrado',
        });
      }

      const user = response.user;
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Contraseña incorrecta',
        });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h',
      });

      return res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        token,
      });
    })
    .catch(() => {
      return res.status(500).json({
        success: false,
        message: 'Error al iniciar sesión',
      });
    });
};

export const getUserProfile = (req, res) => {
  const userId = req.userId;

  findUserById(userId)
    .then((response) => {
      if (!response.success) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado',
        });
      }

      return res.status(200).json({
        success: true,
        data: response.user,
      });
    })
    .catch(() => {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener el perfil del usuario',
      });
    });
};

export const updateUserProfile = (req, res) => {
  const { nombre, email } = req.body;
  const userId = req.userId;

  if (!nombre || !email) {
    return res.status(400).json({
      success: false,
      message: 'El nombre y el correo electrónico son obligatorios',
    });
  }

  updateUserById(userId, { nombre, email })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Perfil actualizado exitosamente',
      });
    })
    .catch(() => {
      return res.status(500).json({
        success: false,
        message: 'Error al actualizar el perfil',
      });
    });
};

export const updateUserPassword = (req, res) => {
  const { passwordActual, passwordNueva } = req.body;
  const userId = req.userId;

  findUserById(userId)
    .then((response) => {
      if (!response.success) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado',
        });
      }

      const user = response.user;
      const isPasswordValid = bcrypt.compareSync(passwordActual, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'La contraseña actual es incorrecta',
        });
      }

      const hashedPassword = bcrypt.hashSync(passwordNueva, 10);

      updateUserById(userId, { password: hashedPassword })
        .then(() => {
          return res.status(200).json({
            success: true,
            message: 'Contraseña actualizada exitosamente',
          });
        })
        .catch(() => {
          return res.status(500).json({
            success: false,
            message: 'Error al actualizar la contraseña',
          });
        });
    })
    .catch(() => {
      return res.status(500).json({
        success: false,
        message: 'Error al buscar el usuario',
      });
    });
};

export const recoverPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const response = await findUserByEmail(email);
    if (!response.success) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no registrado',
      });
    }

    const user = response.user;
    const resetToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '15m',
    });

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: 'Recuperación de contraseña',
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetLink}">${resetLink}</a>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error al enviar correo:', err);
        return res.status(500).json({
          success: false,
          message: 'Error al enviar el correo de recuperación',
        });
      }

      console.log('Correo enviado:', info.response);
      return res.status(200).json({
        success: true,
        message: 'Correo de recuperación enviado exitosamente',
      });
    });
  } catch (error) {
    console.error('Error en la recuperación de contraseña:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al enviar el correo de recuperación',
    });
  }
};

export const resetPassword = (req, res) => {
  const { token, password } = req.body;

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido o expirado',
      });
    }

    const userId = decoded.id;
    const hashedPassword = bcrypt.hashSync(password, 10);

    updateUserById(userId, { password: hashedPassword })
      .then(() => {
        res.status(200).json({
          success: true,
          message: 'Contraseña restablecida exitosamente',
        });
      })
      .catch((error) => {
        console.error('Error al restablecer la contraseña:', error);
        res.status(500).json({
          success: false,
          message: 'No se pudo restablecer la contraseña',
        });
      });
  });
};
