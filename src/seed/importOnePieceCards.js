const axios = require("axios");
const { Collectible, sequelize } = require("../models");

async function importCards() {
  try {
    console.log("🌊 Importando cartas One Piece do set OP01...");

    const SET = "OP01";

    const url = `https://optcgapi.com/api/sets/${SET}/`;
    const response = await axios.get(url);

    const cards = response.data.cards;
    console.log(`✔ ${cards.length} cartas encontradas`);

    for (const card of cards) {
      await Collectible.create({
        nome: card.card_name,
        categoria: card.card_type,
        ano: 2023,
        condicao: "Nova",
        ownerId: 1,
        raridade: card.card_rarity || "Desconhecida",
        colecao: SET,
      });
    }

    console.log("✨ Importação concluída!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Erro:", err.response?.data || err.message);
    process.exit(1);
  }
}

(async () => {
  await sequelize.sync();
  await importCards();
})();
