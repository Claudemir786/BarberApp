import bycrypt, {hash} from "bcrypt";

const saltRounds = 10 //quantas vezes o algoritimo vai embaralhar a senha


export async function hashPassword(password){
    return await bycrypt.hash(password,saltRounds);
}

export async function comparePassword(password,hashPassword){

    return await bycrypt.compare(password,hashPassword);
}

