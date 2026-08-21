import {Text,View,StyleSheet,TouchableOpacity, ScrollView, Modal} from 'react-native'
import HeaderLogo from '../components/Header'
import Feather from '@expo/vector-icons/Feather';
import ButtonDefault from '../components/Button';
import { useState } from 'react';
import { Calendar } from 'react-native-calendars';



export default function Barbershop({navigation}){

    const [stepOne,setStepOne]= useState(false)
    const [stepTwo,setStepTwo]= useState(false)
    const [stepThree,setStepThree]= useState(false)
    const [selectedDate, setSelectedDate] = useState(null);


    const horarios = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "14:00",
    "14:30",
    "15:00",
    "15:30"
];
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
            }}
            />
        )
    }

    return(
        <View style={styles.container}>
            <HeaderLogo/>
            <ScrollView>
                {/*informações da barbearia */}
                <View style={styles.informationBarbershop}>
                
                    {/*Icone */}   
                    <View style={styles.iconBarbershop}>
                        <Feather name="scissors" size={35} color="#D4AF37" />
                    </View>
                    
                    <View style={{flexDirection:'column', margin:'5%', marginLeft:0}}>
                    
                    
                        <Text style={styles.titleBarbershop}>
                            Barbearia Dom Pedro
                        </Text>
                        
                        <View style={{flexDirection:'row'}}>
                            <View style={{marginTop:'1.5%'}}>
                                <Feather name="map-pin" size={16} color="#797377" />
                            </View>                        
                            <Text style={{color:'#797377',fontSize:16, marginLeft:'2%'}}>
                            Rua das /palmeiras, 142 - centro
                            </Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <View style={{marginTop:'1.5%'}}>
                                <Feather name="phone" size={16} color="#797377" />
                            </View>                        
                            <Text style={{color:'#797377',fontSize:16, marginLeft:'2%'}}>
                            43998652315
                            </Text>
                        </View>
                        
                    
                    
                    </View>                    
                
                </View>

                <View style={{width:'90%', alignSelf:'center'}}>
                    <Text style={styles.titleCard}>Serviços</Text>
                </View>

                {/*Card com os serviços */}
                <View style={styles.card}>
                    <View style={{alignSelf:'center', width:'90%'}}>
                        <View style={styles.viewService}>
                            <View>
                                <Text style={styles.serviceName}>Corte Clássico</Text>
                                <Text style={styles.timeService}>30 min</Text>
                            </View>
                            <View>
                                <Text style={styles.priceService}>R$ 35</Text>
                            </View>
                        </View>
                    </View>
                     {/*View que é somente uma linha para separar os dois componentes */}
                    <View style={{ borderBottomWidth:1,borderColor:"#ffffff2d",}}></View>

                        <View style={{alignSelf:'center', width:'90%'}}>
                            <View style={styles.viewService}>
                                <View>
                                    <Text style={styles.serviceName}>Corte + Barba</Text>
                                    <Text style={styles.timeService}>60 min</Text>
                                </View>
                            
                                <View>
                                    <Text style={styles.priceService}>R$ 60</Text>
                                </View>
                            </View>
                       

                        </View>
                          {/*View que é somente uma linha para separar os dois componentes */}
                         <View style={{ borderBottomWidth:1,borderColor:"#ffffff2d",}}></View>

                        <View style={{alignSelf:'center', width:'90%'}}>
                            <View style={styles.viewService}>
                                <View>
                                    <Text style={styles.serviceName}>Barba Completa</Text>
                                    <Text style={styles.timeService}>30 min</Text>
                                </View>
                                <View>
                                    <Text style={styles.priceService}>R$ 25</Text>
                                </View>
                            </View>
                    
                        </View>
                        
                       
                   
                </View>
                

                {/*barbeiros */}
                <View style={{width:'90%', alignSelf:'center'}}>
                    <Text style={styles.titleCard}>Profissionais</Text>
                </View>

                <View style={[styles.card, {marginBottom:'10%'}]}>

                    <View style={{alignSelf:'center', width:'90%'}}>
                        <View style={{flexDirection:'row'}}>
                             {/*Icone */}
                            <View style={styles.iconBarber}>
                                <Feather name="user" size={24} color="#fff" />
                            </View>
                            <View style={styles.viewService}>
                                 <View>
                                     <Text style={[styles.serviceName, {marginTop:'10%'}]}>Carlos da Silva</Text>
                                     <Text style={{color:"#ffffff2d", fontSize:15}}>Barbeiro</Text>
                                </View>
                            </View>
                        </View>
                       
                    </View>

                    {/*View que é somente uma linha para separar os dois componentes */}
                    <View style={{ borderBottomWidth:1,borderColor:"#ffffff2d",}}></View>

                    <View style={{alignSelf:'center', width:'90%'}}>
                        <View style={{flexDirection:'row'}}>
                             {/*Icone */}
                            <View style={styles.iconBarber}>
                                <Feather name="user" size={24} color="#fff" />
                            </View>
                            <View style={styles.viewService}>
                                <View>
                                     <Text style={[styles.serviceName, {marginTop:'10%'}]}>Marcos Ribeiro</Text>
                                     <Text style={{color:"#ffffff2d", fontSize:15}}>Barbeiro</Text>
                                </View>
                               
                                
                            </View>
                        </View>
                       
                    </View>
                </View>               

              

            </ScrollView>
            <View style={{width:'90%', alignSelf:'center', marginBottom:'5%'}}>
                  <ButtonDefault title='Agendar Agora' onpress={()=>setStepOne(true)} />
                  
            </View>

            /*parte da modais que vão ser mostradas passo a passo */

            //passo 1//
            <Modal visible={stepOne} transparent={true} animationType='fade'>
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.titleModal} >Agendar Horário</Text>
                        <Text style={styles.subtitleModal}>Escolher o serviço desejado</Text>
                        <TouchableOpacity 
                        onPress={()=>setStepTwo(true)}
                        style={styles.buttonModal}
                        >
                            <View>
                                <Text style={styles.nameButtonModal}>Corte Degradê</Text>
                                <Text style={styles.timeButtonModal}>30 min</Text>
                            </View>
                            <View>
                                <Text style={styles.nameButtonModal}>R$50</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={()=>{
                            setStepTwo(true)
                            stepOne(false)
                        }}
                        style={styles.buttonModal}
                        >
                            <View>
                                <Text style={styles.nameButtonModal}>Corte Degradê</Text>
                                <Text style={styles.timeButtonModal}>30 min</Text>
                            </View>
                            <View>
                                <Text style={styles.nameButtonModal}>R$50</Text>
                            </View>
                        </TouchableOpacity>


                        <View style={{width:'50%', alignSelf:'center'}}>
                            <ButtonDefault title='Voltar' onpress={()=>setStepOne(false)}/>
                        </View>  
                    </View>
                    
                </View>                         

            </Modal>
            
            //passo 2//
            <Modal visible={stepTwo} transparent={true} animationType='fade'>
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.titleModal}>Agendar Horário</Text>
                        <Text style={styles.subtitleModal}>Ecolha um profissional</Text>
                        <TouchableOpacity style={styles.buttonModalBarber} onPress={()=>setStepThree(true)}>
                            
                            <View>
                                <Text style={styles.nameButtonModal}>Carlos Mendes</Text>
                                <Text style={styles.timeButtonModal}>Barbeiro</Text>
                            </View>                  
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonModalBarber} onPress={()=>setStepThree(true)}>
                            
                            <View>
                                <Text style={styles.nameButtonModal}>Carlos Mendes</Text>
                                <Text style={styles.timeButtonModal}>Barbeiro</Text>
                            </View>                  
                        </TouchableOpacity>

                        <View style={{width:'50%', alignSelf:'center'}}>
                            <ButtonDefault title='voltar' onpress={()=>{
                                setStepTwo(false)
                                setStepOne(false)
                                }}/>
                        </View>
                    </View>
                    

                </View>
            </Modal>

            //passo 4
            <Modal visible={stepThree} transparent={true} animationType='fade'>
                
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <CalendarScreen/>
                        {selectedDate && (
                        <View >
                            <Text>Horários disponíveis</Text>
                            <View style={{flexDirection:'row'}}>
                                 {horarios.map((horario) => (
                                <TouchableOpacity key={horario} >
                                    <Text >{horario}</Text>
                                </TouchableOpacity>
                            ))}
                            </View>
                           
                        </View>
)}
                    </View>
                </View>
                
            </Modal>

           
            
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000'
    },
    iconBarbershop:{
        marginRight:'5%',
        height:50,
        width:50,
        backgroundColor:'#d4af376c',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        margin:'5%'    
    },
    informationBarbershop:{
        flexDirection:'row',
        width:'90%', 
        alignSelf:'center',
        marginTop:'10%',
        backgroundColor:'#18181B',
        borderRadius:10,
        borderWidth:1,
        borderColor:"#ffffff2d",   
        

    },
    titleBarbershop:{
        color:"#fff",
        fontWeight:'600',
        fontSize:23,
        fontFamily:'san-serif',
        
    },
    titleCard:{
        color:"#fff",
        marginTop:"10%",
        fontFamily:'san-serif',
        fontSize:20,
        fontWeight:'600',
        marginBottom:'5%'

    },
    iconBarber:{
        backgroundColor:'#27272A',
        width:60,
        height:60,
        borderRadius:40,
        alignItems:'center',
        justifyContent:'center',
        marginTop:'5%',
        marginBottom:'5%',
        marginRight:'5%'
        
    },
    viewService:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:'5%',
        marginBottom:'5%',
         
       
    },
    serviceName:{
        color:"#fff",
        fontSize:16,
        fontWeight:'700',
       
    },
    timeService:{
        color:'#ffffff2d',
        fontWeight:'600'
       
    },
    priceService:{
        color:'#fff',
        fontWeight:'600',
        fontSize:16
        
    },
    card:{
        backgroundColor:'#18181B',
        width:'90%',
        alignSelf:'center',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#ffffff2d'
    },
    titleModal:{
        color:'#fff',
        fontFamily:'san-serif',
        fontSize:25,
        fontWeight:'bold'
    },
    subtitleModal:{
        color:"#797377",
        marginTop:'2%',
        marginBottom:'3%'
    },
    buttonModal:{
        
        marginBottom:'3%',
        borderWidth:1,
        borderColor:'#ffffff2d',
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:15
    },
    nameButtonModal:{
        color:'#fff',
        fontSize:16,
        fontWeight:'bold',
        
    },
    timeButtonModal:{
        color:"#797377",
        fontWeight:500
    },
   modal:{
    width: '90%',
    backgroundColor:'#18181B',
    padding: 20,
    borderRadius: 15,
        
    },
    overlay:{        
        flex: 1,
        backgroundColor: '#000000c9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonModalBarber:{
        flexDirection:'row',
        borderWidth:1,
        borderColor:'#ffffff2d',
        borderRadius:10,
        marginBottom:'3%',
        padding:15
    }
    
  
})