import {View,Text, TouchableOpacity, ScrollView} from "react-native"
import ButtonDefault from "../components/Button"
import { StyleSheet } from "react-native"
import InputDefault from "../components/Input"
import Logo from "../components/Logo"
import Feather from '@expo/vector-icons/Feather';

export default function index({navigation}){

    return(
        <View style={styles.container}>
            {/*cabeçalho da pagina*/}
            <View style={styles.header}>
                <Logo/>
                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Register")}>
                    <Text style={styles.textButton}>Criar conta</Text>
                </TouchableOpacity>
            </View>

            {/*body*/}
            <ScrollView style={styles.body}>

                <View style={{width:'90%', alignSelf:'center', marginBottom:'25%'}}>
                    <Text style={styles.title}>A barbearia ideal</Text>
                    <Text style={styles.titleTwo}>na sua cidade.</Text>
                    <Text style={styles.description}>
                        Esqueça as ligações e filas de espera. Conectamos você aos melhores espaços da sua região. Escolha a barbearia, reserve seu horário e garanta o visual perfeito com total praticidade.
                    </Text>
                    <ButtonDefault title="Encontrar barbearia" textColor="#000" onpress={()=>navigation.navigate("Register")}/>
                    <View style={{marginTop:'5%'}}></View>
                    <ButtonDefault title="Ja tenho conta" color="#000" onpress={()=>navigation.navigate("Login")}/>

                </View>

                {/*descrições de como funciona o app */}
                <View style={styles.info}>
                    <View style={{width:'90%',alignSelf:'center', marginTop:'15%'}}>
                        {/*Icone*/}
                        <View style={styles.icon}>
                            <Feather name="map-pin" size={30} color="#D4AF37" />
                        </View>
                        {/*Titulo info*/}
                        <Text style={styles.titleInfo}>Barbearias Locais</Text>

                        {/*subtitulo info*/}
                        <Text style={styles.subtitleInfo}>Listamos os melhores estabelecimentos da sua cidade para que você encontre a opção 
                            perfeita perto de você, com facilidade
                        </Text>
                    </View>

                    <View style={{width:'90%',alignSelf:'center'}}>
                        {/*Icone*/}
                        <View style={styles.icon}>
                            <Feather name="calendar" size={30} color="#D4AF37" />
                        </View>
                        {/*Titulo info*/}
                        <Text style={styles.titleInfo}>Agendamento Direto</Text>

                        {/*subtitulo info*/}
                        <Text style={styles.subtitleInfo}>Verifique a agenda dos profissionais e escolha a data e o horario
                            ideais diretamente pelo aplicativo, em poucos cliques
                        </Text>
                    </View>

                    <View style={{width:'90%',alignSelf:'center', marginBottom:'20%'}}>
                        {/*Icone*/}
                        <View style={styles.icon}>
                            <Feather name="check-circle" size={30} color="#D4AF37" />
                        </View>
                        {/*Titulo info*/}
                        <Text style={styles.titleInfo}>A Escolha Certa</Text>

                        {/*subtitulo info*/}
                        <Text style={styles.subtitleInfo}>Conheça os serviços oferecidos por cada barbearia
                             e decida qual local atende exatamente ao que o seu estilo precisa
                        </Text>
                    </View>

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
        flexDirection:'row',
        justifyContent:'space-around',        
        backgroundColor:'#000',
        marginTop:"12%",
        
    },
    body:{
        backgroundColor:'#09090B',
    },
    button:{
        backgroundColor:'#D4AF37',
        borderRadius:10,
        padding:10,
        marginBottom:'5%'

    },
    textButton:{
        fontSize:17,
        fontWeight:'500',                
    },
    title:{
        color:'#fff',
        marginTop:'20%',
        fontSize:55,
        fontWeight:'500',
        fontFamily:'san-serif'
    },
    titleTwo:{
        color:'#D4AF37',
        fontSize:55,
        fontStyle:'italic',
        fontFamily:'san-serif',
        fontWeight:'bold'
    },
    description:{
       color:"#797377",
       marginTop:"5%",
       fontSize:20,
       marginBottom:"10%"       
    },
    info:{
        backgroundColor:"#18181B",
        borderTopWidth:1, 
        borderColor:'#ffffff34'
    },
    titleInfo:{
        color:"#ffffffd8",
        fontFamily:'san-serif',
        fontSize:25,
        fontWeight:'500',
        marginBottom:'5%',
        marginTop:'5%'

    },
    subtitleInfo:{
        color:"#ffffffa1",
        marginBottom:'10%',
        fontSize:17
    },
    icon:{
        backgroundColor:"#27272A",
        borderRadius:30,
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center'
        
    }

})