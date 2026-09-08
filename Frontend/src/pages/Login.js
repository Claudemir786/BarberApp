import {Text,View,StyleSheet,TouchableOpacity, ScrollView} from 'react-native'
import Logo from '../components/Logo'
import InputDefault from '../components/Input'
import ButtonDefault from '../components/Button'
import { useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import { loginUser } from '../service/UserService'



export default function login({navigation}){

    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("");
    const [failPassword,setFailPassword] = useState(false);
    const [failEmail,setFailEmail] = useState(false)

   async function handleLogin(){
      try {
        const mail = verificEmail();
        const pass = verificPassword();

        if(!mail || !pass)throw new Error("email ou senha invalidos");

        const result = await loginUser(email,password);

        if(result){

            console.log("login realizado com sucesso");
            alert("Login realizado com sucesso");

            if(result.owner === false){

                navigation.navigate("Tab")

            }else{
                
                navigation.navigate("TabsOwner");
            }
            
        }else{
            alert("falha ao realizar o login");
        }

        
        
      } catch (error) {
        console.error("falha ao loga usuário: ", error.message);

      }
        
      
        
    }

     //verifica se a senha é valida e se coencidem
    const verificPassword = ()=> {
      
            //verifia se a senha contém letra minuscula, maiuscula,numero e simbolo 
            const validPassword =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

            if(validPassword.test(password)){
                console.log("senha valida");
                return true;
            }else{
                console.log('senha invalida'); 
                setFailPassword(true)                
                return false;
               
            }
        }            

    //verifca se o e-mail é valido
    const verificEmail = ()=> {
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(validEmail.test(email)){
            console.log("email válido");
            return true

        }else{
            console.log("email inválido")
            setFailEmail(true);
            return false;
        }
    }

    return(
        <ScrollView style={styles.container}>
            
               {/*cabeçario */}
                <View style={{marginTop:'30%', width:'90%',alignSelf:'center'}}>
                    <Logo/>
                </View>

                {/*corpo da página*/}
                <View style={{width:'90%', alignSelf:'center', marginTop:'10%', marginBottom:'30%'}}>

                    <Text style={styles.title}>Entrar</Text>
                    <Text style={styles.subtitle}>Digite seu e-mail para acessar sua conta</Text>

                    {/*Inputs */}
                    <InputDefault label='Email' value={email} onChange={setEmail}/>
                    <InputDefault label='Senha' password={true} value={password} onChange={setPassword}/>

                    {/*Senha incorreta */}
                    {failPassword &&(
                        <ErrorMessage text={"Senha inválida, a senha deve conter letra maiuscula,minuscula, numero e caracter especial"}/>  
                    )}

                    {/*Email invalido*/}
                    {failEmail &&(
                        <ErrorMessage text={"E-mail inválido, por favor digite um e-mail válido"}/>
                    )}
                    
                    <ButtonDefault title='Entrar' textColor='#000' onpress={handleLogin}/>

                    <View style={{flexDirection:'row',justifyContent:'center', marginTop:"10%"}}>
                        <Text style={styles.textLogin}>Não tem uma conta?</Text>
    
                        <TouchableOpacity onPress={()=> navigation.navigate("Register")}>
                            <Text style={styles.textButton}>  Criar uma conta</Text>
                        </TouchableOpacity>
                    </View>
                </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000'
    },
     title:{
        color:"#fff",
        fontFamily:'san-serif',
        fontSize:40,
        fontWeight:'bold',
        marginBottom:'5%'
    },
    subtitle:{
        color:'#797377',
        fontSize:17,
        marginBottom:'10%'
    },
     textLogin:{
        color:'#797377',
        fontSize:17
    },
    textButton:{
        fontSize:17,
        color:'#D4AF37',
        
    }
})