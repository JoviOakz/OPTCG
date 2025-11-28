import jwt from "jsonwebtoken";
import Collectible from "../models/collectible.js";

const { verify } = jwt;
const SECRET = process.env.JWT_SECRET || "dev_secret";

export function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "Token não fornecido" });

  const token = authHeader.split(" ")[1];

  verify(token, SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Token inválido" });

    req.user = user;
    next();
  });
}

export async function authorizeOwnerOrAdmin(req, res, next) {
  const item = await Collectible.findByPk(req.params.id);

  if (!item)
    return res.status(404).json({ message: "Não encontrado" });

  if (item.ownerId !== req.user.id && req.user.role !== "admin")
    return res.status(403).json({ message: "Acesso proibido" });

  next();
}