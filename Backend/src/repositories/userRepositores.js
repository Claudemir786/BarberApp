import pool from "../db/db.js"
import { comparePassword, hashPassword } from "../util/bcrypt.js";

const POOL =pool;

export async function createUser(name,email,password,phone,city,state){
    try {
        
        //encripta a senha antes de enviar para o banco
        const passwordCrypt = await hashPassword(password);
        const [result] = await POOL.query(`INSERT INTO users (name,email,password,phone,city,state)
                                           VALUES(?,?,?,?,?,?)`, [name,email,passwordCrypt,phone,city,state]);

        if(result.affectedRows === 0 )throw new Error("falha ao inserir novo usuário no banco de dados");
        
        return true;
        
    } catch (error) {
        console.error("Falha ao criar novo usuário na base de dados: ", error);
        return false;
    }
}

export async function loginUser(email,password){
try {
    
    const [result] = await POOL.query(`SELECT * FROM users WHERE email = ?`, [email]);

    if(result.length === 0 )throw new Error("banco de dados não encontrou usuário do email enviado");

    //compara as duas senha
    const user = result[0]   
    const verificPassword = await comparePassword(password,user.password);
    if(!verificPassword)throw new Error("as senha não são iguais ");

    return result;

} catch (error) {
    console.error("falha ao verificar se o usuário existe na base de dados: ", error);
    return false
}
}

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
                                                s.title AS service_name,
                                                b.name AS barbershop
                                            FROM appointments a
                                            JOIN services s ON a.service_id = s.id
                                            JOIN barbershops b ON a.barbershop_id = b.id
                                            WHERE a.customer_id = ?
                                            AND a.status IN ('pending', 'confirmed')
                                            ;`,[customer_id]);
        
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

export async function deleteUser(id) {
    try {

        const [result] = await POOL.query(`UPDATE users SET active = false WHERE id = ?`, [id]);

        if(result.affectedRows === 0)throw new Error("Falha ao mudar o estado para inativo no banco de dados");

        return true;
        
    } catch (error) {
        console.error("falha oa deletar usuário da base de dados: ", error);
        return false;
    }
}

export async function updatePasswordUser(id,password){
    try {

        const newPassword = await hashPassword(password);

        const [result] = await POOL.query(`UPDATE users SET password = ? WHERE id = ?`, [newPassword,id]);

        if(result.affectedRows === 0)throw new Error("A alteração de senha do usuário no banco falhou");

        return true;
        
    } catch (error) {
        console.error("Falha ao alterar a senha do usuário: ", error);
        return false;
    }

}

export async function updateEmailUser(id,email){
    try {

        const [result] = await POOL.query(`UPDATE users SET email = ? WHERE id = ?`, [email,id]);

        if(result.affectedRows === 0)throw new Error("a alteração de email falhou no banco de dados");

        return true;
        
    } catch (error) {
        console.error("Falha ao tentar alterar email do usuário: ", error);
        return false;
    }

}