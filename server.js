require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.sync(); // em dev/dev local usamos sync simples
    console.log('DB sincronizado');
    app.listen(PORT, () => console.log(`Server rodando em http://localhost:${PORT}`));
  } catch (err) {
    console.error('Erro inicializando DB', err);
    process.exit(1);
  }
}

start();
