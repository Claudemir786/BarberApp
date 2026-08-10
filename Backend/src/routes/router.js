import {Router } from "express";
import { User } from "../controller/userController.js";
import { BarberShop } from "../controller/barberController.js";

const route =  Router();

const user = new User();
const barber = new BarberShop();

//teste de rota
route.get("/api/test",(req,res)=>{
    res.status(200).send("conexão funcionando perfeitamente")
})

//rotas barber,barbeShop

//barbearias da região
route.get("/api/barbershop/location", barber.location);
//retorna ias e horarios de funcionamento
route.get("/api/barbershop/info/businesshour", barber.infoBusinessHours);
//retorna os horarios disponiveis no dia selecionado
route.get("/api/barber/available/times", barber.availableTimes);
//retorna serviõs disponiveis da barbearia
route.get("/api/available/services", barber.availableServices);
//retorna as informaçoes padrão da barbearia
route.get("/api/barbershop/info", barber.getBarbershop)
//registra o agendamento
route.post("/api/scheduling", user.scheduling);
//retorna os agendamentos que estão em vigor
route.get("/api/user/appointments", user.userAppointments);
//retorna histórico de agendamentos antigo
route.get("/api/user/appointment/history", user.userAppointmentsHistory);
//cancela o agendamento
route.put("/api/cancel/appointment", barber.cancelAppointment);
//cadastra uma barbearia
route.post("/api/create/user/barbershop", barber.createUserBarbershop);
//cadastra o horario de funcionamento
route.post("/create/opening/hours", barber.createOpeningHours);
//faz o update de dados padrão da barbearia
route.put("/api/update/barbershop", barber.updateBarbershop);
//faz o update dos horarios de funcionamento
route.put("/api/update/businessHour", barber.updateBusinessHour);
//busca os barbeiros cadastrados
route.get("/api/barber", barber.getBarber);

//faz o cadastro de um novo barbeiro
route.post("/api/create/barber", barber.createBarber);
//busca a barbearia por nome


export default route;

