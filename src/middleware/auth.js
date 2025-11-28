const jwt = require('jsonwebtoken');
const Collectible = require('../models/collectible');
const SECRET = process.env.JWT_SECRET;

exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "Token não fornecido" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Token inválido" });

    req.user = user;
    next();
  });
};

exports.authorizeOwnerOrAdmin = async (req, res, next) => {
  const item = await Collectible.findByPk(req.params.id);

  if (!item)
    return res.status(404).json({ message: "Não encontrado" });

  if (item.ownerId !== req.user.id && req.user.role !== 'admin')
    return res.status(403).json({ message: "Acesso proibido" });

  next();
};
