
import Sequelize from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'hyperballad', {
  host: 'localhost',
  dialect: 'postgres'
});

export default sequelize;
