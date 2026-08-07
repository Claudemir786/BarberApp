import pool from "../db/db.js"

const POOL =pool;


export async function postScheduling(barbershop_id,service_id,barber_id,customer_id,appointment_date,appointment_time) {
    try {
        
        const [result] = await POOL.query(`INSERT INTO appointments (barbershop_id,service_id,barber_id,customer_id,appointment_date,appointment_time,status)
                                            VALUES(?,?,?,?,?,?,?)`,[barbershop_id,service_id,barber_id,customer_id,appointment_date,appointment_time,"pending"]);

        if(result.affectedRows === 0)throw new Error("dados não foram adicionados com sucesso");

        return true;

    } catch (error) {
        console.error("Erro ao adicionar novo agendamento no banco de dados: ", error);
        return false;
    }
}

export async function getAppointments(customer_id) {
    try {

        const [result] = await POOL.query(`SELECT
                                                a.id,
                                                a.appointment_date,
                                                a.appointment_time,
                                                a.status,
                                                s.title AS service_name
                                            FROM appointments a
                                            JOIN services s ON a.service_id = s.id
                                            WHERE a.customer_id = ?
                                            AND a.status IN ('pending', 'confirmed');`,[customer_id]);
        
        if(!result.length === 0)throw new Error("não foram encontrados dados no banco referente a este usuário");
        
        return result;

        
    } catch (error) {
        console.error("Falha ao retornar do banco os dados de agendamento do usuário: ", error);
        return false;
    }
    
}

export async function getAppointmentsHistory(custumer_id){
    try {


        const [result] = await POOL.query(`SELECT
                                                a.id,
                                                a.appointment_date,
                                                a.appointment_time,
                                                a.status,
                                                s.title AS service_name
                                            FROM appointments a
                                            JOIN services s ON a.service_id = s.id
                                            WHERE a.customer_id = ?
                                            AND a.status = 'completed'`,[custumer_id]);
        
        if(result.length === 0)throw new Error("não foram encontrados historico de agendamentos desse usuário");
        
        return result;
        
    } catch (error) {
        console.error("Dados não retornaram corretamente do banco de dados: ", error);
        return false;
    }

}