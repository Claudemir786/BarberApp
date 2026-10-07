import { View,Text,StyleSheet,ScrollView, TouchableOpacity, TextInput } from "react-native";
import HeaderLogo from "../../components/Header";
import ButtonDefault from "../../components/Button";
import InputDefault from "../../components/Input";
import { useState, useEffect } from "react";
import { getCities, getStates } from "../../util/connIBGEapi";
import {Picker} from '@react-native-picker/picker'
import Feather from '@expo/vector-icons/Feather';
import Load from "../../components/Load";
import { changeDataBarbershop, infoUserBarbershop } from "../../service/BarbeshopService";
import { ClearUserData, GetInfoUser, GetUserBarbershop } from "../../service/SecureStore";


export default function Settings({navigation}) {
  
    const [phone,setPhone] = useState("")
    const [name,setName] = useState("")
    const [address, setAddress] = useState("")    
    const [cities,setCities] = useState([]);
    const [city,setCity] = useState("");
    const [states,setStates] = useState([]);
    const [state,setState] = useState("Estado");
    const [load,setLoad] = useState(false);

    useEffect(()=>{
        loadStates()
        infoBarbershop();
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

    //busca as informções da barbearia
    async function infoBarbershop(){
        try {
            setLoad(true);
            const getInfoBarbershop = await infoUserBarbershop(true);

            if(getInfoBarbershop){
                setName(getInfoBarbershop.name);
                setAddress(getInfoBarbershop.address);
                setPhone(getInfoBarbershop.contact_phone);
                setCity(getInfoBarbershop.city);
                console.log("informações da barbearia foram carregadas com sucesso: ", getInfoBarbershop);
                

            }else{
                console.warn("dados da barbearia não foram carregados");
            }
            setLoad(false);
        } catch (error) {
            console.error("Falha ao buscar dados da barbaria: ", error);
            setLoad(false);
        }
    }

    //envia as alterações feitas
    async function handleChangeDataBarbershop(){
        try {
            setLoad(true);
            const result = await changeDataBarbershop(name,address,phone,city);

            if(result){
                console.log("dados da barbearia foram alterados com sucesso!!");
                alert("dados da barbearia foram alterados com sucesso")
                await infoBarbershop();
                navigation.navigate("Inicio");
            }else{
                console.warn("não foi possível alterar dados da barbearia");
            }
            setLoad(false);
            
        } catch (error) {
            console.error("Falha ao alterar dados da barbearia: ", error);
             setLoad(false);
        }
    }

    async function handleChangeHours(){
        try {
            const id = await GetUserBarbershop()
            navigation.navigate("BusinessHours", {id:id.id})
            
        } catch (error) {
            console.error("falha ao chamar pagina de informações de funcionamento")
        }
    }

    async function logout(){
        try {

            await ClearUserData();
            navigation.reset({
                index: 0,
                routes:[{name: "Index"}]
            })
            
        } catch (error) {
            console.error("Falha ao fazer o logout");
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
                onPress={handleChangeHours}
                >  
                <View>
                    <Feather name="clock" size={18} color="#fff" />
                </View>                 
                <Text style={styles.textButtonHour}>Horários</Text>
                </TouchableOpacity>
            </View>

            {load &&(
                <>
                    <Load/>
                </>
                
            )}

            {/*nome, endereço,telefone ,estado, cidade */}
            <View>
                <InputDefault label="Nome da barbearia" placeholder={name} onChange={setName}/>
                <InputDefault label="Endereço" placeholder={address} onChange={setAddress}/>
                {/*telefone de contato*/}
                <Text style={styles.label}>Telefone para contato</Text>
                <View>
                    <TextInput
                        placeholder={phone}
                        keyboardType="numeric"
                        placeholderTextColor={"#797377"}
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
            {!load&&(
                <ButtonDefault title="Salvar alterações" onpress={handleChangeDataBarbershop}/>
            )}
            <View style={{marginTop:'10%'}}>
                <ButtonDefault title="Sair" color="#000" textColor="#D4AF37" onpress={logout}/>
            </View>
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
        marginBottom:'10%',
       
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