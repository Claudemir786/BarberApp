
import options from "./ConfigRequest";
import { GetToken } from "./SecureStore";

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