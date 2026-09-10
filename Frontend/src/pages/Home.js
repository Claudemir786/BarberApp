import { ScrollView,Text, View, StyleSheet, Touchable, TouchableOpacity, FlatList } from "react-native";
import Logo from "../components/Logo";
import Feather from '@expo/vector-icons/Feather';
import InputDefault from "../components/Input";
import { useEffect, useState } from "react";
import { GetInfoUser } from "../service/SecureStore";
import { getUserAppointment } from "../service/UserService";
import { getLocationBarbershop, searchBarbershopByName } from "../service/BarbeshopService";
import CardAppointment from "../components/CardAppointment";
import CardBarberShop from "../components/CardBarbershop";



export default function Home({navigation}){

    const [name,setName] = useState("");
    const [searchBarbershop,setSearchBarbershop] = useState("");
    const [userAppointment, setUserAppointment] = useState([]);
    const [barbershops,setBarbershops] = useState([]);
    const [findAppointment,setFindAppointment] = useState(true);
    const [findLocactionB,setFindLocationB] = useState(true);
    const [findBarbershop,setFindBarbershop] = useState(false);
    const [barbershopFinded,setBarbershopFinded] = useState("");
    const [barbershopNotFinded,setNotFinded] = useState(false);

    useEffect(()=>{
        getName();
        getInfoHome();
    },[]);

    //guarda o nome do usuário
    const getName = async () =>{
        let user = await GetInfoUser();
        setName(user.name);
    }

    //função utilizada para chamar todas as informações que precisam estar na página
    async function getInfoHome(){       
        
        try {
        //agendamentos ativos
        const appointment = await getUserAppointment();
         if(appointment){
            console.log("dados de agendamento encontrado: ", appointment);
            if(appointment == []){
                setFindAppointment(false)
            }else{
                setUserAppointment(appointment);
            }
           
        }else{
            console.warn("Não foram encontrados dados de agendamento pára esse usuário");
            setFindAppointment(false);
        }

        //barbearias próximas
        const getBarbershops = await getLocationBarbershop();       
        if(getBarbershops){
            console.log("barbearias encontradas: ", getBarbershops);
            setBarbershops(getBarbershops);
            if(getBarbershops ==[]){
                setFindLocationB(false)
            }

        }else{
            console.warn("não foram encontradas barbearias para essa região: ", getBarbershops);
            setFindLocationB(false);
        }

        } catch (error) {
            console.error("Falha ao carregar dados da pagina: ", error.message);
        }
    }

    function goToBarbershop(id){
        navigation.navigate("Barbershop",{id:id})
    }
    

    //função acionada após buscar algo no campo de busca da pagina
     async function findBarberShop() {
        try {
            const barbershop = await searchBarbershopByName(searchBarbershop); 
            
            if(barbershop){
                console.log("barbearia encontrada");
                if(barbershop.length === 0 ){
                    setNotFinded(true)
                }
                setBarbershopFinded(barbershop)
                setFindBarbershop(true);
            }else{
                setNotFinded(true)
            }            
            
        } catch (error) {
            console.error("falha ao buscar barbearias: ", error);
        }
    }


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
                    Olá {name}
                    </Text>

                </View>

                {/*se forem encontrados agendamentos*/}
                {findAppointment &&(
                   <FlatList
                    data={userAppointment}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item})=> <CardAppointment itemAppointment={item}/>}
                    scrollEnabled={false}
                   />
                )}
                
               
                 
                {/*Busca*/}
                <View style={styles.search}>
                     <InputDefault 
                        placeholder={'Buscar barbearias'}
                        onChange={setSearchBarbershop}
                        search={findBarberShop}  
                        label="Buscar barbearia"                                    
                    />                    
                                                                                                                     
                </View>
                {/*Renderiza barbearia encontrada */}
                {findBarbershop &&(
                    <>
                        <Text style={[styles.searchTitle, {width:'90%', alignSelf:'center'}]}>Resultado da pesquisa: </Text>
                        <CardBarberShop barbershop={barbershopFinded}/>

                    </>
                )} 

                {/*se nã econtrar nada na busca*/}
                {barbershopNotFinded &&(
                    <>
                        <Text style={[styles.searchTitle, {width:'90%', alignSelf:'center'}]}>Resultado da pesquisa: </Text>
                        <Text style={styles.notFinded}>Não foram encontrados resultados na pesquisa</Text>

                    </>
                )}

                <Text style={[styles.searchTitle,{width:'90%', alignSelf:'center'}]}>
                    Barbearias Próximas 
                </Text>    

                 {/*Se forem encontradas barbearias na região*/}
                {findLocactionB &&(
                    <FlatList 
                        data={barbershops}
                        keyExtractor={(item)=>item.id}
                        renderItem={({item})=> <CardBarberShop barbershop={item} onPress={goToBarbershop}/>}
                        scrollEnabled={false}
                    />
                )}
                  
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
                        
                        }
                        onPress={()=>navigation.navigate("RegisterBarbershop")}
                        >
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
    },
    notFinded:{
        color:"#797377",
        fontSize:16,
        width:'90%',
        alignSelf:'center',
        marginBottom:'5%'
    }
})