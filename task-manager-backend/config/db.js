import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log("All models were synced successfully");
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export { sequelize, connectDB };
