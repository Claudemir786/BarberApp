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

export default route;

