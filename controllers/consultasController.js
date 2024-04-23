import inquirer from "inquirer";
import { mainMenu } from "../view/menuPrincipal.js";
import Consulta from "../model/consulta.js";
import Paciente from "../model/paciente.js";

export async function agendarConsulta() {
  try {
    const resposta = await inquirer.prompt([
      {
        type: "input",
        name: "cpf",
        message: "CPF do paciente: ",
        validate: function (cpf) {
          return /^\d{11}$/.test(cpf) || "CPF inválido. Por favor digite corretamente";
        },
      },
    ]);

    const paciente = await Paciente.findOne({ where: { cpf: resposta.cpf } });

    if (!paciente) {
      console.log(`Paciente com CPF ${resposta.cpf} não encontrado.`);
      return mainMenu();
    }

    const { data, horaInicial, horaFinal } = await inquirer.prompt([
      {
        type: "input",
        name: "data",
        message: "Data da consulta (DD/MM/AAAA): ",
        validate: function (dataNascimento) {
          return /^\d{2}\/\d{2}\/\d{4}$/.test(dataNascimento) || "Data de nascimento no formato inválido. Por favor, digite no formato: DD/MM/AAAA";
        },
      },
      {
        type: "input",
        name: "horaInicial",
        message: "Hora inicial da consulta (HH:MM): ",
        validate: function (horaInicial) {
          return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(horaInicial) || "Formato de hora inválido. Use o formato HH:MM.";
        },
      },
      {
        type: "input",
        name: "horaFinal",
        message: "Hora final da consulta (HH:MM): ",
        validate: function (horaFinal) {
          return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(horaFinal) || "Formato de hora inválido. Use o formato HH:MM.";
        },
      },
    ]);

    await Consulta.create({
      pacienteId: paciente.id,
      data,
      horaInicial,
      horaFinal,
    });
    console.log(`Consulta agendada para o paciente ID ${paciente.id} no dia ${data}, das ${horaInicial} às ${horaFinal}.`);
  } catch (error) {
    console.error("Erro ao agendar consulta:", error);
  }
  mainMenu();
}

export async function cancelarAgendamento() {
  try {
    const resposta = await inquirer.prompt({
      type: "input",
      name: "cpf",
      message: "Digite o CPF do paciente cuja consulta deseja cancelar: ",
      validate: function (cpf) {
        return /^\d{11}$/.test(cpf) || "CPF inválido. Por favor digite corretamente";
      },
    });

    const paciente = await Paciente.findOne({ where: { cpf: resposta.cpf } });

    if (!paciente) {
      console.log(`Paciente com CPF ${resposta.cpf} não encontrado.`);
      return mainMenu();
    }

    const consultas = await Consulta.findAll({ where: { pacienteId: paciente.id } });

    if (consultas.length === 0) {
      console.log(`Não há consultas agendadas para o paciente com CPF ${resposta.cpf}.`);
      return mainMenu();
    }

    const consultaParaCancelar = await inquirer.prompt({
      type: "list",
      name: "consultaId",
      message: "Selecione a consulta que deseja cancelar: ",
      choices: consultas.map((consulta) => ({
        name: `Data: ${consulta.data}, Hora Inicial: ${consulta.horaInicial}, Hora Final: ${consulta.horaFinal}`,
        value: consulta.id,
      })),
    });

    await Consulta.destroy({ where: { id: consultaParaCancelar.consultaId } });
    console.log("Consulta cancelada com sucesso.");
  } catch (error) {
    console.error("Erro ao cancelar agendamento:", error);
  }
  mainMenu();
}

export async function listarConsultas() {
  try {
    const consultas = await Consulta.findAll({ include: Paciente });
    console.log("Lista de Consultas Agendadas:");
    consultas.forEach((consulta) => {
      console.log(
        `Paciente: ${consulta.Paciente.nome}, Data: ${consulta.data}, Hora Inicial: ${consulta.horaInicial}, Hora Final: ${consulta.horaFinal}`
      );
    });
  } catch (error) {
    console.error("Erro ao listar consultas:", error);
  }
  mainMenu();
}
