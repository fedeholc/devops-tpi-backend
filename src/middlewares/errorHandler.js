/* eslint-disable no-unused-vars */
/**
 * Middleware para manejo de errores global.
 */
export function errorHandler(err, req, res, _next) {
  console.error(err);
  res.status(500).json({ message: "Error interno del servidor" });
}
