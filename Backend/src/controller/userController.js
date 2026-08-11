import { createUser, deleteUser, getAppointments, getAppointmentsHistory, loginUser, postScheduling, updateEmailUser, updatePasswordUser } from "../repositories/userRepositores.js";
import { messageError, messageSuccess } from "../util/message.js";




export class User{

   async login(req,res){
        try {
            const{email,password} = req.body;

            if(!email || !password)return messageError(res,401,"daods foram enviados incorretamente");

            const user = await loginUser(email,password);

            if(!user)throw new Error("repositories retornou false, o usário não foi validado");

            return res.status(200).json({success:true, user:user});

            
        } catch (error) {
            console.error("Falha ao validar dados de login do usuário: ", error);
            return messageError(res,400,"não foi possível validar usuário");
        }

    }

   async create(req,res){
        try {
            const {name,email,password,phone,city,state} = req.body;

            if(!name || !email || !password || !phone || !city || !state)return messageError(res,401,"dados foram enviados incorretamente")
            
            const result = await createUser(name,email,password,phone,city,state);
            
            if(!result)throw new Error("Repositories retornou false, o usuário não foi criado na base de dados");

            return messageSuccess(res,201,"usuário criado com sucesso");
            
        } catch (error) {
            console.error("Falha ao criar usuário: ", error);
            return messageError(res,400,"não foi possível criar um novo usuário");
        }

    }

   async delete(req,res){
        try {

            //no futuro o id sera dinamico;
            const id = 7;

            const result = await deleteUser(id);

            if(!result)throw new Error("repositories retornou false, exclusão não foi efetuada");

            return messageSuccess(res,200,"usuário deletado com sucesso");
            
        } catch (error) {
            console.error("falha ao deletar usuário: ", error);
            return messageError(res,400,"não foi possivel deletar o usuário da base de dados");
        }
    }

    async updatePassword(req,res){

        try {
            const {password} = req.body;
            if(!password)return messageError(res,401,"dados enviados incorretamente");

            const id = 7;

            const result = await updatePasswordUser(id,password);
            if(!result)throw new Error("Repositories retornou false, a alteração de senha falhou");

            return messageSuccess(res,200,"senha alterada com sucesso");
        
        } catch (error) {
            console.error("Falha ao alterar a senha do usuário: ", error);
            return messageError(res,400,"não foi possivel alterar a senha")
        }
    }

   async updateEmail(req,res){
        try {
            const {email} = req.body;
            if(!email)return messageError(res,401,"dados enviados incorretamente");
            const id = 7;

            const result = await updateEmailUser(id,email);

            if(!result)throw new Error("Repositories retornou false, a alteração de email falhou");

            return messageSuccess(res,200,"email alterado com sucesso")
            
        } catch (error) {
            console.error("Falha ao alterar o email do usuário: ", error);
            return messageError(res,400,"não foi possivel alterar email do usuário")
        }
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