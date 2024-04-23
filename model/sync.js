import sequelize from '../db.js';
import Paciente from './paciente.js';
import Consulta from './consulta.js';

Paciente.hasMany(Consulta);
Consulta.belongsTo(Paciente);

sequelize.sync().then(() => {
  console.log("Modelos sincronizados com o banco de dados!");
});

export { Paciente, Consulta };
