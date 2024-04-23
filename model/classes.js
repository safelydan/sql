// import { DataTypes, Model } from 'sequelize';
// import Sequelize from 'sequelize';
// const sequelize = new Sequelize('postgres', 'postgres', 'hyperballad', {
//   host: 'localhost',
//   dialect: 'postgres' // ou o dialect correspondente ao seu banco de dados
// });

// class Paciente extends Model {
//   static init(sequelize) {
//     return super.init({
//       nome: DataTypes.STRING,
//       cpf: DataTypes.STRING,
//       dataNascimento: DataTypes.DATE
//     }, {
//       sequelize,
//       modelName: 'Paciente'
//     });
//   }

//   validarCPF() {
//     return /^\d{11}$/.test(this.cpf);
//   }

//   validarNome() {
//     if (this.nome.length <= 4) {
//       console.log("O nome deve ter ao menos 5 caracteres");
//       return false;
//     }
//     return true;
//   }

//   calcularIdade() {
//     const dataNascimento = new Date(this.dataNascimento);
//     const hoje = new Date();
//     const diferencaMilissegundos = hoje.getTime() - dataNascimento.getTime();
//     return diferencaMilissegundos / (1000 * 60 * 60 * 24 * 365.25);
//   }

//   validarDataNascimento() {
//     const idade = this.calcularIdade();
//     return idade >= 18;
//   }

//   validarIdadeMinima(idadeMinima) {
//     const idade = this.calcularIdade();
//     return idade >= idadeMinima;
//   }
// }

// Paciente.init(sequelize);

// export class Consulta extends Model {
//   static init(sequelize) {
//     return super.init({
//       data: DataTypes.DATE,
//       horaInicial: DataTypes.TIME,
//       horaFinal: DataTypes.TIME
//     }, {
//       sequelize,
//       modelName: 'Consulta'
//     });
//   }

//   validarConsulta(){

//   }

//   validarHoraInicial(){

//   }

//   validarHoraFinal(){

//   }

//   validarAgendamentoFuturo(){
    
//   }
// }

// Consulta.init(sequelize);

// // Relacionamento entre Paciente e Consulta (opcional)
// Paciente.hasMany(Consulta);
// Consulta.belongsTo(Paciente);

// sequelize.sync().then(() => {
//   console.log("Modelos sincronizados com o banco de dados!");
// });



// export default { Paciente, Consulta };