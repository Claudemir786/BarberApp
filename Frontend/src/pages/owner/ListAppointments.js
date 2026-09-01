import { StyleSheet, Text,View } from "react-native";
import HeaderLogo from "../../components/Header";
import Feather from '@expo/vector-icons/Feather';


export default function ListAppointments({navigation}) {
 
 
    return (
        <View style={styles.container}>

            <HeaderLogo/>

            <View style={{marginTop:'10%'}}></View>

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
                            <Text style={styles.status}>10/05/2026</Text>
                        </View>
                        
                        
                    </View>
                    {/*corte e preço*/}
                    <View style={styles.service}>
                        <Text style={styles.textService}>Corte Clássico  - Carlos Mendes</Text>
                        <Text style={styles.price}>R$ 35</Text>
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

})
