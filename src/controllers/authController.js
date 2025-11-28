const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const SECRET = process.env.JWT_SECRET || "dev_secret";

module.exports = {
  // ----------------------------
  // REGISTRO DE USUÁRIO
  // ----------------------------
  async register(req, res) {
    try {
      const { username, password, role } = req.body;

      const exists = await User.findOne({ where: { username } });
      if (exists)
        return res.status(400).json({ message: "Usuário já existe" });

      const hash = await bcrypt.hash(password, 10);

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
  },

  // ----------------------------
  // LOGIN
  // ----------------------------
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });
      if (!user)
        return res.status(401).json({ message: "Credenciais inválidas" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid)
        return res.status(401).json({ message: "Credenciais inválidas" });

      const token = jwt.sign(
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
};
