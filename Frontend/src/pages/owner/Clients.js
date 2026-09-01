import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from "react-native";
import HeaderLogo from "../../components/Header";
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";
import NotFound from "../../components/NotFound";



export default function Clients({navigation}) {

    const [nameClient,setNameClient] = useState("");
    const [foundClient,setFoundClient] = useState(false);
    const [search,setSearch] = useState(false);
    const [history,setHistory] =useState(false);

    function handleSearch(){
        console.log("fazendo busca")
        setSearch(true);
        setFoundClient(true)
    }
  
    return (
    <View style={styles.container}>
        <HeaderLogo/>

        {/*Titulo + campo de busca*/}
        <View style={styles.header}>
            <Text style={styles.title}>Clientes</Text>
            <View style={styles.search}>
                <View style={{marginLeft:'3%'}}>
                    <Feather name="search" size={24} color='#ffffff2d' />
                </View>                
                <TextInput 
                placeholder="digite nome do cliente" 
                onChangeText={setNameClient}
                onSubmitEditing={()=>handleSearch()}
                style={styles.input}
                placeholderTextColor={'#ffffff2d'}
                
                />
            </View>
           
        </View>

        <Modal visible={history}  transparent={true} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    {/*Agendamentos*/}
                    <View style={styles.appointment}>
        
                        {/*horarios*/}
                        <View style={styles.hour}>
                            <Feather name="clock" size={20} color="#D4AF37" />
                            <Text style={styles.textHour}>09:00</Text>
                        </View>
                        <View style={{borderLeftWidth:1,borderColor:'#ffffff2d', width:'90%'}}>
                            {/*nome do cliente e status*/}
                            <View style={styles.nameStatus}>
                                <Text style={styles.name}>Pedro Almeida</Text>
                                
                                
                                
                            </View>
                            {/*corte e preço*/}
                            <View style={styles.service}>
                                <Text style={styles.textService}>Corte Clássico  - Carlos Mendes </Text>
                                <Text style={styles.price}>R$ 35</Text>
                            </View>
        
                        </View>
                        
                        
                    
                    </View>
                    <View style={[styles.viewButtons,{marginBottom:'5%'}]}>
                        <TouchableOpacity 
                        style={styles.button}
                        
                        >
                            <Text style={styles.textButton}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, {borderLeftWidth:1, borderColor:'#ffffff2d'}]}>
                            <Text style={styles.textButton}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </Modal>


        {/*mostra o componente caso não tenha encongtrado nenhum resultado na busca*/}
        {!foundClient &&(
            <View >
            <NotFound title="Nenhum Cliente encontrado"/>
            </View>
        )}
        
       {search &&(
            <View style={{alignSelf:'center', width:'90%'}}>
            <Text style={styles.titleResult}>Resultados encontrados</Text>

            <View style={styles.cardUser}>
                {/*Icone*/}
                <View style={styles.icon}>
                    <Feather name="user" size={26} color="#D4AF37" />
                </View>

                {/*Informações do usuário*/}
                <View style={styles.infoClient}>
                    <Text style={styles.nameClient}>Claudemir Junior</Text>
                    <Text style={styles.phoneClient}>Tel:4399256078</Text>
                    
                </View>

            </View>
            {/*Botões*/}
            <View style={styles.viewButtons}>
                <TouchableOpacity 
                style={styles.button}
                onPress={()=>setHistory(true)}
                >
                    <Text style={styles.textButton}>Histórico</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, {borderLeftWidth:1, borderColor:'#ffffff2d'}]}>
                    <Text style={styles.textButton}>Agendamentos ativos</Text>
                </TouchableOpacity>
            </View>
            
        </View>
       )}
        
        <View style={{marginBottom:'15%'}}></View>
        
    </View>
  )
}

const styles = StyleSheet.create({

    container:{
        backgroundColor:'#000',
        flex:1,

    },
    search:{
        flexDirection:'row',
        backgroundColor:'#18181B',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
       
    },
    header:{
        width:'90%',
        alignSelf:'center',
        marginTop:'10%',
        
    },
    title:{
        color:'#fff',
        fontSize:25,
        fontWeight:'bold',
        fontFamily:'san-serif',
        marginBottom:'10%'    
    },
    input:{
        width:'100%',
        padding:15,
        borderRadius:10,
        color:'#ffffff2d'
    },
    titleResult:{
        color:'#797377',
        fontSize:20,
        marginTop:"5%",
        marginBottom:'5%',
        fontWeight:'bold'

    },
    cardUser:{
        backgroundColor:'#18181B',
        borderWidth:1,
        borderColor:"#ffffff2d",
        flexDirection:'row',
        padding:15,
        borderTopEndRadius:10,
        borderTopStartRadius:10,
       
    },
    icon:{
        backgroundColor:'#d4af3725',
        marginRight:'5%',
        height:40,
        width:40,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
        
    },
    infoClient:{
        

    },
    nameClient:{
        color:"#fff",
        fontSize:16,
        fontWeight:'bold',
        marginBottom:'2%',

    },
    phoneClient:{
        color:'#797377',
        fontWeight:'bold'
    },
    viewButtons:{
        flexDirection:'row',
        backgroundColor:'#18181B',
        borderBottomEndRadius:10,
        borderBottomStartRadius:10,        
        borderBottomWidth:1,
        borderRightWidth:1,
        borderLeftWidth:1,
        borderColor:'#ffffff2d',
        height:45,
        marginBottom:'3%'      
        

    },
    button:{
        justifyContent:'center',
        width:'50%'
        
    },
    textButton:{
        color:'#797377',
        fontSize:13,
        fontWeight:'bold',
        textAlign:'center'

    },
    overlay:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffffff2f',
    },
    modal:{
        width: '90%',
        backgroundColor: '#000',
        alignSelf:'center',
        padding: 20,
        borderRadius: 15,

    },
     appointment:{
        flexDirection:'row',
        width:'100%',
        alignSelf:'center',
        backgroundColor:'#18181B',
        padding:15,        
        borderWidth:1,
        borderColor:'#ffffff2d',
        borderTopEndRadius:10,
        borderTopStartRadius:10
        
        
    },
    hour:{
       marginLeft:'3%',
       marginRight:'3%',
       justifyContent:'center',
       alignItems:'center'
    },
    textHour:{
        fontSize:15,
        color:'#fff',
         fontWeight:'bold'
        
    },
     nameStatus:{
        flexDirection:'row',
        marginLeft:'3%',
        alignItems:'center',               
        justifyContent:'space-between',
        width:'90%'

    },
    name:{
        fontSize:15,
        color:'#fff',
        fontWeight:'bold'
    },
    
    service:{
        marginLeft:'3%',
    },
    textService:{
        color:"#797377",

    },
    price:{
        color:'#fff',
        fontWeight:'bold'
    },
})

