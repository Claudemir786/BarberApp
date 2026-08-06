import { getAvailableServices, getAvailableTimes, getInfo, getLocationBarberShop } from "../repositories/barberRepositores.js";
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

    async getBarbe(req,res){
      try {
        
      } catch (error) {
        
      }
    }

}