import { GetToken } from "./SecureStore"

export default async function options(method,body){
  
    if(body){
        
        return{           
            method:method,
            headers:{"Content-Type": "application/json",
                      "Authorization": `Bearer ${await GetToken()}`  
            },
            body:JSON.stringify(body)
        }
    }else{
        return{
             method:method,
            headers:{"Content-Type": "application/json",
                      "Authorization": `Bearer ${await GetToken()}`  
            }
        }
       
    }
}



