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
route.get("/api/barber/location", barber.location);
route.get("/api/barber/info", barber.info);
route.get("/api/barber/available/times", barber.availableTimes);
route.get("/api/available/services", barber.availableServices);
route.post("/api/scheduling", user.scheduling);
route.get("/api/user/appointments", user.userAppointments);
route.get("/api/user/appointment/history", user.userAppointmentsHistory);
route.put("/api/cancel/appointment", barber.cancelAppointment);
route.post("/api/create/user/barbershop", barber.createUserBarbershop);
route.post("/create/opening/hours", barber.createOpeningHours);
route.put("/api/update/barbershop", barber.updateBarbershop);


export default route;

