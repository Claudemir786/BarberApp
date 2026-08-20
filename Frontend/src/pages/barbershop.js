import {Text,View,StyleSheet,TouchableOpacity, ScrollView} from 'react-native'
import HeaderLogo from '../components/Header'
import Feather from '@expo/vector-icons/Feather';
import ButtonDefault from '../components/Button';



export default function Barbershop({navigation}){
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
                  <ButtonDefault title='Agendar Agora'/>
            </View>
          
            
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
    }
    
  
})