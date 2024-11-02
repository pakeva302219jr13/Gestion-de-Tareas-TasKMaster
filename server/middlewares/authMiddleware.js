import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  // verificar que se proporcione el header de autorización
  if (!authHeader) {
    return res.status(403).json({
      success: false,
      message: 'No se proporcionó un token de autenticación'
    });
  }

  const token = authHeader.split(' ')[1]; // elimina "Bearer" del token
  
  // verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido o expirado'
      });
    }

    req.userId = decoded.id; // csignar el ID del usuario autenticado
    next(); // continuacon el siguiente middleware o controlador
  });
};
