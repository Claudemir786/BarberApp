import { StyleSheet, Text,View } from "react-native";

import Feather from '@expo/vector-icons/Feather';


export default function ListAppointments({appointment}) {


    
        //divide a data em 3
    const [year, month, day] = appointment?.appointment_date.split("-") || [];
    
    //dividi a hoa recebida em 3 também

    const [hour, minute, second] = appointment?.appointment_time.split(":") || [];
    
    

    return (
        <View style={styles.container}>

           
           {/*Agendamentos*/}
            <View style={styles.appointmentS}>

                {/*horarios*/}
                <View style={styles.hour}>
                    <Feather name="clock" size={20} color="#D4AF37" />
                    <Text style={styles.textHour}>{hour}:{minute}</Text>
                </View>
                <View style={{borderLeftWidth:1,borderColor:'#ffffff2d', width:'90%'}}>
                    {/*nome do cliente e status*/}
                    <View style={styles.nameStatus}>
                        <Text style={styles.name}>{appointment?.customer}</Text>
                        <View>
                            <Text style={styles.status}>{day[0]}{day[1]}/{month}/{year}</Text>
                        </View>
                        
                        
                    </View>
                    {/*corte e preço*/}
                    <View style={styles.service}>
                        <Text style={styles.textService}>{appointment?.service_name} - {appointment?.barber}</Text>
                        <Text style={styles.price}>R$ {appointment?.price.split(".")[0]},00</Text>
                    </View>

                </View>                    
                
            
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000',
        flex:1
    },
    appointmentS:{
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

})
