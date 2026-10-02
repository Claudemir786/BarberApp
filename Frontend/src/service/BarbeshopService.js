
import Appointments from "../pages/Appointments";
import options from "./ConfigRequest";
import { GetToken, GetUserBarbershop, SetReloadPageForAppointments, SetUserBarbershop } from "./SecureStore";

const URL = "http://192.168.3.43:3000/api/";



export async function getLocationBarbershop(){
    try {

        const result = await fetch(`${URL}barbershop/location`, await options("GET")
    );

        if(!result.ok)throw new Error("dados não retornaram da API");

        const barbershops = await result.json();
        return barbershops.barberShop;
        
    } catch (error) {
        console.error("falha ao buscar barbearias: ", error);
        return false;
    }
}

export async function searchBarbershopByName(nameBarbershop){
    try {

        const result = await fetch(`${URL}search/barbershop?name=${nameBarbershop}`, await options("GET"));

        if(!result.ok)throw new Error("Dados não retornaram da API ou não foi encontrado nenhum dado da pesquisa");

        const barbershop = await result.json();

        return barbershop.barbershop[0];
        
    } catch (error) {
        console.error("falha ao encontrar barbearia na base de dados: ", error);
        return false;
    }
}

export async function availableServicesBarbershop(id){

    try {

        const services = await fetch(`${URL}available/services?barbershopId=${id}`, await options("GET"))

        if(!services.ok)throw new Error("dados não retornaram corretamente da API")
        
        const servicesBarbershop = await services.json();
        
        return servicesBarbershop.services;
        
    } catch (error) {
        console.error("Falha ao buscar dados de serviços da barbearia: ", error);
        return false
    }
}

export async function infoBarbershop(barbershopId){
//barbershop/info
    try {

        const info = await fetch(`${URL}barbershop/info?barbershopId=${barbershopId}`, await options("GET"))

        if(!info.ok)throw new Error("dados não retornaram corretamente da API");

        const barbershop = await info.json();

        return barbershop.barbershop;
        
    } catch (error) {
        console.error("Falha ao buscar informações da barbearia: ", error);
        return false
    }
}

export async function getBarberFromBarbershop(barbershopId){
//barber
    try {

        const barbers = await fetch(`${URL}barber?barbershopId=${barbershopId}`, await options("GET"))

        if(!barbers.ok)throw new Error("Dados não retornaram corretamnete da API");

        const barber = await barbers.json();

        return barber.barbers;
        
    } catch (error) {
        console.error("Falha ao buscar barbeiros cadastrados dessa barbearia: ", error);
        return false
    }
}

export async function createBarbershop(name,address,city,contact_phone){
    try {
        
        const barbershop = await fetch(`${URL}create/user/barbershop`, await options(
            "POST", 
            {name,address,city,contact_phone})
        )

        if(!barbershop.ok)throw new Error("API retornou falha, o usuário não foi criado com sucesso no backend");

        const barbershopId = await barbershop.json(); 
        return barbershopId.barbershopId;


    } catch (error) {
        console.error("Falha ao criar usuário na base de dados: ", error);
        return false;
    }
}

export async function registerBussinessHour(barberShopId,weekdayOpen,weekdayClose,works_saturday,
              saturdayOpen,saturdayClose){
                
            
    try {
        
        const weekday_open = alterHours(weekdayOpen);
        const weekday_close = alterHours(weekdayClose);
        let saturday_open;
        let saturday_close;

        if(works_saturday){
            saturday_open = alterHours(saturdayOpen);
            saturday_close = alterHours(saturdayClose);
        }

        console.log(barberShopId,weekday_open,weekday_close,works_saturday,
              saturday_open,saturday_close)    


        const result = await fetch(`${URL}create/openning/hours`, await options(
            "POST",
             {
                barberShopId,
                weekday_open,
                weekday_close,
                works_saturday,
                saturday_open,
                saturday_close 
            } 
        ))

        if(!result.ok)throw new Error("Api retornou false, não foi possível registrar horario de functionamento")
        await SetReloadPageForAppointments(true)
        return true;

    } catch (error) {
        console.error("Falha ao registrar o horario de funcionamento da barbearia: ", error);
        return false;
    }
}

export async function infoUserBarbershop(profile) {
    try {
        
        const res = await fetch(`${URL}barbershop/info`, await options("GET"));

        if(!res.ok)throw new Error("Falha ao retornar dados da API");

        const user = await res.json();

        if(profile){
            return user.barbershop[0];

        }else{

             await SetUserBarbershop(user.barbershop[0].id, user.barbershop[0].name);
             return true;
        }

    } catch (error) {
        console.error("falha ao buscar dados: ", error);
        return false;
    }
}

export async function registerServiceBarbershop(barbershopId,title,minutes,price){
    try {
        console.log("preço enviado: ", price);
        const res = await fetch(`${URL}create/service`, await options("POST", {barbershopId,title,minutes,price}));

        if(!res.ok)throw new Error("não foi possivel registrar novo serviço");

        return true;
        
    } catch (error) {
        console.error("Não foi possível registrar esse serviço: ", error);
    }
}

export async function readAppointmentsBydate(barbershopId,date){
    console.log("dados recebidos: ", barbershopId,date);
    try {

        const res = await fetch(`${URL}appointments/day?barbershopId=${barbershopId}&date=${date}`, await options("GET"));

        if(!res.ok)throw new Error("Dados não retornaram corretamente da API");

        const appointments = await res.json();

        return appointments.appointments;
        
    } catch (error) {
        console.error("Falha ao retornar dados de agendamentos: ", error);
        return false
    }

} 
export async function getBarbersBarbershop(){
    try {
        const barbershopId = await GetUserBarbershop();

        const res = await fetch(`${URL}barber?barbershopId=${barbershopId.id}`, await options("GET"));

        if(!res.ok)throw new Error("Falha ao retornar dados da Api");
        const barbers = await res.json();

        return barbers.barbers;
        
    } catch (error) {
        console.error("Falha ao retornar barbeiros cadastrados na base de dados: ", error);
        return false;
    }
}

export async function registerBarberBarbershop(name){
    try {

        const barbershopId = await GetUserBarbershop();
        
        const res = await fetch(`${URL}create/barber`, await options("POST",{barbershopId:barbershopId.id,name}))

        if(!res.ok)throw new Error("Não foi possível concluir o cadastro na API");

        return true;

    } catch (error) {
        console.error("Falha ao registrar novo barbeiro: ", error);
        return false;
    }

}

export async function searchCustomerByName(name){

    try {

        const infoBarbershop = await GetUserBarbershop();

        const res = await fetch(`${URL}search/costumer?barbershopId=${infoBarbershop.id}&customer=${name}`, await options("GET"));

        if(!res.ok)throw new Error("Dados não retornaram da API");

        const customers = await res.json();

        return customers.customers;
        
    } catch (error) {
        console.error("Erro ao buscar clientes com o nome enviado: ", error);
        return false;
    }
}

//retornar o histórico de agendamentos com base no id do cliente e id da barbearia
export async function readHistotyAppointmentsByuserId(userId){
    try {

        const res = await fetch(`${URL}`)
        
    } catch (error) {
        console.error("Falha ao retornar histórico de agendamento");
        return false;
    }


}

 //deixa os horarios no padrão correto para enviar para o banco
    function alterHours(date){

        const newDate = new Date(date);

        const correctHours = newDate.toLocaleTimeString("pt-BR",{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        })

        return correctHours;

    }