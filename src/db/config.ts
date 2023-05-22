import { Dialect, Sequelize } from 'sequelize';

const dbHost = process.env.RDS_HOSTNAME;
const dbPort = process.env.RDS_PORT
const dbName = process.env.RDS_DB_NAME as string;
const dbUser = process.env.RDS_USERNAME as string;

const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPassword = process.env.RDS_PASSWORD;

function getConnection() {
       return new Sequelize("Demo", "postgres", "password", {
        host: "127.0.0.1",
        port: parseInt(dbPort || '5432'),
        dialect: 'postgres',
      });
}

const sequelizeConnection = getConnection()

export default sequelizeConnection;