
import {Text,View,TouchableOpacity,StyleSheet,FlatList} from 'react-native'
import Feather from '@expo/vector-icons/Feather';

export default function CardAppointment({itemAppointment}){
    return(
            <>
            {/*view que mostra horario marcado*/}
            <View style={styles.cardAppointment}>

                <View style={styles.titleCardAppointment}>

                    <Text style={{color:'#D4AF37',fontSize:15,fontWeight:'600'}}>
                        PRÓXIMO HORÁRIO
                    </Text>
                    
                </View>
                
                <View style={styles.informationAppointment}>

                    {/*Icone */}   
                    <View style={styles.iconAppointment}>
                        <Feather name="scissors" size={26} color="#D4AF37" />
                    </View>
                    {/*informações do agendamento */}
                    <View style={{flexDirection:'column'}}>
                        <Text style={styles.titleCard}>
                            {itemAppointment.barbershop}
                        </Text>
                        <Text style={{color:'#797377',fontSize:15}}>
                            {itemAppointment.service_name}
                        </Text>
                        <View style={styles.hourAppointment}>
                            <Feather name="clock" size={20} color="#d4af37" />
                            <Text style={{color:'#fff',fontSize:14}}> {itemAppointment.appointment_time.slice(0,5)}</Text>
                        </View>
                    </View>

                </View>

            </View>
       </>             
    )
}

const styles = StyleSheet.create({
    cardAppointment:{
        backgroundColor:'#18181B',        
        borderRadius:10,
        width:'90%',
        alignSelf:'center' 
    },
    titleCardAppointment:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'90%', 
        alignSelf:'center',
        marginTop:'5%'
    },
    iconAppointment:{
        marginRight:'5%',
        height:40,
        width:40,
        backgroundColor:'#d4af376c',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    informationAppointment:{
        flexDirection:'row',
        width:'90%', 
        alignSelf:'center',
        marginTop:'5%',
    },
    hourAppointment:{
        flexDirection:'row',
        marginTop:'5%',
        marginBottom:'10%',       
        backgroundColor:'#79737754',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        width:'40%'
    },
    titleCard:{
        color:"#fff",
        fontWeight:'500',
        fontSize:18
    },
})