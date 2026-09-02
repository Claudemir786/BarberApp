import { Text, View,ScrollView,StyleSheet, TouchableOpacity, Modal} from "react-native";
import Logo from "../../components/Logo";
import Feather from '@expo/vector-icons/Feather';
import { Calendar } from 'react-native-calendars';
import { useState } from "react";


export default function OwnerAppointments({navigation}){

     const [selectedDate, setSelectedDate] = useState(null);
     const [calendar,setCalendar] = useState(false);

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
                setSelectedDate(day.dateString);
                setCalendar(false);
            }}
            />
        )
    }

    return(
        <View style={styles.container}>
            <View style={{marginTop:"10%"}}>
                <Logo/>
            </View>
            
            <View style={{borderBottomWidth:1,borderColor:'#ffffff5e', width:'100%',marginTop:'5%'}}></View>

            <ScrollView>
                <View style={{flexDirection:'row', alignSelf:'center', width:'90%'}}>
                    <Text style={styles.title}>Agenda de Hoje</Text>
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
                            <View>
                                <Text style={styles.status}>Status</Text>
                            </View>
                            
                            
                        </View>
                        {/*corte e preço*/}
                        <View style={styles.service}>
                            <Text style={styles.textService}>Corte Clássico  - Carlos Mendes</Text>
                            <Text style={styles.price}>R$ 35</Text>
                        </View>

                    </View>                    
                    
                 
                </View>
                
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
    height:30,
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