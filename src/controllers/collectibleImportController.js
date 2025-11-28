import axios from "axios";

export async function importar(req, res) {
  try {
    const { cardId } = req.params;

    const url = `https://optcgapi.com/api/sets/card/${cardId}/`;
    const response = await axios.get(url);

    const card = response.data;

    const item = await Collectible.create({
      nome: card.card_name,
      categoria: card.card_type,
      ano: 2023,
      condicao: "Nova",
      ownerId: req.user.id,
      raridade: card.card_rarity || "Desconhecida",
      colecao: card.card_set,
    });

    return res.status(201).json({
      message: "Carta importada com sucesso",
      item,
    });

  } catch (err) {
    return res.status(500).json({
      message: "Erro ao importar carta",
      error: err.response?.data || err.message
    });
  }
}
