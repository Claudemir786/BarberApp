import { createBusinessHour, getAvailableServices, getAvailableTimes, getBarbershopByName, getInfo, getInfoBarbershop, getLocationBarberShop, postCreateBabershop, postCreateBarber, putCancelAppointment, putUpdateBarbershop, putUpdateBusinessHour, readBarber } from "../repositories/barberRepositores.js";
import { messageError, messageSuccess } from "../util/message.js";



export class BarberShop{

    async location(req,res){
      try {

        //pega o valor que foi enviado por parametro
        const city = req.query.city;
        if(!city)return messageError(res,401,"dados não foram enviados corretamente");

        console.log("cidade: ", city);
        const result = await getLocationBarberShop(city);

        if(!result)return messageError(res,400,"não foi possivel retornar dados disponiveis nessa região")
        
        return res.status(200).json({success:true, barberShop:result});    

        
        
      } catch (error) {
        console.error("falha ao retornar dados da cidade selecionada: ", error);
        return messageError(res,400,"falha ao retornar dados de barbearias na localização selecionada");
      }

    
    }

   async infoBusinessHours(req,res){
        try {
            const {id} = req.body;
            if(!id)return messageError(res,401,"dados não foram enviados corretamente");

            const result = await getInfo(id);

            if(!result)return messageError(res,400,"dados não retornaram corretamente do banco");

            return res.status(200).json({success:true, info:result})

            
        } catch (error) {
            console.error("falha ao retornar os dados de informações: ", error);
            return messageError(res,400,"não foi possivel retornar informações da barbearia seleicionada")
        }

    }

    async availableTimes(req,res){

      try {

        const {date,barbershop_id,barber_id} = req.body;
        console.log(req.body);
        if(!date || !barbershop_id || !barber_id)return messageError(res,401,"dados não foram enviados corretamente");

        const result = await getAvailableTimes(date,barbershop_id,barber_id);
      
        if(!result) throw new Error("dados não retornaram positivamente");

        //se o dia escolhido foi domingo
        if(result === "sunday"){
          return res.status(401).json({success:false, availableTimes:"não pode ser marcado no domingo"})
        }

        return res.status(200).json({success:true, availableTimes:result});
        
      } catch (error) {
        console.error("falha ao pegar o dia e retornar os horários disponiveis: ", error);
        return messageError(res,400,"falha ao pegar o dia e retornar os horários disponiveis")
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
        return messageError(res,400,"falha ao buscar dados referente os serviços ofertados");
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
        return messageError(res,400,"Falha ao tentar cancelar agendamento escolhido");
      }
    }

    async createUserBarbershop(req,res){

      try {

        const{name,address,city,contact_phone} = req.body;
        //futuramente será o id do usuário logado
        const userId = req.user.id;
        
        const result = await postCreateBabershop(userId,name,address,city,contact_phone);

        if(!result)throw new Error("Não foi possivel criar usuário proprietario de barbearia");

        return res.status(201).json({success:true, message:"barbearia criada com sucesso", barberShopId:result});
        
      } catch (error) {
        console.error("Falha ao criar usuário dono de barbearia: ",error)
        return messageError(res,400,"não foi possivel registrar uma nova barbearua")
        
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
        return messageError(res,400,"falha ao cadastrar informações de horario de funcionamento");
      }
    }

    //recebe o id do usuário proprietario
    async getBarbershop(req,res){
      try {
        
        //futuramente será o id do usuário
        const id = req.user.id;

        const result = await getInfoBarbershop(id);

        if(!result)throw new Error("Repositories retornou falso ao buscar informações da barbearia");

        res.status(200).json({success:true, barbershop:result});

      } catch (error) {
        console.error("falha ao buscar dados: ", error);
        return messageError(res,400,"não foi possivel retornar dados da barbearia");
      }
    }

    //faz alteração dos dados da barberia 
    async updateBarbershop(req,res){
      try {

        const {id,name,address,contact_phone,city} = req.body;

        if(!id,!name,!address,!contact_phone,!city)return messageError(res,401,"os dados foram enviados incorretamente");

        const result = await putUpdateBarbershop(id,name,address,contact_phone,city);

        if(!result)throw new Error("Repositories retornou false, update falhou");

        return messageSuccess(res,200,"dados alterados com sucesso");

        
      } catch (error) {
        console.error("falha ao atualizar os dados da barbearia: ", error);
        return messageError(res,400,"não foi possível alterar os dados da barbearia");
      }
    }

    async updateBusinessHour(req,res){
      try {

        const {barberShopId,weekday_open,weekday_close,works_saturday,
              saturday_open,saturday_close, works_sunday, sunday_open,sunday_close} = req.body;

         if(!barberShopId,!weekday_open,!weekday_close){
              return messageError(res,401,"dados enviados incorretamente");
            }
        
         const result = await putUpdateBusinessHour(barberShopId,weekday_open,weekday_close,works_saturday,
              saturday_open,saturday_close, works_sunday, sunday_open,sunday_close)
         
         if(!result)throw new Error("Repositories retornou false, o UPDATE falhou");
         
         return messageSuccess(res,200,"dados atualizados com sucesso");

        
      } catch (error) {
        console.error("falha ao realizar a atualização de horario de funcionamento: ", error);
        return messageError(res,400,"não foi possível realizar a atualização do horário de funcionamento");
        
      }
    }
    

    async getBarber(req,res){
      try {

        const {barbershopId} = req.body;

        if(!barbershopId)return messageError(res,401,"dados enviados incorretamente");

        const result = await readBarber(barbershopId);

        if(!result)throw new Error("A repositories retornou false, não foi possível retornar a lista de barbeiros disponíveis")

        return res.status(200).json({success:true, barbers:result});  
        
      } catch (error) {
        console.error("Falha ao retornar dados: ", error);
        return messageError(res,400,"não foi possível retornar os dados");
      }
    }


    async createBarber(req,res){
      try {

        const {barbershopId,name} = req.body;

        if(!barbershopId || !name)messageError(res,401,"dados não foram enviados corretamente");

        const result  = await postCreateBarber(barbershopId,name);

        if(!result)throw new Error("Repositores retornou false, não foi possivel criar novo usuário");

        return res.status(201).json({success:true, message:"barbeiro criado com sucesso"})
        
      } catch (error) {
        console.error("Falha ao cadastrar novo barbeiro: ", error);
        return messageError(res,400,"não foi possível criar um novo barbeiro");
      
      } 
    }


    async searchBarbershop(req,res){
      try {

        const barbershopName = req.query.name;

        console.log("nome recebido: ", barbershopName);

        const barbershop = await getBarbershopByName(barbershopName);

        if(!barbershop)throw new Error("repositories retornou false, não foram encontrados dados");

        return res.status(200).json({success:true, barbershop:barbershop});
        
      } catch (error) {
        console.error("falha ao encontrar barbearia: ", error);
        return messageError(res,400,"Não foi possivel retornar dados de busca de barbearia");
      }
    }

}