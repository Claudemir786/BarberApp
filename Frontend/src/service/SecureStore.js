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

//guar true ou false dependendo do tipo de usuário
export async function SetIsOwner(owner) {
    await SecureStore.setItemAsync("owner",String(owner));
}

export async function GetIsOwer(){
    return await SecureStore.getItemAsync("owner")
}

export async function SetUserBarbershop(id,name){
    await SecureStore.setItemAsync("nameBarbershop", name);
    await SecureStore.setItemAsync("idBarbershop", String(id));

}


export async function GetUserBarbershop(){
    const name = await SecureStore.getItemAsync("nameBarbershop");
    const id = await SecureStore.getItemAsync("idBarbershop");
    return{name,id}
}

export async function ClearUserData(){
    await SecureStore.deleteItemAsync("token")
    await SecureStore.deleteItemAsync("name")
    await SecureStore.deleteItemAsync("email")
    await SecureStore.deleteItemAsync("owner")
    await SecureStore.deleteItemAsync("nameBarbershop")
    await SecureStore.deleteItemAsync("idBarbershop")
    
}

