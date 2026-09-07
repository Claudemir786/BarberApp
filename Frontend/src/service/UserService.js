import { SaveInfoUser, SaveToken } from "./SecureStore";

const URL = "http://127.0.0.1:3000/api/";

const options = (method, body)=>{       
    return{
        method:method,
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(body)
    }     
}


export default async function createUser(name,email,password,phone,city,state){
    try {

        const result = await fetch(`${URL}create/user`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name:name,email:email,password:password,phone:phone,city:city,state:state})
        })

        if(!result.ok)throw new Error("falha ao se conectar com a API e criar novo usuário na base de dados");
        
        console.log("usuário criado com sucesso");

        return true;
        
    } catch (error) {
        console.error("falha ao criar usuário novo: ", error);
        return false;
    }

} 

export async function loginUser(email,password){
    try {

        const userLogin = await fetch(`${URL}login`,{
            method:"POST",
            headers:{"Content-Type":"application/Json"},
            body:JSON.stringify({email:email, password:password})

        })

        if(!userLogin.ok)throw new Error("Falha ao verificar se o usuário está cadastrado");

        const user = await userLogin.json();
        /*await SaveToken(user.user.token);
        await SaveInfoUser(user.user.name,user.user.email);*/
        console.log("o que retornou: ", user);
        return true;
        
    } catch (error) {
        console.error("Falha ao realizar o login de usuário: ", error.message)
        return false;
    }
}