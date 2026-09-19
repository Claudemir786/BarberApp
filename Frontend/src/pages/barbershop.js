import {Text,View,StyleSheet,TouchableOpacity, ScrollView, Modal,FlatList} from 'react-native'
import HeaderLogo from '../components/Header'
import Feather from '@expo/vector-icons/Feather';
import ButtonDefault from '../components/Button';
import { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { useRoute } from '@react-navigation/native';
import { availableServicesBarbershop, getBarberFromBarbershop, infoBarbershop } from '../service/BarbeshopService';
import { getAvailableHoursDay, postAppointment} from '../service/UserService';
import '../config/calendarConfig'



export default function Barbershop({navigation}){

    const [stepOne,setStepOne]= useState(false);
    const [stepTwo,setStepTwo]= useState(false);
    const [stepThree,setStepThree]= useState(false);   
    const [stepFour,setStepFour] = useState(false); 
    const [services,setServices] = useState([]);
    const [barbers,setBarbers] = useState([]);
    const [barbershop,setBarbershop] = useState([]);
    const [hours,setHours] = useState([]);
    
    
    //Ids dos dados para agendamento
    const [serviceId,setServiceId] = useState("");
    const [hour,setHour] = useState("");
    const [barberId,setBarberId] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);

    //estados usados para mostrar na etapa final antes do agendamento
    const [chosenDate,setChosenDate] = useState("")
    const [chosenService,setChosenService] = useState("");
    const [chosenBarber,setChosenBarber] = useState("");
    const [chosenPrice,setChosenPrice] = useState("");


    const route = useRoute();
    //id da barbearia que é passado por parâmetro
    const id = route.params.id;
    //console.log("id recebido: ", id);

    useEffect(()=>{
        getInfoBarbershop();
        getBarber();
        getServices();
    },[]);


    //FUNÇÕES DE BUSCA E MANIPULAÇÃO DE DADOS

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

    async function handleAvailableTime(date){
        try {
            console.log("data escolhida: ", date);
           const getChosenDate = new Date(date);
            setChosenDate(getChosenDate.toLocaleDateString('pt-BR'))
            console.log(getChosenDate)
            
            const getHours = await getAvailableHoursDay(date,id,barberId);

            if(getHours){
                console.log(getHours);
                setHours(getHours);
            }else{
                setHours([]);
                console.log("horarios disponiveis não chegaram na página");
            }
            
        } catch (error) {
            console.error("falha ao verificar horários disponíveis")
        }

    }

    async function  handleCreateAppointment(){
       
        try {            
            
            const createAppointment = await postAppointment(id,serviceId,barberId,selectedDate,hour)
           
            if(createAppointment){
                alert("agendamento criado com sucesso");
                setStepFour(false);
                setSelectedDate(null);
                setHour("");

            }else{
                console.warn("o agendamento não foi criado")
            }
            
        } catch (error) {
            console.error("Falha ao criar agendamento: ", error);
        }
        
    }


    //COMPONENTES UTILIZADOS PARA MOSTRAR RESULTADPS DE AÇÕES NA PÁGINA

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
                 textDisabledColor: "#ffffff2d",
                

            }}
            onDayPress={(day)=>{
                setSelectedDate(day.dateString);
                handleAvailableTime(day.dateString);
            }}
              markedDates={{
                [selectedDate]: {
                selected: true,
                selectedColor: '#D4AF37',
                selectedTextColor: '#18181B',
        }
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

    //componente que rederiza os serviços na modal
    function StepOneButtonsServices({itemService}){
        return(
            <>
                <TouchableOpacity 
                onPress={()=>{
                    setServiceId(itemService.id);
                    setChosenPrice(itemService.price)
                    setChosenService(itemService.title)
                    setStepTwo(true);
                    setStepOne(false);

                }
                }
                style={styles.buttonModal}
                >
                    <View>
                        <Text style={styles.nameButtonModal}>{itemService.title}</Text>
                        <Text style={styles.timeButtonModal}>{itemService.duration_minutes} min</Text>
                    </View>
                    <View>
                        <Text style={styles.nameButtonModal}>R${itemService.price}</Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    //componente que renderiza os barbeiros dentro da modal
    function StepTwoButtonBarbers({itemBarber}){
        return(
            <>
                <TouchableOpacity style={styles.buttonModalBarber} 
                onPress={()=>{
                    setStepThree(true);
                    setStepTwo(false);
                    setBarberId(itemBarber.id);
                    setChosenBarber(itemBarber.name);
                    }}>       
                    <View>
                        <Text style={styles.nameButtonModal}>{itemBarber.name}</Text>
                        <Text style={styles.timeButtonModal}>Barbeiro</Text>
                    </View>                  
                </TouchableOpacity>
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
            <View style={{width:'90%', alignSelf:'center', marginBottom:'15%'}}>
                  <ButtonDefault title='Agendar Agora' onpress={()=>setStepOne(true)} />
                  
            </View>

            

            {/*passo 1*/}
            <Modal visible={stepOne} transparent={true} animationType='fade'>
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.titleModal} >Agendar Horário</Text>
                        <Text style={styles.subtitleModal}>Escolher o serviço desejado</Text>
                        
                        <FlatList
                            data={services}
                            keyExtractor={(item)=> item.id}
                            renderItem={({item})=> <StepOneButtonsServices itemService={item}/>}
                            
                        />                        

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

                        <FlatList
                            data={barbers}
                            keyExtractor={(item)=>item.id}
                            renderItem={({item})=> <StepTwoButtonBarbers itemBarber={item}/>}
                        />

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
                        {selectedDate && hours && (
                        <View style={{width:"90%", alignSelf:'center'}} >
                            <Text style={{color:"#fff", fontSize:15, marginBottom:'3%'}}>Horários disponíveis: </Text>
                            <View style={{flexDirection:'row', flexWrap: 'wrap', alignSelf:'center', width:'90%'}}>
                                 {hours.map((h) => (
                                <TouchableOpacity 
                                key={h} 
                                onPress={()=>{
                                    setHour(h)

                                }}
                                
                                style = {hour === h ? styles.hSelected : styles.hDefault}
                                >
                                    <Text style={{textAlign:'center', color:'#fff'}} >{h.slice(0,5)}</Text>
                                </TouchableOpacity>
                            ))}
                       
                            </View>
                           
                        </View>
                        
                        )}
                        
                        {/*Se não tiver horarios disponiveis para esse dia */}
                         {hours == ""  &&(                           
                            <>
                                <View>
                                    <Text style={{color:'#fff', fontSize:15, textAlign:'center'}}>Sem horarios disponiveis</Text>
                                </View>
                            </>
                            
                            
                        )}    
                      
                        <View style={{marginTop:'5%'}}></View>
                        <ButtonDefault title='Próximo' onpress={()=>{
                            setStepThree(false);
                            setStepFour(true);
                        }}/>
                    </View>
                </View>
                
            </Modal>

            {/*PASSO 4 */}
            <Modal visible={stepFour} transparent={true} animationType='fade'>
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.titleCard}>Dados do Agendamento:</Text>

                        <View style={[styles.card,{padding:10}]}>
                            <Text style={[styles.serviceName, {fontWeight:'400'}]}>Serviço: {chosenService}</Text>
                            <Text style={[styles.serviceName, {fontWeight:'400'}]}>Barbeiro: {chosenBarber}</Text>
                            <Text style={[styles.serviceName, {fontWeight:'400'}]}>Preço: R${parseInt(chosenPrice)},00</Text>
                            <Text style={[styles.serviceName, {fontWeight:'400'}]}>Dia: {chosenDate}</Text>
                            <Text style={[styles.serviceName, {fontWeight:'400'}]}>Horario: {hour.slice(0,5)}</Text>
                        </View>

                        <View style={{width:'90%', alignSelf:'center'}}>
                            <TouchableOpacity
                                style={styles.buttonCancel}
                                onPress={()=>{
                                    setStepFour(false)
                                }}
                            >
                                <Text style={styles.textButton}>Cancelar</Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.buttonConfirmAppointment, {marginTop:'3%'}]}
                                onPress={handleCreateAppointment}
                            >
                                <Text style={styles.textButton}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                        
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
    },
    hSelected:{
        backgroundColor:'#D4AF37',
        borderRadius:10,
        padding:5,
        marginLeft:'2%',
        borderWidth:1,
        borderColor:'#27272A',
        marginBottom:'3%'

    },
    hDefault:{
        borderRadius:10,
        padding:5,
        marginLeft:'2%',
        borderWidth:1,
        borderColor:'#27272A',
        marginBottom:'3%'
    },
    buttonConfirmAppointment:{
        borderWidth:1,
        padding:12,
        borderRadius:10,
        borderColor:'#f7f7f73d',
        backgroundColor:'#D4AF37'


   },
    buttonCancel:{
        borderWidth:1,
        padding:12,
        borderRadius:10,
        borderColor:'#f7f7f73d',
        backgroundColor:'#000'
   },
    textButton:{
        fontSize:20,
        textAlign:'center',
        fontWeight:'500',
        color:"#fff"
   },
    
   
    
    
  
})