import { View,Text, TouchableOpacity,ScrollView,StyleSheet} from "react-native";
import Logo from "../../components/Logo";
import Feather from '@expo/vector-icons/Feather';
import ButtonDefault from "../../components/Button";
import { useEffect, useState } from "react";
import { infoUserBarbershop } from "../../service/BarbeshopService";
import { GetUserBarbershop } from "../../service/SecureStore";



export default function Dashboard({navigation}){

    const [nameBarbershop,setNameBarbershop] = useState("");

    useEffect(()=>{
        getInfo();
    },[])

    async function getInfo(){
        try {

            const result = await infoUserBarbershop();

            if(result){
                console.log("dados chegaram na pagina com sucesso");
                const name = await GetUserBarbershop();
                setNameBarbershop(name.name);
            }   
            
        } catch (error) {
            console.error("Falha ao buscar dados");
        }
    }

    return(
        <View style={styles.container}>
           {/*Header com a logo */}
            <View style={styles.headerLogo}>
                <Logo/>
            </View>
            <View style={{borderBottomWidth:1,borderColor:'#ffffff5e', width:'100%',marginTop:'5%'}}></View>

            <View style={styles.header}>
                <Text style={styles.hello}>Olá</Text>
                <Text style={styles.title}>{nameBarbershop}</Text>
            </View>

            {/*Corpo da pogina*/}
            <View style={styles.body}>
                <Text style={styles.action}>Ações</Text>
                {/*Primeira Linha*/}
                <View style={styles.line}>
                    {/*Card 1 */}
                    <TouchableOpacity
                    onPress={()=>navigation.navigate("Agenda")}
                    style={styles.button}
                    >
                        <View style={styles.icon}>
                            {/*Icone */}
                            <Feather name="calendar" size={24} color="#D4AF37" />
                        </View>
                        <Text style={styles.titleButton}>Agenda do dia</Text>
                        <Text style={styles.subtitleButton}>Ver todos os horários</Text>
                        
                    </TouchableOpacity>
                    {/*Card 2 */}
                    <TouchableOpacity 
                    onPress={()=> navigation.navigate("Equipe")}
                    style={styles.button}
                    >
                        <View style={styles.icon}>
                            {/*Icone */}
                            <Feather name="users" size={24} color="#D4AF37" />
                        </View>
                        <Text style={styles.titleButton}>Gerenciar Equipe</Text>
                        <Text style={styles.subtitleButton}>Barbeiros cadastrados</Text>

                    </TouchableOpacity>
                </View>

                {/*Segunda Linha*/}
                <View style={styles.line}>
                     {/*Card 1 */}
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate("Clientes")}
                    style={styles.button}
                    >
                        <View style={styles.icon}>
                            {/*Icone busca*/}
                            <Feather name="search" size={24} color="#D4AF37" />
                        </View>
                        <Text style={styles.titleButton}>Buscar Cliente</Text>
                        <Text style={styles.subtitleButton}>histórico e dados</Text>
                        
                    </TouchableOpacity>
                    {/*Card 2 */}
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate("Barbearia")}
                    style={styles.button}
                    >
                        <View style={styles.icon}>
                            {/*Icone engrenagem*/}
                            <Feather name="settings" size={24} color="#D4AF37" />
                        </View>
                        <Text style={styles.titleButton}>Dados da Barbearia</Text>
                        <Text style={styles.subtitleButton}>Editar informações</Text>

                    </TouchableOpacity>
                </View>
                <ButtonDefault title="Cadastrar serviços" textColor="#fff" color="#D4AF37" onpress={()=>navigation.navigate("Rservice")}/>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000'
    },
    headerLogo:{
        marginTop:"15%",
        width:'90%',
        alignSelf:'center'
    },
    header:{
        width:'90%',
        alignSelf:'center',
        marginTop:'10%',
        marginBottom:'10%'
    },
    line:{
        flexDirection:'row',       
        marginBottom:'5%',
        justifyContent:'space-between'
        
    },
    button:{
        backgroundColor:'#18181B',       
        borderRadius:10,
        alignSelf:'center',
        height:140,
        width:'47%',
        padding:5
        
    },
    icon:{
        backgroundColor:"#d4af3725",
        alignSelf:'center',
        height:50,
        width:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
        marginBottom:'3%'
    },
    title:{
        color:"#fff",
        fontFamily:'san-serif',
        fontSize:35,
        fontWeight:'bold',               
    },
    titleButton:{
        fontSize:20,
        color:"#fff",
        fontWeight:'600',
        textAlign:'center'
    },
    subtitleButton:{
        fontSize:13,
        color:'#797377',
        textAlign:'center'
    },
    hello:{
        color:"#797377",
        fontSize:23,
    },
    action:{
        color:"#fff",
        fontSize:23,
        fontWeight:'bold',        
        marginBottom:'3%'

    }, 
    body:{
       alignSelf:'center',
       width:'90%',
    }

})