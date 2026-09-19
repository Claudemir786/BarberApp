import * as SecureStore from "expo-secure-store";


//salva token
export async function SaveToken(token){
    
    await SecureStore.setItemAsync("token", token)
}

//pega o token
export async function GetToken() {
    return await SecureStore.getItemAsync("token");
}

//deleta o token
export async function Logout(){
    await SecureStore.deleteItemAsync("token");
}

//salva as outras informações do usuário
export async function SaveInfoUser(name,email){
    await SecureStore.setItemAsync("name", name);
    await SecureStore.setItemAsync("email", email);
    
}

//retorna as informações do usuário
export async function GetInfoUser(){
    const nameUser = await SecureStore.getItemAsync("name");
    const emailUser = await SecureStore.getItemAsync("email");
    return{name:nameUser, email:emailUser};

}

export async function SetIsOwner(owner) {
    await SecureStore.setItemAsync("owner", owner);
}

export async function GetIsOwer(){
    return await SecureStore.getItemAsync("owner")
}