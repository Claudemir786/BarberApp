import {Router } from "express";
import { User } from "../controller/userController.js";
import { BarberShop } from "../controller/barberController.js";
import { authHeader } from "../middleware/auth.js";

const route =  Router();

const user = new User();
const barber = new BarberShop();

//teste de rota
route.get("/api/test", (req,res)=>{
    res.status(200).send("conexão funcionando perfeitamente")
})

//rotas barber,barbeShop

//barbearias da região
route.get("/api/barbershop/location", authHeader, barber.location);
//retorna dias e horarios de funcionamento
route.get("/api/barbershop/info/businesshour", authHeader, barber.infoBusinessHours);
//retorna os horarios disponiveis no dia selecionado
route.get("/api/barber/available/times", authHeader, barber.availableTimes);
//retorna serviços disponiveis da barbearia
route.get("/api/available/services", authHeader, barber.availableServices);
//retorna as informaçoes padrão da barbearia
route.get("/api/barbershop/info", authHeader, barber.getBarbershop);
//retorna os agendamentos que estão em vigor
route.get("/api/user/appointments", authHeader, user.userAppointments);
//retorna histórico de agendamentos antigo
route.get("/api/user/appointment/history", authHeader, user.userAppointmentsHistory);
//busca os barbeiros cadastrados
route.get("/api/barber", authHeader, barber.getBarber);
//busca a barbearia por nome
route.get("/api/search/barbershop", authHeader, authHeader, barber.searchBarbershop);
//cancela o agendamento
route.put("/api/cancel/appointment", authHeader, barber.cancelAppointment);
//faz o update de dados padrão da barbearia
route.put("/api/update/barbershop", authHeader, barber.updateBarbershop);
//faz o update dos horarios de funcionamento
route.put("/api/update/businessHour", authHeader, barber.updateBusinessHour);
//faz o cadastro de um novo barbeiro
route.post("/api/create/barber", authHeader, barber.createBarber);
//login
route.post("/api/login", user.login);
//criação de usuário
route.post("/api/create/user", user.create);
//altera email do usuário
route.post("/api/update/email", authHeader, user.updateEmail);
//altera a senha do usuário
route.post("/api/update/password", authHeader, user.updatePassword);
//registra o agendamento
route.post("/api/scheduling", authHeader, user.scheduling);
//cadastra uma barbearia
route.post("/api/create/user/barbershop", authHeader, barber.createUserBarbershop);
//cadastra o horario de funcionamento
route.post("/create/opening/hours", authHeader, barber.createOpeningHours);
//deleta o usuário 
route.delete("/api/delete/user", authHeader, user.delete);

export default route;

