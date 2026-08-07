import { createBusinessHour, getAvailableServices, getAvailableTimes, getInfo, getLocationBarberShop, postCreateBabershop, putCancelAppointment } from "../repositories/barberRepositores.js";
import { messageError, messageSuccess } from "../util/message.js";



export class BarberShop{

    async location(req,res){
      try {

        //pega o valor que foi enviado por parametro
        const city = req.query.city;
        if(!city)return messageError(res,401,"dados não foram enviados corretamente");

        console.log("cidade: ", city);
        const result = await getLocationBarberShop(city);

        if(!result)return messageError(res,401,"não foi possivel retornar dados disponiveis nessa região")
        
        return res.status(200).json({success:true, barberShop:result});    

        
        
      } catch (error) {
        console.error("falha ao retornar dados da cidade selecionada: ", error);
        return messageError(res,401,"falha ao retornar dados de barbearias na localização selecionada");
      }

    
    }

   async info(req,res){
        try {
            const {id} = req.body;
            if(!id)return messageError(res,401,"dados não foram enviados corretamente");

            const result = await getInfo(id);

            if(!result)return messageError(res,401,"dados não retornaram corretamente do banco");

            return res.status(200).json({success:true, info:result})

            
        } catch (error) {
            console.error("falha ao retornar os dados de informações: ", error);
            return messageError(res,401,"não foi possivel retornar informações da barbearia seleicionada")
        }

    }

    async availableTimes(req,res){

      try {

        const {date,barbershop_id} = req.body;
        if(!date,!barbershop_id)return messageError(res,401,"dados não foram enviados corretamente");

        const result = await getAvailableTimes(date,barbershop_id);

      
        if(!result) throw new Error("dados não retornaram positivamente");

        //se o dia escolhido foi domingo
        if(result === "sunday"){
          return res.status(401).json({success:false, availableTimes:"não pode ser marcado no domingo"})
        }


        return res.status(200).json({success:true, availableTimes:result});


        
      } catch (error) {
        console.error("falha ao pegar o dia e retornar os horários disponiveis: ", error);
        return messageError(res,401,"falha ao pegar o dia e retornar os horários disponiveis")
      }

    }

    async availableServices(req,res){
      try {
        const {barbershopId} = req.body;
        if(!barbershopId)return messageError(res,401,"dados não foram enviados corretamente");

        const result = await getAvailableServices(barbershopId);

        if(!result)return messageError(res,401,"dados de serviços não foram encontrados");

        return res.status(200).json({success:true, services:result});
        
      } catch (error) {
        console.error("Falha ao buscar dados de serviços ofertados: ", error);
        return messageError(res,401,"falha ao buscar dados referente os serviços ofertados");
      }

    }
    async cancelAppointment(req,res){
      try {

        const {appointment_id} = req.body;

        if(!appointment_id)return messageError(res,401,"dados foram enviados incorretamente");

        const result = await putCancelAppointment(appointment_id);

        if(!result)throw new Error("barberRepositories retornou false, a opreção não foi concluida como deveria");

        return messageSuccess(res,200,"Agendamento cancelado com sucesso");

        
      } catch (error) {
        console.error("Falha ao tentar cancelar agendamento: ", error);
        return messageError(res,401,"Falha ao tentar cancelar agendamento escolhido");
      }
    }

    async createUserBarbershop(req,res){

      try {

        const{name,address,city,contact_phone} = req.body;
        //futuramente será o id do usuário logado
        const userId = 6;
        
        const result = await postCreateBabershop(userId,name,address,city,contact_phone);

        if(!result)throw new Error("Não foi possivel criar usuário proprietario de barbearia");

        return res.status(201).json({success:true, message:"barbearia criada com sucesso", barberShopId:result});
        
      } catch (error) {
        console.error("Falha ao criar usuário dono de barbearia: ",error)
        return messageError(res,401,"não foi possivel registrar uma nova barbearua")
        
      }

    }

    async createOpeningHours(req,res){
      try {

        const {barberShopId,weekday_open,weekday_close,works_saturday,
              saturday_open,saturday_close, works_sunday, sunday_open,sunday_close} = req.body;

        if(!barberShopId || !weekday_open || !weekday_close)return messageError(res,401,"dados foram enviados incorretamente");
          

        const result = await createBusinessHour(barberShopId,weekday_open,weekday_close,works_saturday,
              saturday_open,saturday_close, works_sunday, sunday_open,sunday_close);

        if(!result)throw new Error("repositories retornou false, criação não foi realizada");

        return messageSuccess(res,201,"Horário de funcionamento criado com sucesso");
        
      } catch (error) {
        console.error("falha ao criar horario de funcionamento da barbearia: ", error);
        return messageError(res,401,"falha ao cadastrar informações de horario de funcionamento");
      }
    }

    async updateBarbershop(req,res){

    }

    

    async getBarbe(req,res){
      try {
        
      } catch (error) {
        
      }
    }

}