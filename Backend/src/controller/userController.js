import { getAppointments, getAppointmentsHistory, postScheduling } from "../repositories/userRepositores.js";
import { messageError, messageSuccess } from "../util/message.js";




export class User{

    login(req,res){

    }

    create(req,res){

    }

    delete(req,res){

    }

    updatePassword(req,res){

    }

    updateEmail(req,res){
        
    }

    async scheduling(req,res){

        try {
            const {barbershop_id,service_id,barber_id,appointment_date,appointment_time} = req.body;
            
            if(!barbershop_id || !service_id || !barber_id || !appointment_date || !appointment_time){
                return messageError(res,401,"dados foram enviados incorretamente")
            }
            
            //pega o id do usuário
            const userId = 1;

            const result = await postScheduling(barbershop_id,service_id,barber_id,userId,appointment_date,appointment_time)

            if(!result)return messageError(res,401,"não foi possivel registrar novo agendamento");

            return messageSuccess(res,201,"agendamento concluido com sucesso");

        } catch (error) {
            console.error("Erro ao registrar agendamento: ", error);
            return messageError(res,500,"falha ao registrar novo agendamento");
        }
    }

    async userAppointments(req,res){
        try {
           //no futuro será o id do usuário logado 
            const userId = 4;

            const result = await getAppointments(userId);

            if(!result)return messageError(res,401,"falha ao encontrar dados de agendamento do usuário");

            return res.status(200).json({success:true, appointments:result});
            
        } catch (error) {
            console.error("falha o retornoar os agendamentos do usuário: ",error);
            return messageError(res,500,"falha o retornoar os agendamentos do usuário")
        }

    }

    async userAppointmentsHistory(req,res){
        try {
            //no futuro será o id do usuário logado 
            const userId = 3;
            
            const result = await getAppointmentsHistory(userId);

            if(!result)throw new Error("a respositores retornou false, histórico não encontrado ou falha ao buscar ps dados");

            return res.status(200).json({success:true, history:result});
            
        } catch (error) {
            console.error("falha ao retornar os históricos de agendamentos antigos do usuário: ", error);
            return messageError(res,500,"falha ao retornar os históricos de agendamentos antigos do usuário")
        }
      
    }

    


}