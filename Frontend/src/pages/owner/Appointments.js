import { Text, View,ScrollView,StyleSheet, TouchableOpacity, Modal, ActivityIndicator, FlatList} from "react-native";
import Logo from "../../components/Logo";
import Feather from '@expo/vector-icons/Feather';
import { Calendar } from 'react-native-calendars';
import { useEffect, useState } from "react";
import { readAppointmentsBydate } from "../../service/BarbeshopService";
import { GetUserBarbershop } from "../../service/SecureStore";
import NotFound from "../../components/NotFound";
import Load from "../../components/Load";
import ListAppointments from "../../components/ListAppointments";


export default function OwnerAppointments({navigation}){

     const [selectedDate, setSelectedDate] = useState(new Date());       
     const [calendar,setCalendar] = useState(false);
     const [appointments,setAppointments] = useState([]);
     const [findded,setFindded] = useState(true);
     const [load,setLoad] = useState(true);
     useEffect(()=>{
        
        handleAppointments()

     },[selectedDate])  

     async function handleAppointments(){
        try {
            let result = [];
            let barbershopId = await GetUserBarbershop();
            let formattedDate = 0;
            
            //condição que verifica se o dia seleionado ja está formatado como string quando escolhido pelo calendario ou se está 
            //no tipo objeto que é quando a pagina inicia com a data atual e fica nesse formato
            if(typeof selectedDate === "object"){
                formattedDate = selectedDate.toISOString().split("T")[0];
            }else{
                formattedDate = selectedDate;
            }
           
            console.log("data de hoje: ", formattedDate)
            result = await readAppointmentsBydate(barbershopId.id,formattedDate);            
            
            //verifica se o foram encontrados a lista de agendamentos 
            if(result.length > 0){
                setAppointments(result);
                setLoad(false);//para o carregamento
                setFindded(true);
                console.log("resultados da busca: ", result);

            }else{
                console.error("dados não chegaram na página");
                setFindded(false);
                setLoad(false)//para o carregamento
                setAppointments([]);
            }
             
            
        } catch (error) {
            console.error("Erro ao retornar os dados de agendamentos do dia");
            setLoad(false);//para o carregamento
        }
     }

    //calendario
    function CalendarScreen(){
        const today = new Date().toISOString().split("T")[0];
        return(
            <Calendar
            minDate={today}
            theme={{
                backgroundColor:'#18181B',
                calendarBackground:"#18181B",
                textSectionTitleColor:"#D4AF37",
                dayTextColor:'#D4AF37',
                 textDisabledColor: "#ffffff2d"
            }}
            onDayPress={(day)=>{
                console.log("data calendario: ", day.dateString)
                setSelectedDate(day.dateString);
                setCalendar(false);
            }}
            />
        )
    }



    return(
        <View style={styles.container}>
            <View style={{marginTop:"15%", width:'90%', alignSelf:'center'}}>
                <Logo/>
            </View>

           
            <View style={{borderBottomWidth:1,borderColor:'#ffffff5e', width:'100%',marginTop:'5%'}}></View>

            <ScrollView>
                <View style={{flexDirection:'row', alignSelf:'center', width:'90%'}}>
                    <Text style={styles.title}>Agenda</Text>
                    <TouchableOpacity style={styles.button} onPress={()=>setCalendar(true)}>
                        <Feather name="calendar" size={15} color="#000" />
                        <Text style={{color:"#000"}}>Dia</Text>
                    </TouchableOpacity>
                </View>

                    <Modal visible={calendar}  transparent={true} animationType="fade">
                        <View style={styles.overlay}>
                            <View style={styles.modal}>
                                 <CalendarScreen/>
                            </View>
                        </View>
                       
                    </Modal>  

                {/*se não forem encontrados dados de agendamentos mostra a menssagem */}
                {!findded &&(
                    <>
                        <NotFound title="Não foram encontrados agensamentos nessa data"/>
                    </>
                )}
                
                {load&&(
                    <Load/>
                )}

                {appointments.length > 0 &&(
                    <FlatList
                        data={appointments}
                        keyExtractor={(item)=>item.id}
                        renderItem={({item})=> <ListAppointments appointment={item}/>}
                        scrollEnabled={false}
                        
                    />
                )}
                           
                    
                 
                
                
            </ScrollView>            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000'
    },
    appointment:{
        flexDirection:'row',
        width:'90%',
        alignSelf:'center',
        backgroundColor:'#18181B',
        padding:15,
        borderRadius:10,
        marginBottom:'5%'
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
    status:{
        fontSize:12,
        color:'#fff',
        fontWeight:'bold',
        
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
    title:{
        color:"#fff",
        marginTop:'10%',
        marginBottom:'5%',
        width:'90%',
        alignSelf:'center',
        fontSize:25,
        fontWeight:'bold',
        fontFamily:'san-serif'
    },
   button:{
    justifyContent:'center',
    backgroundColor:'#D4AF37',
    flexDirection:'row',
    borderRadius:10,
    height:35,
    alignItems:'center',
    alignSelf:'center',
    padding:10,
    marginTop:'2%'
   },
   overlay:{
    flex: 1,
    backgroundColor: '#000000c9',
    justifyContent: 'center',
    alignItems: 'center',
   },
   modal:{
    width: '90%',
    backgroundColor:'#18181B',
    padding: 20,
    borderRadius: 15,
   }
    



})