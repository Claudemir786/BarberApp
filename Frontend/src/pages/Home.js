import { ScrollView,Text, View, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import Logo from "../components/Logo";
import Feather from '@expo/vector-icons/Feather';
import InputDefault from "../components/Input";


export default function Home({navigation}){
    return(
        <View style={styles.container}>
            {/*cabeçalho da pagina*/}
            <View style={styles.header}>
                <Logo/>               
            </View>
             <View style={{borderBottomWidth:1,borderColor:'#ffffff5e', width:'100%',marginTop:'5%'}}></View>

            {/*Corpo da pagina*/}
            <ScrollView style={styles.body}>
                <View style={styles.title}>
                    <Text style={{color:'#fff',fontSize:28,fontFamily:'san-serif'}} >
                    Olá usuário
                    </Text>

                </View>
            
                {/* view que mostra horario marcado*/}
                <View style={styles.cardAppointment}>

                    <View style={styles.titleCardAppointment}>

                        <Text style={{color:'#D4AF37',fontSize:15,fontWeight:'600'}}>
                            PRÓXIMO HORÁRIO
                        </Text>
                        <TouchableOpacity>
                            <Text style={{color:'#797377'}}>Ver Todos</Text>
                        </TouchableOpacity>
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
                            </View>
                        </View>

                    </View>

                </View>

                {/*Busca*/}
                <View style={styles.search}>
                    <Text style={styles.searchTitle}>
                        Barbearias Próximas
                    </Text>                  
                        
                        <InputDefault 
                        placeholder={'buscar barbearias' }                                          
                        />                   
                    
                </View>
                
                {/*cards de barbearias */}
                <View style={styles.cardBarbershop}>
                    <TouchableOpacity style={{width:'90%', alignSelf:'center',marginTop:'5%',marginBottom:'5%'}}
                        onPress={()=> navigation.navigate("Barbershop")}
                    >
                        {/*Nome da barbearia*/}
                        <Text style={[styles.titleCard,{marginBottom:'1%'}]}>
                            Barbearia Dom Pedro
                        </Text>

                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{fontSize:15,color:'#797377',}}>Londrina-PR</Text>
                            <Text style={{fontSize:15,color:'#797377'}}>a partir de</Text>
                        </View>
                            <Text style={[styles.titleCard,{textAlign:'right'}]}>R$ 35</Text>
                    
                    </TouchableOpacity>                                        
                </View>

                <View style={styles.cardBarbershop}>
                    <View style={{width:'90%', alignSelf:'center',marginTop:'5%',marginBottom:'5%'}}>
                        {/*Nome da barbearia*/}
                        <Text style={[styles.titleCard,{marginBottom:'1%'}]}>
                            Barbearia Dom Pedro
                        </Text>

                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{fontSize:15,color:'#797377',}}>Londrina-PR</Text>
                            <Text style={{fontSize:15,color:'#797377'}}>a partir de</Text>
                        </View>
                            <Text style={[styles.titleCard,{textAlign:'right'}]}>R$ 35</Text>
                    
                    </View>                                        
                </View>
                <View style={styles.cardBarbershop}>
                    <View style={{width:'90%', alignSelf:'center',marginTop:'5%',marginBottom:'5%'}}>
                        {/*Nome da barbearia*/}
                        <Text style={[styles.titleCard,{marginBottom:'1%'}]}>
                            Barbearia Dom Pedro
                        </Text>

                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{fontSize:15,color:'#797377',}}>Londrina-PR</Text>
                            <Text style={{fontSize:15,color:'#797377'}}>a partir de</Text>
                        </View>
                            <Text style={[styles.titleCard,{textAlign:'right'}]}>R$ 35</Text>
                    
                    </View>                                        
                </View>

                <View style={{marginBottom:'10%'}}></View>
                {/*card de chamada para criação de barbearia */}
                <View style={styles.cardCreateBarbeshop}>
                    <View style={styles.icon}>
                        <Feather name="scissors" size={30} color="#D4AF37" />
                    </View>
                    <View>
                        <Text style={[styles.titleCard,{fontSize:20}]}>Tem uma barbearia?</Text>
                        <Text style={{fontSize:16,color:"#797377"}}>Cadastre seu </Text>
                        <Text style={{fontSize:16,color:"#797377"}}>estabelecimento e apreça </Text>
                        <Text style={{fontSize:16,color:"#797377"}}>para clientes próximos </Text>
                    </View>
                    <TouchableOpacity 
                    style={{
                        backgroundColor:'#d4af37',
                        borderRadius:10,
                        alignSelf:'center',
                        padding:10
                        }
                        
                        }>
                        <Text style={{textAlign:'center',color:'#fff',fontSize:15,fontWeight:'500'}}>Cadastrar</Text>
                    </TouchableOpacity>
                    
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
    header:{                       
        backgroundColor:'#000',
        marginTop:"15%",
        width:'90%',
        alignSelf:'center'       
        
    },
    body:{
        
    },
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
    title:{      
        marginTop:'10%',
        marginBottom:'10%',
        width:'90%',
        alignSelf:'center'

    },
    search:{
        width:'90%',
        alignSelf:'center' 
    },
    searchTitle:{
        color:"#fff",
        fontSize:25,
        fontWeight:'600',
        marginTop:'10%',
        marginBottom:'5%',
      
    },
    cardBarbershop:{
        backgroundColor:'#18181B',
        borderRadius:10,
        marginBottom:'3%',
        width:'90%',
        alignSelf:'center' 

    },
    titleCard:{
        color:"#fff",
        fontWeight:'500',
        fontSize:18
    },
    cardCreateBarbeshop:{
        width:'90%',
        alignSelf:'center',
        backgroundColor:'#18181B',
        borderRadius:10,
        borderStyle:'dashed',
        borderWidth:1,
        borderColor:"#ffffff7a",
        flexDirection:'row',
        marginBottom:'15%',
        justifyContent:'space-around',
        paddingBottom:20,
        paddingTop:20,
        alignItems:'center'

        
    },
    icon:{
        backgroundColor:'#d4af376c',
        borderRadius:30,
        height:50,
        width:50,
        justifyContent:'center',
        alignItems:'center'
    }
})