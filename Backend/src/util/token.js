import jwt from "jsonwebtoken"

//função que cria o token próprio do usuário que irá logar no
export function createToken(user){
    
    const token = jwt.sign({email:user.email,id:user.id,name:user.name},process.env.TOKEN,{expiresIn:"5h"});
    
    if(!token)return false;
    console.log("token criado com sucesso")
    return token;

}

//função que verifica se o token enviado tem proprieedades do token padrão que está armazenado
export function verifyToken(token){
    try {
        const verify = jwt.verify(token,process.env.TOKEN);

        return verify;
        
    } catch (error) {
        console.error("falha ao verificar o token: ", error);
        return false;
    }
}