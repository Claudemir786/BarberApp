import { Text,StyleSheet,ScrollView, View, TextInput, Button } from "react-native";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker'
import Logo from "../../components/Logo";
import ButtonDefault from "../../components/Button";



export default function BusinessHours({navigation}){

     //função que inicia o horario em 00:00 para mostrar no botão quando carregar a pagina
    const createInitialTime = ()=>{
        const date = new Date();
        date.setHours(0,0,0,0);
        return date;
    }

    const [weekdayOpen,setWeekdayOpen] = useState(createInitialTime());
    const [weekdayClosed,setWeekdayClosed] = useState(createInitialTime());
    const [showPickerWeekdayOpen, setShowPickerWeekdayOpen] = useState(false);
    const [showPickerWeekdayClosed, setShowPickerWeekdayClosed] = useState(false);
    const [saturday,setSaturday] = useState(false);
    const [showPickerSaturdayOpen, setShowPickerSaturdaOpen] = useState(false);
    const [showPickerSaturdayClosed, setShowPickerSaturdaClosed] = useState(false);
    const [saturdayOpen, setSaturdayOpen] = useState(createInitialTime());
    const [saturdayClosed, setSaturdayClosed] = useState(createInitialTime());

   

    //picker de horaios de horario de funcionamento
    const handleWeekdayOpen = (event, selectedTime) =>{
        setShowPickerWeekdayOpen(false);
        if(selectedTime){
            setWeekdayOpen(selectedTime)
        }
    }
    const handleWeekdayClosed = (event, selectedTime) =>{
        setShowPickerWeekdayClosed(false);
        if(selectedTime){
            setWeekdayClosed(selectedTime)
        }
    }
    const handleSaturdayOpen = (event,selectedTime) =>{
        setShowPickerSaturdaOpen(false);
        if(selectedTime){
            setSaturdayOpen(selectedTime)
        }
    }
    const handleSaturdayClosed = (event,selectedTime)=>{
        setShowPickerSaturdaClosed(false);
        if(selectedTime){
            setSaturdayClosed(selectedTime);
        }
    }
    
    
    

    return(

        <ScrollView style={styles.container}>
            <View style={{marginTop:'30%', width:'90%',alignSelf:'center'}}>
                <Logo/>
            </View>
    
                {/*corpo da página*/}
            <View style={{width:'90%', alignSelf:'center', marginTop:'10%', marginBottom:'30%'}}>    
                <Text style={styles.title}>Horario de funcionamento</Text>
                <Text style={styles.subtitle}>Por favor preencha os dados de horario de funcionamento</Text>

                <View style={styles.card}>                
                    <Text style={styles.label}>Horário de segunda a sexta</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <View style={{width:'40%'}}>
                                <ButtonDefault title={weekdayOpen.toLocaleTimeString("pt-BR",{
                                        hour:"2-digit",
                                        minute:"2-digit"
                                    })} 
                                    textColor="#000" 
                                    onpress={()=>setShowPickerWeekdayOpen(true)}
                                    />
                                
    
                            </View>
                        
                    
                        {showPickerWeekdayOpen &&(
                            <DateTimePicker
                                value={weekdayOpen}
                                mode="time"
                                is24Hour={true}
                                onChange={handleWeekdayOpen}
                            />
                        )}

                        <View style={{width:'40%'}}>
                            <ButtonDefault title={weekdayClosed.toLocaleTimeString("pt-BR",{
                                        hour:"2-digit",
                                        minute:"2-digit"
                                    })} textColor="#000" 
                                    onpress={()=>setShowPickerWeekdayClosed(true)}
                                    />
                            
                        
                        </View>   
                                        
                        {showPickerWeekdayClosed &&(
                            <DateTimePicker
                                value={weekdayClosed}
                                mode="time"
                                is24Hour={true}
                                onChange={handleWeekdayClosed}
                            />
                        )}
                    </View>
                </View>
                 <View style={{marginBottom:'5%'}}></View>    
                <View style={styles.card}>                

                    <Text style={styles.label}>Abre aos sabádos?</Text>
                    <ButtonDefault title="Sim" textColor="#000" onpress={()=>setSaturday(true)}/>
                    <View style={{marginBottom:'5%'}}></View>    

                    {saturday &&(
                        
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <View style={{width:'40%'}}>
                                <ButtonDefault title={saturdayOpen.toLocaleTimeString("pt-BR",{
                                    hour:"2-digit",
                                    minute:"2-digit"
                                })} textColor="#000" 
                                onpress={()=>setShowPickerSaturdaOpen(true)} 
                                />
                               
                               
                            </View>                            
                              
                            {showPickerSaturdayOpen &&(
                                <DateTimePicker
                                    value={saturdayOpen}
                                    mode="time"
                                    is24Hour={true}
                                    onChange={handleSaturdayOpen}
                                />
                            )}

                            <View style={{width:'40%'}}>
                                <ButtonDefault title={saturdayClosed.toLocaleTimeString("pt-BR",{
                                    hour:"2-digit",
                                    minute:"2-digit"
                                })} textColor="#000" 
                                onpress={()=>setShowPickerSaturdaClosed(true)} 
                                />
                                
                            </View>
                            
                                
                                {showPickerSaturdayClosed &&(
                                    <DateTimePicker
                                        value={saturdayClosed}
                                        mode="time"
                                        is24Hour={true}
                                        onChange={handleSaturdayClosed}
                                    />
                                )}

                        </View>
                    
                    )}    
                </View>        
                <View style={{marginTop:'10%'}}>
                    <ButtonDefault color="#000" textColor="#D4AF37"/>
                </View>

            </View>            
           
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#000"
    },
    title:{
        color:"#fff",
        fontFamily:'san-serif',
        fontSize:40,
        fontWeight:'bold',
        marginBottom:'5%'
    },
    subtitle:{
        color:'#797377',
        fontSize:17,
        marginBottom:'10%'
    },
    label:{
        color:"#fff",
        fontSize:20,
        marginBottom:'3%'
    },
    hours:{
        color:'#fff',
        fontSize:16
    },
    card:{
       backgroundColor:"#18181B",
       padding:20,
       borderRadius:10,
       borderWidth:1,
       borderColor:'#ffffff2d'    
        
    }
})