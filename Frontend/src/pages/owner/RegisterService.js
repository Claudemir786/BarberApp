import { Text, View,StyleSheet,TextInput, TouchableOpacity } from "react-native";
import Logo from "../../components/Logo";
import InputDefault from "../../components/Input";
import ButtonDefault from "../../components/Button";
import { useEffect, useState } from "react";
import { GetUserBarbershop } from "../../service/SecureStore";


export default function RegisterService({navigation}){

    const [pressButton,setPressButton] = useState(false);
    const [pressButonTwo,setPressButtonTwo] = useState(false);
    const [idBarbershop,setIdBarbershop] = useState("");
    useEffect(()=>{
        getId();
    },[])

    async function getId(){
        try {
            
            const id = await GetUserBarbershop();
            setIdBarbershop(id.id);
            console.log("user: ", id);
            console.log("idBarbershop: ", idBarbershop);

        } catch (error) {
            console.error("Falha ao buscar o Id da barbearia")
        }
    }


    return(
        <View style={styles.container}>

            {/*Cabeçario */}
            <View style={styles.header}>
                 <Logo/>
            </View>

            <View style={styles.body}>
                <Text style={styles.title}>Cadastre um novo serviço</Text>                    
                <InputDefault label="Nome"/>

                <View style={styles.field}>
                    <Text  style={styles.label}>Duração min</Text>
                     
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>

                    
                        <TouchableOpacity
                        
                         onPress={()=>{
                            setPressButton(true)
                            setPressButtonTwo(false)
                        }}
                          style={pressButton ? styles.buttonPress : styles.button}
                        >
                            <Text style={styles.time}>30:00</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={()=>{
                            setPressButtonTwo(true)
                            setPressButton(false)
                        }}
                          style={pressButonTwo ? styles.buttonPress : styles.button}
                        >
                        
                            <Text style={styles.time}>60:00</Text>
                        </TouchableOpacity>
                        
                    </View>
                    
                </View>

                <View style={styles.field}>
                    <Text style={[styles.label,{marginTop:'5%'}]}>Preço</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="decimal-pad"
                    />
                </View>
              
                <View style={{marginTop:'15%'}}></View>
                <ButtonDefault title="Cadastrar"/>
            </View>
        
            
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000',
        flex:1
    },
    header:{
        marginTop:"15%",
        width:'90%',
        alignSelf:'center'
    },
    body:{
        marginTop:'10%',
        width:'90%',
        alignSelf:'center'
    },
    title:{
        color:"#fff",
        fontFamily:'san-serif',
        fontSize:30,
        textAlign:'center',
        fontWeight:'600',
        marginBottom:'5%'
    },
    button:{
        backgroundColor:'#000',
        borderWidth:1,
        padding:15,
        borderRadius:10,
        borderColor:'#f7f7f73d',
        width:'47%'
    },
    time:{
        color:'#fff',
        textAlign:'center',
        fontSize:15

    },
    label:{
        color:'#fff',
        marginBottom:'3%',
        fontSize:20

    },
    field:{

    },
    input:{
        backgroundColor:'#18181B',
        borderRadius:10,
        padding:16,
        fontSize:22,
        color:'#797377'
    },
      buttonPress:{
        backgroundColor:"#D4AF37",
        borderWidth:1,
        padding:15,
        borderRadius:10,
        borderColor:'#f7f7f73d',
        width:'47%'
    },
})