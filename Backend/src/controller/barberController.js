import { getInfo, getLocationBarberShop } from "../repositories/barberRepositores.js";
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
            if(!id)messageError(res,401,"dados não foram enviados corretamente");

            const result = await getInfo(id);

            if(!result)return messageError(res,401,"dados não retornaram corretamente do banco");

            return res.status(200).json({success:true, info:result})

            
        } catch (error) {
            console.error("falha ao retornar os dados de informações: ", error);
            return messageError(res,401,"não foi possivel retornar informações da barbearia seleicionada")
        }

    }

    availableTimes(req,res){

    }

    availableServices(req,res){

    }

}