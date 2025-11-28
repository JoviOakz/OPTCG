import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';            
import sequelize from './src/config/database.js'

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.sync();
    console.log('DB sincronizado');

    app.listen(PORT, () =>                       
      console.log(`Server rodando em http://localhost:${PORT}`)
    );

  } catch (err) {
    console.error('Erro inicializando DB', err);
    process.exit(1);
  }
}

start();
