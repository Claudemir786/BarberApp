
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