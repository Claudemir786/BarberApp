
import { messageError } from "../util/message.js";
import { verifyToken } from "../util/token.js";



export async function authHeader(req,res,next){

    try {
        //pega os dados enviados no cabeçalho da requisição
        const header = req.headers.authorization;
        const [type,token] = header.split(" ");

        if(type !== "Bearer" || !token)return messageError(res,401,"credenciais enviadas incorretamente");
        //chama a função para verificar se o token é valido
        const verify = await verifyToken(token)

        if(!verify)return messageError(res,401,"token invalido");

        req.user = verify;

        next();

    } catch (error) {
        console.error("falha na autenticação: ", error);
        return messageError(res,401,"credencias invalidas, falha na autenticação");
    }

}