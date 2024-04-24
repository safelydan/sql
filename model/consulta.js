import sequelize from '../db.js';
import { DataTypes, Model } from 'sequelize';
import Paciente from './paciente.js';

export class Consulta extends Model {
  static init(sequelize) {
    return super.init({
      PacienteId: {
        type: DataTypes.INTEGER, // Supondo que o id do paciente seja um número inteiro
        allowNull: false // Defina como false se pacienteId for obrigatório
      },
      data: DataTypes.DATEONLY,
      horaInicial: DataTypes.TIME,
      horaFinal: DataTypes.TIME
    }, {
      sequelize,
      modelName: 'Consulta'
    });
  }

  // Métodos de validação aqui...

}

Consulta.init(sequelize);

Paciente.hasMany(Consulta);
Consulta.belongsTo(Paciente);

sequelize.options.define = {
  timestamps: true,
  charset: 'utf8',
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    timezone: '-03:00'
  }
};

export default Consulta;
