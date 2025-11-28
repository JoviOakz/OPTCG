const Collectible = require('../models/collectible');

exports.list = async (req, res) => {
  const itens = await Collectible.findAll();
  res.json(itens);
};

exports.getById = async (req, res) => {
  const item = await Collectible.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: "Não encontrado" });
  res.json(item);
};

exports.create = async (req, res) => {
  const item = await Collectible.create({
    ...req.body,
    ownerId: req.user.id
  });

  res.status(201).json(item);
};

exports.update = async (req, res) => {
  const item = await Collectible.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: "Não encontrado" });

  await item.update(req.body);
  res.json(item);
};

exports.remove = async (req, res) => {
  const item = await Collectible.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: "Não encontrado" });

  await item.destroy();
  res.status(204).send();
};
