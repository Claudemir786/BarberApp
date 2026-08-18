
import {Text,View,StyleSheet, TouchableOpacity,ScrollView} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import Logo from '../components/Logo'
import ButtonDefault from '../components/Button'
import InputDefault from '../components/Input'
import { useEffect, useState } from 'react'
import { getCities, getStates } from '../util/connIBGEapi.js'




export default function Register({navigation}){

    const [cities,setCities] = useState([]);
    const [city,setCity] = useState("");
    const [states,setStates] = useState([]);
    const [state,setState] = useState("");

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

                <InputDefault label='Nome'/>
                <InputDefault label='Email'/>
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
                    
                
                <InputDefault label='Senha' password={true}/>
                <ButtonDefault title='Criar Conta' textColor='#000'/>



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
    }

})