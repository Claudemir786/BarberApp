import pool from "../db/db.js";


const POOL = pool;


export async function getLocationBarberShop(city){
    try {

        const [result] = await POOL.query(`SELECT * FROM barbershops WHERE city = ?`, [city]);


        if(result.length === 0 )throw new Error("dados não retornaram corretamente do banco de dados");
        console.log(result);
        return result;
        
    } catch (error) {
        console.error("falha ao retornar dados de localização de barbearias: ", error);
        return false;
    }
}


export async function getInfo(id){
    try {
        const [result] = await POOL.query(`SELECT * FROM business_hours WHERE barbershop_id = ? `, [id]);

        if(result.length === 0)throw new Error("falha na query do banco de dados ou os dados não foram encontrados")
        console.log(result);
        return result
        
    } catch (error) {
        console.error("Erro ao retornar os dados do banco de dados: ", error);
        return false;
    }
}