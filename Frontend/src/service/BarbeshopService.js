
import options from "./ConfigRequest";
import { GetToken } from "./SecureStore";

const URL = "http://192.168.3.62:3000/api/";



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