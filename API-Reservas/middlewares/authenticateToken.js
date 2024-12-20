import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido!' });
    }

    req.user = user;
    next();
  });
};

export const admin = (req, res, next) => {
  authenticateToken(req, res, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Acesso negado' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado: privilégios insuficientes' });
    }

    next();
  });
};
