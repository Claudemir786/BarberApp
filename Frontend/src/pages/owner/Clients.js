import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, FlatList } from "react-native";
import HeaderLogo from "../../components/Header";
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";
import NotFound from "../../components/NotFound";
import Load from "../../components/Load";
import {readHistotyAppointmentsByuserId, searchCustomerByName} from "../../service/BarbeshopService"; 
import ButtonDefault from "../../components/Button";
import ListAppointments from "../../components/ListAppointments";


export default function Clients({navigation}) {

    const [nameClient,setNameClient] = useState("");
    const [foundClient,setFoundClient] = useState(false);//utilizado somente para mostrar os resultados ou não
    const [search,setSearch] = useState(false);//enter da pesquisa do input
    const [history,setHistory] = useState(false);//controla modal de exibição do histórico
    const [customers,setCustomers] = useState([]);//lista de clientes encontrados na pesquisa por nome
    const [load,setLoad] = useState(false);//controla quando a animação de carregamento vai aparecer
    const [appointmentHistory,setAppointmentHistory] = useState([]);
   
    


    async function handleSearch(){
        try {
            setFoundClient(true);
            setLoad(true);
            console.log("nome digitado: ", nameClient)
            
            const listCustomer = await searchCustomerByName(nameClient);

            if(listCustomer.length > 0){
                setSearch(true);
                console.log("clientes encontrados: ", listCustomer);
                setCustomers(listCustomer);
               
            }else{
                console.warn("Não foram encontrados clientes")
                setFoundClient(false);
                setCustomers([])
            }
            setLoad(false);
            


        } catch (error) {
            console.error("falha ao buscar clientes");
            setLoad(false);
            setFoundClient(false);
        }
        
       
    }

    //busca histórico de agendamentos do cliente escolhido
    async function historyAppointment(customerId) {
        try {
            setLoad(true);
            console.log("Id recebido para exibição de histórico: ",customerId)

            const listAppointments = readHistotyAppointmentsByuserId(customerId);

            if(listAppointments.length > 0){
               
                console.log("histórico de agendamentos encontrado com sucesso")
                setAppointmentHistory(listAppointments);
            }else{
                console.warn("lista de agendamentos não chegaram na pagina");
            }
            setLoad(false);
            
        } catch (error) {
            console.error("falha ao buscar histórico de agendamentos do cliente");
            alert("não foi possível encontrar histórico de agendamentos desse cliente");
            setHistory(false);
            setLoad(false);
        }
       
    }



    //componente usado para mostrar o card do usuário encontrado
    const FindedCustomer = ({user})=>{
        return(
         <>
            <View style={styles.cardUser}>
            {/*Icone*/}
            <View style={styles.icon}>
                <Feather name="user" size={26} color="#D4AF37" />
            </View>

            {/*Informações do usuário*/}
            <View style={styles.infoClient}>
                <Text style={styles.nameClient}>{user?.name}</Text>
                <Text style={styles.phoneClient}>Tel:{user?.phone}</Text>
                
            </View>

        </View>
        {/*Botões*/}
        <View style={styles.viewButtons}>
            <TouchableOpacity 
            style={[styles.button, {width:'100%'}]}
            onPress={()=>{
                setHistory(true)
                historyAppointment(user?.id);
                }
            }
            >
                <Text style={styles.textButton}>Histórico de agendamentos</Text>
            </TouchableOpacity>

           
        </View>
         </>
        )
    }

  
    return (
    <View style={styles.container}>
        <HeaderLogo/>

        {/*Titulo + campo de busca*/}
        <View style={styles.header}>
            <Text style={styles.title}>Clientes</Text>
            <View style={styles.search}>
                             
                <TextInput 
                placeholder="digite nome o do cliente" 
                onChangeText={setNameClient}
                onSubmitEditing={()=>handleSearch()}
                style={styles.input}
                placeholderTextColor={'#ffffff2d'}
                
                />
            </View>
           
        </View>

        {load &&(
            <Load/>
        )}

        {/*Histórico de agendamento */}
        <Modal visible={history}  transparent={true} animationType="fade">
           
            {load &&(
                <Load/>
            )}
            <FlatList
                data={appointmentHistory}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=> <ListAppointments appointment={item}/>}
            />
            <ButtonDefault title="Voltar" onpress={()=>setHistory(false)}/>

        </Modal>


        {/*mostra o componente caso não tenha encontrado nenhum resultado na busca*/}
        {!foundClient &&(
            <View >
            <NotFound title="Nenhum Cliente encontrado"/>
            </View>
        )}
        

        {/*mostra resultados da busca pelo nome do cliente com agendamento marcado */}
       {search && customers.length > 0 &&(
            <View style={{alignSelf:'center', width:'90%'}}>
                <Text style={styles.titleResult}>Resultados encontrados</Text>
            
                {/*lista com os resultados encontrados */}
                <FlatList
                    data={customers}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item})=> <FindedCustomer user={item}/>}
                    scrollEnabled={false}

                />
            
            
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

