import { View,Text,StyleSheet,ScrollView, TouchableOpacity, TextInput } from "react-native";
import HeaderLogo from "../../components/Header";
import ButtonDefault from "../../components/Button";
import InputDefault from "../../components/Input";
import { useState, useEffect } from "react";
import { getCities, getStates } from "../../util/connIBGEapi";
import {Picker} from '@react-native-picker/picker'
import Feather from '@expo/vector-icons/Feather';


export default function Settings({navigation}) {
  
    const [phone,setPhone] = useState("123456")
    const [name,setName] = useState("default")
    const [address, setAddress] = useState("default")    
    const [cities,setCities] = useState([]);
    const [city,setCity] = useState("dafault");
    const [states,setStates] = useState([]);
    const [state,setState] = useState("default");

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

    return (
    <View style={styles.container}>
        <HeaderLogo/>
        <View style={{marginTop:'5%'}}></View>
        <ScrollView style={styles.body}>
            
            <Text style={styles.title}>Barbearia</Text>

            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                <TouchableOpacity 
                style={styles.buttonHour}

                >  
                <View>
                    <Feather name="clock" size={18} color="#fff" />
                </View>                 
                <Text style={styles.textButtonHour}>Horários</Text>
                </TouchableOpacity>
            </View>

            {/*nome, endereço,telefone ,estado, cidade */}
            <View>
                <InputDefault label="Nome da barbearia" placeholder={name}/>
                <InputDefault label="Endereço" placeholder={address}/>
                {/*telefone de contato*/}
                <Text style={styles.label}>Telefone para contato</Text>
                <View>
                    <TextInput
                        placeholder=""
                        keyboardType="numeric"
                        value={phone}
                        onChangeText={(text) => {
                            setPhone(text.replace(/[^0-9]/g, ""));
                        }}
                        style={styles.inputPhone}
                    />
                </View>    
            </View>

            {/*cidade/estado*/}
            <View style={styles.viewPicker}>
                
                <Text style={styles.textPicker}>Estado</Text>

                
                <Picker 
                selectedValue={state} 
                onValueChange={(value)=> setState(value)}
                style={styles.picker}
                >
                    <Picker.Item
                        label={state}
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
                        label={city}
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
            
            <ButtonDefault title="Salavar alterações"/>
            <View style={{marginBottom:'15%'}}></View>

        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000',
        flex:1,
    },
    body:{
        width:'90%',
        alignSelf:'center'
    },
    title:{
        color:"#fff",
        fontSize:25,
        fontFamily:'san-serif',
        
    },
    buttonHour:{
        backgroundColor:'#D4AF37',
        padding:7,
        borderRadius:10,
        flexDirection:"row",
        

    },
    textButtonHour:{
        color:'#fff',
        fontSize:15,
        fontWeight:'bold',
        marginLeft:'2%'
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
})