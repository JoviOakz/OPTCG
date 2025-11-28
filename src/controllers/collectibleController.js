import Collectible from '../models/collectible.js';

export async function list(req, res) {
  const itens = await Collectible.findAll();
  res.json(itens);
}

export async function getById(req, res) {
  const item = await Collectible.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: "Não encontrado" });
  res.json(item);
}

export async function create(req, res) {
  const item = await Collectible.create({
    ...req.body,
    ownerId: req.user.id
  });

  res.status(201).json(item);
}

export async function update(req, res) {
  const item = await Collectible.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: "Não encontrado" });

  await item.update(req.body);
  res.json(item);
}

export async function remove(req, res) {
  const item = await Collectible.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: "Não encontrado" });

  await item.destroy();
  res.status(204).send();
}
