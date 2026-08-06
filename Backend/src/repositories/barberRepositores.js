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


export async function getAvailableTimes(date, barbershop_id){
    try {
        //colocar depois a logica do horario para o barbeiro

        const [result] = await POOL.query(`SELECT appointment_time FROM appointments WHERE appointment_date = ? AND barbershop_id = ?`, [date, barbershop_id]);

        if(result.length === 0 ){
            console.log("nenhum registro foi encontrado")
            //mapeia só os horarios em um aray
            let time = result.map(t => {
                return t.appointment_time}
            )
            const availableTimes = await freeTimes(date,time,barbershop_id);
            return availableTimes

        }else{
            //mapeia só os horarios em um aray
            let time = result.map(t => {
                return t.appointment_time}
            )
            //chama uma função que retornar os horarios livres
            const availableTimes = await freeTimes(date,time,barbershop_id);
            console.log("só os horarios: ", availableTimes);
            return availableTimes;
        }

        
    } catch (error) {
        console.error("Erro ao retornar os dados do bando de dados: ", error);
        return false;
    }
}

export async function getAvailableServices(barbershop_id){
    try {

        const [result] = await POOL.query(`SELECT * FROM services WHERE barbershop_id = ?`, [barbershop_id]);

        if(result.length == 0)throw new Error("não foram encontrados dados no banco dados")
        
        return result;
        
    } catch (error) {
        console.error("Falha ao retornar os dados de serviço corretamente");
        return false;
        
    }
    
}

//fa a logica de verificar os horarios marcados e retornar os livres;
const  freeTimes = async(date,time,barbershop_id)=>{
    try {
        const weekend = await checkWeekend(date)
        console.log("dia da semana: ", weekend);
        //se for domingo ja retorna
        if(weekend.sunday){
            console.log("domingo")
            return "sunday";

        }else if(weekend.saturday){//se for no sabado
            console.log("sabado");
              const [result] = await POOL.query(`SELECT saturday_open, saturday_close FROM business_hours 
                                                WHERE barbershop_id = ? `, [barbershop_id]);
              
              if(result.length === 0 )throw new Error("falha ao buscar a informação se a barbearia abre no sabado");
              
              if(result.works_saturday == false){
                return false
              }

              //logica do horarios
              const availableTimes = checkTimes(result[0].saturday_open, result[0].saturday_close,time);
              return availableTimes;
             
              
        }else{//se for um dia normal da semana 
            console.log("é meio de semana")
            const [result] = await POOL.query(`SELECT weekday_open, weekday_close FROM business_hours WHERE barbershop_id = ? `, [barbershop_id]);
            
            const availableTimes = checkTimes(result[0].weekday_open, result[0].weekday_close,time);
            return availableTimes;
        }
       
        
    } catch (error) {
        console.error("falha ao retornar os horarios livres: ", error);
        return false;
    }

}

//verifica se o dia escolhido da semana é em um final de semana
const checkWeekend = async(date)=>{
    //Guarda o numero da seman de acordo com a data, com o horario de meio dia para não ter problema do fuso voltar para o dia anterior
    const dayWeek = new Date(`${date}T12:00:00`).getDay();
    
    return{
        saturday: dayWeek === 6,
        sunday: dayWeek === 0,
    }
}

//função que checa e faz a logicas dos horarios disponiveis
const checkTimes = (open,closed,time)=>{

    const busyschedule = new Set(time);
    //array vazio que será armazenado os horarios disponiveis
    const availableTimes = [];

    //trecho abaixo cria dois objetos de data atual e coloca os horarios abertura e encerramento da barbearia
    const dateOpen = new Date();
    const dateClosed = new Date();

    
   // console.log("fechamento: ", closed, "abertura: ",open , "horarios: ", time)
    const [hour,minute,second] = open.split(":");
    const [hourC,minuteC,secondC] = closed.split(":");

    dateOpen.setHours(Number(hour));
    dateOpen.setMinutes(Number(minute));
    dateOpen.setSeconds(Number(secondC));

    dateClosed.setHours(Number(hourC));
    dateClosed.setMinutes(Number(minuteC));
    dateClosed.setSeconds(Number(secondC));

    

    //laço que ira verificar se o horario ja está ocupado ou não
    while (dateOpen <= dateClosed) {
        
        const hour = dateOpen.toLocaleDateString("pt-Br", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        })
        
        //plita para pegar o vaor da hora e data separado
         let [dateArray, hourArray] = hour.split(" ")

        //verifica se o horario da vez ja existe 
        let verificHour = busyschedule.has(hourArray);

        if(!verificHour){           
            
            availableTimes.push(hourArray);
        }
        //aumenta mais 30 minutos
        dateOpen.setMinutes(dateOpen.getMinutes()+30)
       
    }

   if(!availableTimes){
    return false;
   }
   return availableTimes;
}