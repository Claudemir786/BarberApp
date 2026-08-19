import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Modal } from "react-native";
import HeaderLogo from "../components/Header.js";
import NotFound from "../components/NotFound.js";
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";
import ButtonDefault from "../components/Button.js";

export default function Appointments({navigation}){

    const [cancelAppointment, setCancelAppointment] = useState(false);

    return(
        <ScrollView style={styles.container}>
            <HeaderLogo/>
            {/*Titulo da pagina */}
            <View style={styles.viewTitle}>
                <Text style={styles.title}>Agendamentos</Text>
                <Text style={styles.subTitle}>Seus horários marcados e histórico</Text>
            </View>

            <View style={styles.check}>
                <View style={{height:37}}>
                    <Feather name="check-circle" size={23} color="#D4AF37" />
                </View>
                
                <Text style={[styles.subTitle, {fontWeight:"700",marginLeft:'2%',textAlign:'center'}]}>EM VIGOR</Text>
            </View>

            <Modal visible={cancelAppointment} transparent={true} animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={{color:"#fff", fontSize:25, textAlign:'center', fontWeight:'400'}}>
                            Tem certeza que deseja cancelar o agendamento?
                        </Text>
                        <View style={{marginTop:'5%'}}></View>
                        <ButtonDefault title="Sim"/>
                        <View style={{marginTop:'5%'}}></View>
                        <ButtonDefault title="Não" color="#000" onpress={()=>setCancelAppointment(false)}/>
                    </View>
                </View>               

            </Modal>
            <View style={styles.cardAppointment}>
                <View style={styles.status}>
                    <Text style={{color:'green', fontSize:18,fontWeight:'bold'}}>Confirmado</Text>
                </View>
                
                <View style={styles.informationAppointment}>

                    {/*Icone */}   
                    <View style={styles.iconAppointment}>
                        <Feather name="scissors" size={26} color="#D4AF37" />
                    </View>
                    {/*informações do agendamento */}
                    <View style={{flexDirection:'column'}}>
                       
                     
                        <Text style={styles.titleCard}>
                            Barbearia Dom Pedro
                        </Text>
                          
                        
                        <Text style={{color:'#797377',fontSize:15}}>
                            com Carlos - Corte + barba
                        </Text>
                       
                        <View style={styles.hourAppointment}>
                            <Feather name="clock" size={20} color="#d4af37" />
                            <Text style={{color:'#fff',fontSize:14}}> 10:00</Text>

                            <Text style={{fontSize:14,color:"#fff", marginLeft:'5%', fontWeight:'bold'}}>R$ 50,00</Text>
                        </View>
                    </View>                    

                </View>

                <View style={styles.viewButton}>
                    <TouchableOpacity 
                    style={styles.button}
                    onPress={()=> setCancelAppointment(true)}
                    >
                        <Text style={[styles.textButton,{borderStartWidth:0}]}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.textButton}>Ver barbearia</Text>
                    </TouchableOpacity>
                </View>     
            </View>
            {/*<NotFound title="Não foi encontrado nenhum agendamento ativo"/>*/}

            <TouchableOpacity style={styles.buttonHistory}>
                <Text style={{color:'#fff',fontSize:15}}>Histórico de atendimentos</Text>
                <Feather name="chevron-right" size={24} color="#fff" />
            </TouchableOpacity>

            

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#000"
    },
    viewTitle:{
        width:"90%",
        alignSelf:"center",
        marginTop:"10%"
    },
    title:{
        color:"#fff",
        fontSize:30,
        fontFamily:'san-serif',
        fontWeight:'500'
    },
    subTitle:{
        color:"#797377",
        fontSize:17,
        marginTop:'3%',
        marginBottom:'5%'
    },
    check:{
        flexDirection:'row',
        width:'90%',
        alignSelf:'center',
        alignItems:'center'
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
    titleCard:{
        color:"#fff",
        fontWeight:'500',
        fontSize:18
    },
    hourAppointment:{
        flexDirection:'row',
        marginTop:'5%',
        marginBottom:'10%',                                 
    },
    cardAppointment:{
        backgroundColor:'#18181B',        
        borderRadius:10,
        width:'90%',
        alignSelf:'center' ,
        borderWidth:1,
        borderColor:"#ffffff48"
    },
    status:{
        width:'90%',
        alignSelf:'center',
        marginTop:"5%"
    },
    button:{
        width:'50%',
        borderStartWidth:1,
        borderColor:'#ffffff48',
        padding:10
      
    },
    textButton:{
        color:'#fff',
        fontSize:15,
        textAlign:'center',

    },
    viewButton:{
        flexDirection:'row',
        width:'100%', 
        alignSelf:'center',       
        borderColor:'#ffffff48',       
        borderTopWidth:1,
        borderBottomEndRadius:10,
        borderBottomStartRadius:10
    },
    buttonHistory:{
        flexDirection:'row',
        width:'90%',
        alignSelf:'center',
        marginTop:'5%',
        backgroundColor:"#18181B",
        borderRadius:10,
        borderWidth:1,
        borderColor:"#ffffff48",
        justifyContent:'space-between',
        padding:15


    },
      overlay: {
        flex: 1,
        backgroundColor: '#ffffff25',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modal: {
        width: '90%',
        backgroundColor: '#18181B',
        padding: 20,
        borderRadius: 15,
    },
   
})