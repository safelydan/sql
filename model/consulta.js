import sequelize from '../db.js';
import { DataTypes, Model } from 'sequelize';
import Paciente from './paciente.js';

export class Consulta extends Model {
  static init(sequelize) {
    return super.init({
      data: DataTypes.DATE,
      horaInicial: DataTypes.TIME,
      horaFinal: DataTypes.TIME
    }, {
      sequelize,
      modelName: 'Consulta'
    });
  }

  validarConsulta(){

  }

  validarHoraInicial(){

  }

  validarHoraFinal(){

  }

  validarAgendamentoFuturo(){
    
  }
}

Consulta.init(sequelize);

// Relacionamento entre Paciente e Consulta (opcional)
Paciente.hasMany(Consulta);
Consulta.belongsTo(Paciente);

export default Consulta;
