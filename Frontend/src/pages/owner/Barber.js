import { Text,View,StyleSheet,ScrollView, TouchableOpacity, Modal, FlatList } from "react-native"
import HeaderLogo from "../../components/Header"
import Feather from '@expo/vector-icons/Feather';
import { useCallback, useEffect, useState } from "react";
import InputDefault from "../../components/Input";
import ButtonDefault from "../../components/Button";
import { useFocusEffect } from "@react-navigation/native";
import Load from "../../components/Load";
import { GetUserBarbershop } from "../../service/SecureStore";
import { getBarbersBarbershop } from "../../service/BarbeshopService";
import { registerBarberBarbershop } from "../../service/BarbeshopService";


export default function Barber({navigation}) {

    const [addBarber,setAddBarber] = useState(false);
    const [barbers,setBarbers] = useState([]);
    const [load,setLoad]=  useState(true);
    const [nameBarber,setNameBarber] = useState("");


   useFocusEffect(
    useCallback(()=>{
        listBarbers();
    },[])
   );

  
   async function listBarbers(){
    try {

        const getBarbers = await getBarbersBarbershop();
        
        if(getBarbers.length > 0){
            setBarbers(getBarbers);
            console.log("barbeiros: ", getBarbers )
            console.log("Lista de barbeiros cadastrados encontrada");
            setLoad(false);

        }else{
            console.error("dados de barbeiros cadastrados não foram retornados");
            setLoad(false);
        }
    } catch (error) {
        console.error("Falha ao buscar barbeiros cadastrados")
    }
   }

   async function handleCrateBarber() {
    try {
        
        const result  = await registerBarberBarbershop(nameBarber);

        if(result){
            console.log("barbeiro cadastrado com sucesso");
            alert("Barbeiro cadastrado com sucesso!");
            setBarbers(result);
            setAddBarber(false)
            listBarbers();

        }else{
            console.error("não foi possível cadastrar novo barbeiro");
        }
        
    } catch (error) {
        console.error("Falha ao registrar novo barbeiro")
    }
   }


   const List = ({barber}) =>{

        return(
                   
                <View style={styles.card}>
                    {/*Icone redondo com a Inicial do nome */}
                    <View style={styles.icon}>
                        <Text style={styles.textIcon}>{barber?.name[0]}</Text>
                    </View>

                    {/*Nome do barbeiro */}
                    <View style={styles.name}>
                        <Text style={styles.textName}>{barber?.name}</Text>
                    </View>
                </View>
        )
   }

    return (
        <View style={styles.container}>
            {/*Header com a logo */}
            <HeaderLogo/>
            {/*Corpo da página*/}
            <ScrollView style={styles.body}>
                
                {/*Sobreposição modal que só adiciona um novo barbeiro*/}
                <Modal visible={addBarber}  transparent={true} animationType="fade">
                    <View style={styles.overlay}>
                        <View style={styles.modal}>
                            <InputDefault label="Nome" placeholder={"Digite aqui o nome do barbeiro"} onChange={setNameBarber}/>
                            <ButtonDefault title="Cadastrar" onpress={handleCrateBarber}/>
                        </View>
                    </View>
                </Modal>

                <View style={styles.viewTitle} >

                    <Text style={styles.title}>Equipe</Text>

                    <TouchableOpacity 
                    style={styles.button}
                    >   
                        <Feather name="plus" size={15} color="#D4AF37" />                                                
                        <Text 
                        style={styles.textButton} 
                        onPress={()=> setAddBarber(true)
                        }
                        >Novo Barbeiro
                        </Text>
                    </TouchableOpacity>
                </View>
                        
                 {/*Icône de carregamento*/}       
                {load &&(
                    <Load/>
                )}

                {/*se tiver barbeiros cadastrados*/}
                {barbers.length > 0 &&(
                    <FlatList
                        data={barbers}
                        keyExtractor={(item)=>item.id}
                        renderItem={({item})=> <List barber={item}/>}
                        scrollEnabled={false}
                    
                    />
                )}    
   
            </ScrollView>
            
        </View>
  )
}


const styles  = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000',

    },
    body:{
        width:"90%",
        alignSelf:'center'
    },
    title:{
        color:'#fff',
        fontSize:28,
        fontWeight:'bold',
        fontFamily:'san-serif',                

    },
    viewTitle:{
        marginTop:'10%',
        marginBottom:'10%',
        flexDirection:'row',
        justifyContent:'space-between',       

    },
    button:{
        backgroundColor:'#d4af3759',
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#d4af37',
        padding:3,
        

    },
    textButton:{
        color:'#D4AF37',
        fontWeight:'bold',
        fontSize:13
        
    },
    card:{
        backgroundColor:"#18181B",
        borderRadius:10,
        borderWidth:1,
        borderColor:'#ffffff2d',  
        flexDirection:'row',
        padding:10,
        marginBottom:'3%'            

    },
    icon:{
        backgroundColor:'#d4af3759',
        borderRadius:40,
        height:40,
        width:40,
        marginRight:'5%'
        
        
    },
    textIcon:{
        color:'#d4af37',
        fontSize:28,
        fontWeight:'700',
        textAlign:'center'
    },
    name:{
       justifyContent:'center'
    },
    textName:{
        color:'#fff',
        fontSize:17,
        fontWeight:'bold'

    },
    overlay:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#000000c5'
    },
    modal:{
        backgroundColor:'#000',
        width:'90%',
        alignSelf:'center',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#ffffff2d',
        padding:10,
    }




    
})