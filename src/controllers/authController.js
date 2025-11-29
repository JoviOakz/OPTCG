import { hash as _hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const { sign } = jwt;
const SECRET = process.env.JWT_SECRET || "dev_secret";

export async function register(req, res) {
  try {
    const { username, password, role } = req.body;

    const exists = await User.findOne({ where: { username } });
    if (exists)
      return res.status(400).json({ message: "Usuário já existe" });

    const hash = await _hash(password, 10);

    const user = await User.create({
      username,
      password: hash,
      role: role || "user"
    });

    res.status(201).json({
      id: user.id,
      username: user.username
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao registrar" });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user)
      return res.status(401).json({ message: "Credenciais inválidas" });

    const valid = await compare(password, user.password);
    if (!valid)
      return res.status(401).json({ message: "Credenciais inválidas" });

    const token = sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },
      SECRET,
      { expiresIn: "8h" }
    );

    return res.json({
      message: "Login realizado com sucesso",
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao efetuar login" });
  }
}
