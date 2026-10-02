import { createBusinessHour, createService, getAvailableServices, getAvailableTimes, getBarbershopByName, getDataBarbershopUser, getInfo, getInfoBarbershop, getLocationBarberShop, historyAppointmentsUserBabershop, listApointmentsByDate, postCreateBabershop, postCreateBarber, putCancelAppointment, putUpdateBarbershop, putUpdateBusinessHour, readBarber, selectCustomerByName } from "../repositories/barberRepositores.js";
import { messageError, messageSuccess } from "../util/message.js";



export class BarberShop{

    async location(req,res){
      try {
        //console.log("chegeui aqui")
        const id = req.user.id;
      
        const result = await getLocationBarberShop(id);

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

        const {date,barbershop_id,barber_id} = req.query;
        console.log(req.query);
        if(!date || !barbershop_id || !barber_id)return messageError(res,401,"dados não foram enviados corretamente");

        const result = await getAvailableTimes(date,barbershop_id,barber_id);
      
        if(!result) throw new Error("dados não retornaram positivamente");

        //se o dia escolhido foi domingo
        if(result === "sunday"){
          return res.status(401).json({success:false, availableTimes:"não pode ser marcado no domingo"})
        }
        
        //verifica caso o dia escolhido seja o dia atual
        const today = new Date().toISOString().split("T")[0];
        if(today === date){
          const now = new Date();
          const hour = String(now.getHours());
          const minutes = String(now.getMinutes());
          const currentTime =  hour + ":"+ minutes + ":" + "00";

          const validTimes = result.filter((h)=>{
            if(h > currentTime){
              return h;
            }
          })
          return res.status(200).json({success:true, availableTimes:validTimes});
        }
        

        return res.status(200).json({success:true, availableTimes:result});
        
      } catch (error) {
        console.error("falha ao pegar o dia e retornar os horários disponiveis: ", error);
        return messageError(res,400,"falha ao pegar o dia e retornar os horários disponiveis")
      }

    }

    async availableServices(req,res){
      try {
        
        const {barbershopId} = req.query;
        
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
        //console.log("cheguei aqui: ", req.body)
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

        return res.status(201).json({success:true, message:"barbearia criada com sucesso", barbershopId:result});
        
      } catch (error) {
        console.error("Falha ao criar usuário dono de barbearia: ",error)
        return messageError(res,400,"não foi possivel registrar uma nova barbearua")
        
      }

    }

    async createOpeningHours(req,res){
      try {

        const {barberShopId,weekday_open,weekday_close,works_saturday,
              saturday_open,saturday_close} = req.body;

        if(!barberShopId || !weekday_open || !weekday_close)return messageError(res,401,"dados foram enviados incorretamente");
          

        const result = await createBusinessHour(barberShopId,weekday_open,weekday_close,works_saturday,
              saturday_open,saturday_close);

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
       
        
        const id = req.user.id;

        const result = await getInfoBarbershop(id);

        if(!result)throw new Error("Repositories retornou falso ao buscar informações da barbearia");

       return res.status(200).json({success:true, barbershop:result});

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

        const {barbershopId} = req.query;

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
        //console.log("dados que chegaram: ", barbershopId,"nome: ",name)

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

    async getAppointmentsByDate(req,res){
      try {

        /*const barbershopId = req.query.barberhopId;
        const date = req.query.date;*/
        const{barbershopId, date} = req.query;
        console.log(req.query);

        if(!barbershopId || !date)return messageError(res,401,"dados enviados incorretamente");
        
        let formattedDate = date;

        if(typeof formattedDate === "object"){

          formattedDate = date.toISOString().split("T")[0];

        }else if(formattedDate.length > 10){
          formattedDate = formattedDate.split("T")[0];
        }

        const listAppointments = await listApointmentsByDate(barbershopId,formattedDate);
        

        if(!listAppointments)throw new Error("Não foram encontrados agendamentos");

        return res.status(200).json({success:true, appointments:listAppointments});


        
      } catch (error) {
        console.error("falha ao retornar agendamentos: ", error);
        return messageError(res,400,"Não foi possível retornar lista de agendamentos de acordo com a data enviada");
      }
      
    }

    async createServiceBarbershop(req,res){
      try {

       if(!req.body){
        return messageError(res,401,"dados não foram enviados na requisição")
       } 
        const {barbershopId,title,minutes,price} = req.body;

        if(!barbershopId || !title || !minutes || !price)return messageError(res,401,"dados enviados incorretamente");

        
        const correctMinutes = parseInt(minutes);
        const correctPrice = parseFloat(price);

        const create = await createService(barbershopId,title,correctMinutes,correctPrice);

        if(!create)throw new Error("falha na conexão com o banco e criação de novo serviço");

        return res.status(201).json({success:true, message:"serviço registrado com sucesso!"});
        
      } catch (error) {
        console.error("Erro ao registrar novo serviço na barbearia: ", error);
        return messageError(res,400,"não foi possível registrar o serviço")
      }
    }

    async searchCustomer(req,res){
      try {
        console.log(req.query)

        const {barbershopId,customer} = req.query;

        if(!barbershopId || !customer)return messageError(res,401,"dados enviados incorretamente");

        const found = await selectCustomerByName(barbershopId,customer);
        if(!found)throw new Error("Repositories retornou false dados não foram encontrados")

        return res.status(200).json({success:true,customers:found});
        
      } catch (error) {
        console.error("Erro ao buscar clientes com o nome enviado: ", error);
        return messageError(res,401,"Falha ao encontrar clientes pelo nome enviado");
      }
    }
    
   async historyAppointmentsUserFromBarbershop(req,res){
      try {

        const {customerId,barbershopId} = req.query;

        if(!customerId || !barbershopId)return messageError(res,401,"dados enviados incorretamente");

        const list = await historyAppointmentsUserBabershop(customerId,barbershopId);

        if(!list)throw new Error("Repositories retornou false não foram encontrados agendamentos");

        return res.status(200).json({success:true, appointments:list});
        
      } catch (error) {
        console.error("não foi possível retornar os agendamentos: ", error);
        return messageError(res,400,"falha ao retornar histórico de agendamentos")
      }
   }
}