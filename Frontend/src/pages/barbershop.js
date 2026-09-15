import {Text,View,StyleSheet,TouchableOpacity, ScrollView, Modal,FlatList} from 'react-native'
import HeaderLogo from '../components/Header'
import Feather from '@expo/vector-icons/Feather';
import ButtonDefault from '../components/Button';
import { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { useRoute } from '@react-navigation/native';
import { availableServicesBarbershop, getBarberFromBarbershop, infoBarbershop } from '../service/BarbeshopService';



export default function Barbershop({navigation}){

    const [stepOne,setStepOne]= useState(false)
    const [stepTwo,setStepTwo]= useState(false)
    const [stepThree,setStepThree]= useState(false)
    const [selectedDate, setSelectedDate] = useState(null);
    const [services,setServices] = useState([]);
    const [barbers,setBarbers] = useState([]);
    const [barbershop,setBarbershop] = useState([]);

    const route = useRoute();
    const id = route.params.id;
    //console.log("id recebido: ", id);

    useEffect(()=>{
        getInfoBarbershop();
        getBarber();
        getServices();
    },[]);

    //buscar dados da barbaria,serviços e profissionais;
    async function getInfoBarbershop(){
        try {
            const info = await infoBarbershop(id)

            if(info){
               
                setBarbershop(info[0])
            }else{
                console.warn("Dados não retornaram")
            }
            
        } catch (error) {
            console.error("Dados da barbearia não chagaram na página: ", error);
        }

    }

    async function getBarber(){
        try {
            const listBarbers = await getBarberFromBarbershop(id);

            if(listBarbers){
                console.log("barbers: ", barbers)
                setBarbers(listBarbers)

            }else{
                console.warn("Dados de barbeiros cadastrados não encontrados")
            }
            
        } catch (error) {
            console.error("Informações de barbeiros não chegaram na página: ", error)
        }
    }

    async function getServices() {
        try {
            const listServices = await availableServicesBarbershop(id);            
            if(listServices){
               
                setServices(listServices)

            }else{
                console.warn("Serviços não chegaram na página")
            }
            
        } catch (error) {
            console.error("Lista de servuços disponiveis não chegaram na página: ", error);
        }
    }



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

      {/*Card com os serviços */}
    function Services({serviceBabershop}){
        return(
            <>
                 <View style={styles.card}>
                    <View style={{alignSelf:'center', width:'90%'}}>
                        <View style={styles.viewService}>
                            <View>
                                <Text style={styles.serviceName}>{serviceBabershop.title}</Text>
                                <Text style={styles.timeService}>{serviceBabershop.duration_minutes} min</Text>
                            </View>
                            <View>
                                <Text style={styles.priceService}>R$ {serviceBabershop.price}</Text>
                            </View>
                        </View>
                    </View>
                     
                    </View>
            </>
        )
    }

    function Barbers({barber}){
        return(
            <>

                <View style={styles.card}>

                        <View style={{alignSelf:'center', width:'90%'}}>
                            <View style={{flexDirection:'row'}}>
                                {/*Icone */}
                                <View style={styles.iconBarber}>
                                    <Feather name="user" size={24} color="#fff" />
                                </View>
                                <View style={styles.viewService}>
                                    <View>
                                        <Text style={[styles.serviceName, {marginTop:'10%'}]}>{barber.name}</Text>
                                        <Text style={{color:"#ffffff2d", fontSize:15}}>Barbeiro</Text>
                                    </View>
                                </View>
                            </View>
                        
                        </View>

                </View>        
                
            </>
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
                            {barbershop.name}
                        </Text>
                        
                        <View style={{flexDirection:'row'}}>
                            <View style={{marginTop:'1.5%'}}>
                                <Feather name="map-pin" size={16} color="#797377" />
                            </View>                        
                            <Text style={{color:'#797377',fontSize:16, marginLeft:'2%'}}>
                            {barbershop.address}
                            </Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <View style={{marginTop:'1.5%'}}>
                                <Feather name="phone" size={16} color="#797377" />
                            </View>                        
                            <Text style={{color:'#797377',fontSize:16, marginLeft:'2%'}}>
                            {barbershop.contact_phone}
                            </Text>
                        </View>
                        
                    
                    
                    </View>                    
                
                </View>

                <View style={{width:'90%', alignSelf:'center'}}>
                    <Text style={styles.titleCard}>Serviços</Text>
                </View>

                 {/*Renderiza os serviços */}   
                <FlatList
                    data={services}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item})=> <Services serviceBabershop={item}/>}
                    scrollEnabled={false}
                />

                {/*barbeiros */}
                <View style={{width:'90%', alignSelf:'center'}}>
                    <Text style={styles.titleCard}>Profissionais</Text>
                </View>

                {/*Renderiza os barbeiros */}                         
                <FlatList
                    data={barbers}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item})=> <Barbers barber={item}/>}
                    scrollEnabled={false}
                />
              

            </ScrollView>
            <View style={{width:'90%', alignSelf:'center', marginBottom:'5%'}}>
                  <ButtonDefault title='Agendar Agora' onpress={()=>setStepOne(true)} />
                  
            </View>

            

            {/*passo 1*/}
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
            
            {/*passo 2*/}
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

            {/*passo 3*/}
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
        borderColor:'#ffffff2d',
        marginBottom:"5%"
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