
import {Text,View,StyleSheet, TouchableOpacity,ScrollView, TextInput} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import Logo from '../components/Logo'
import ButtonDefault from '../components/Button'
import InputDefault from '../components/Input'
import { useEffect, useState } from 'react'
import { getCities, getStates } from '../util/connIBGEapi.js'
import createUser from '../service/UserService.js'
import ErrorMessage from '../components/ErrorMessage.js'




export default function Register({navigation}){

    const [cities,setCities] = useState([]);
    const [city,setCity] = useState("");
    const [states,setStates] = useState([]);
    const [state,setState] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [secondPasword, setSecondPassword] = useState("");
    const [failEmail, setFailEmail] = useState(false);
    const [failPassword,setFailPassword] = useState(false);
    const [comparePassWord,setComparePassword] = useState(true);
    const [phone,setPhone] = useState("")


    useEffect(()=>{
        loadStates()
    },[])

    useEffect(()=>{
        loadCitys();
    },[state])

    async function loadStates(){
        try {
            const getstates = await getStates();
            setStates(getstates);  

        } catch (error) {
            console.error("falha ao retornar os estados")
        }
    }

    async function loadCitys(){
        if(!states)return console.errror("estado não foi selecionado");        

        try {
            console.log("estado selicionado: ", state)
            const getcities = await getCities(state);

            if(getcities){
                setCities(getcities);
            }
            
        } catch (error) {
            console.error("falha ao carregar cidades");
        }
    }

    //finção que é chamada ao clicar no botãi de criar conta
    async function handleCreate(){
        try {

            const pass = verificPassword();
            const mail = verificEmail();

            if(!pass || !mail)throw new Error("senha ou email não são validos");

            const userCreate = await createUser(name,email,password,phone,city,state)

            if(userCreate){
                console.log("email e senha validados com sucessos");
                alert("Usuário criado com sucesso")
                navigation.navigate("Login")

            }else{
                alert("Não foi possível criar usuário novo");
            }

            
            
        } catch (error) {
            console.error("falha ao criar usuário na base de dados: ",error.message);
            
        }

    }

    //verifica se a senha é valida e se coencidem
    const verificPassword = ()=> {
        //compara as duas senhas primerio
        if(password !== secondPasword){
            console.log("senha não são iguais")
            setComparePassword(false);
            return false;
        }else{
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

                <Text style={styles.title}>Criar uma conta</Text>
                <Text style={styles.subtitle}>Preencha seus dados para criar sua conta</Text>

                {/*Inputs */}

                <InputDefault label='Nome' value={name} onChange={setName}/>
                
                <InputDefault label='Email' value={email} onChange={setEmail}/>
                
                <Text style={styles.label}>Telefone</Text>
                <TextInput
                    placeholder="Digite seu telefone"
                    keyboardType="numeric"
                    value={phone}
                    onChangeText={(text) => {
                        setPhone(text.replace(/[^0-9]/g, ""));
                    }}
                    style={styles.inputPhone}
                />

                

                {/*cidade/estado*/}
                <View style={styles.viewPicker}>
                    
                    <Text style={styles.textPicker}>Estado</Text>
                    <Picker 
                    selectedValue={state} 
                    onValueChange={(value)=> setState(value)}
                    style={styles.picker}
                    >
                        <Picker.Item
                            label='Selecione o estado'
                            value=""
                        />
                        {states.map((item)=>(
                            <Picker.Item
                                key={item.id}
                                label = {item.nome}
                                value={item.sigla}
                            />
                        ))}    

                    </Picker>
                    
                </View>
                
                <View style={styles.viewPicker}>
                    <Text style={styles.textPicker}>Cidade</Text>
                    <Picker 
                    selectedValue={city} 
                    onValueChange={(value)=> setCity(value)}
                    style={styles.picker}
                    >
                        <Picker.Item
                            label='Selecione uma cidade'
                            value=""
                        />
                        {cities.map((item)=>(
                            <Picker.Item
                                key={item.id}
                                label={item.nome}
                                value={item.nome}
                            />
                        ))}    

                    </Picker>
                </View>
                    
                
                <InputDefault label='Senha' password={true} value={password} onChange={setPassword}/>
                <InputDefault label='Digite a senha novamente' password={true} value={secondPasword} onChange={setSecondPassword}/>
                {/*Email invalido*/}
                {failEmail &&(
                    <ErrorMessage text={"E-mail inválido, por favor digite um e-mail válido"}/>
                )}

                {failPassword &&(
                    <ErrorMessage text={"Senha inválida, a senha deve conter letra maiuscula,minuscula, numero e caracter especial"}/>
                )}

                {!comparePassWord &&(
                    <ErrorMessage text={"Senhas não coincidem"}/>
                )}
                <ButtonDefault title='Criar Conta' textColor='#000' onpress={handleCreate}/>



                <View style={{flexDirection:'row',justifyContent:'center', marginTop:"10%"}}>
                    <Text style={styles.textLogin}>Já tem uma conta?</Text>

                    <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
                        <Text style={styles.textButton}>  Entrar</Text>
                    </TouchableOpacity>
                </View>
             </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#000"
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
        
    },
    textPicker:{
        color:"#fff",
        fontSize:17,
        marginBottom:'2%'
    },
    viewPicker:{
        marginBottom:'10%'
    },
    picker:{
        color:"#fff",
        backgroundColor:"#18181B",
        padding:20,
        fontSize:17,
        borderRadius:10,
        borderWidth:0
    },
   
      inputPhone:{
        backgroundColor:'#18181B',
        borderRadius:10,
        padding:16,
        fontSize:22,
        color:'#797377',
        marginBottom:"10%"
    },
     label:{
        color:"#fff",
        fontSize:17,
        fontWeight:'500',
        marginBottom:'2%'
    }
})

