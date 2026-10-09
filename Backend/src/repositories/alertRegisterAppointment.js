import pool from "../db/db.js";
import { htmlMessage } from "../util/emailMessage.js";
import { sendMail } from "../util/mailConfig.js";

const POLL = pool;

//função que pega os dados do agendamento para enviar menssagem via email
export async function getDataSendMail(appointmentId){

    try {

        const [result] = await POLL.query(`SELECT 
                                            u.name,
                                            u.email,
                                            b.name AS barbershop,
                                            b.address AS babershopAdress,
                                            s.title AS service_title,
                                            r.name AS barber,
                                            s.price,
                                            a.appointment_date,
                                            a.appointment_time

                                        FROM appointments a 
                                        JOIN barbershops b ON a.barbershop_id = b.id 
                                        JOIN services s ON a.service_id = s.id
                                        JOIN barbers r ON a.barber_id = r.id 
                                        JOIN users u ON a.customer_id = u.id  
                                        WHERE a.id = ?`, [appointmentId]);
       
                                        
        if(result.length === 0)throw new Error("Falha ao buscar dados para o envio de email");
        
        //pega os dados retornados
        const appointment = result[0];
        
        //organização dos dados para deixar legiveis
        const price = Number(appointment.price).toLocaleString("pt-BR", {
                                                                style: "currency",
                                                                currency: "BRL"
                                                            });
        const date = new Date(appointment.appointment_date).toLocaleDateString("pt-BR");
        const hour = appointment.appointment_time.slice(0, 5);
        console.log("data formatada: ", date)
        //guarda o código html que será enviado na menssagem
        const html = htmlMessage(
            appointment.name,
            appointment.barbershop,
            appointment.babershopAdress,
            date,
            hour,
            appointment.service_title,
            appointment.barber,
            price
        );

        //chama a função que envia o email
        await sendMail(appointment.email,html)
        

        
        
    } catch (error) {
        console.error("não foi possível enviar o email de aviso por email");
    }
}