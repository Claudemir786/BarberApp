import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import HeaderLogo from "../components/Header.js";
import ButtonDefault from "../components/Button.js";
import Feather from '@expo/vector-icons/Feather';

export default function Profile({navigation}){

    return(
        <ScrollView style={styles.container}>
            <HeaderLogo/>

            <Text style={styles.titleProfile}>Perfil</Text>

            {/*info usuário */}
            <View style={styles.infoUser}> 
                <View style={styles.iconUser}>
                    <Feather name="user" size={40} color="#D4AF37" />
                </View>
                
                <View style={{marginBottom:'5%', marginTop:'5%'}}>
                    <Text style={{color:'#fff', fontSize:20}}>Nome Usuário</Text>
                    {/*email com o icone */}
                    <View style={{flexDirection:'row', marginTop:'2%'}}>
                        <Feather name="mail" size={20} color="#797377" />
                        <Text style={{color:"#797377",fontSize:14,fontWeight:'700'}}>email@exemple.com</Text>
                    </View>
                    {/*numero de telefone com o icone*/}
                    <View style={{flexDirection:'row'}}>
                        <Feather name="phone" size={20} color="#797377" />
                        <Text style={{color:"#797377",fontSize:14,fontWeight:'700'}}>(43)99676-5432</Text>
                    </View>
                </View>
            </View>

            {/*cards com as opções */}
            {/*Card 1 */}
            <View style={{width:'90%', alignSelf:'center', marginTop:"5%"}}>

                <Text style={{fontSize:15, color:'#fff'}}>
                Conta
                </Text>
            </View>
            <View style={styles.cardOne}>
                <TouchableOpacity style={styles.button}>
                    <View><Feather name="user" size={24} color="black" /></View>
                    <View>
                        <Text>Dados pessoais</Text>
                        <Text>Nome,e-mail,telefone</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <View><Feather name="map-pin" size={24} color="black" /></View>
                    <View>
                        <Text>Endereço</Text>
                        <Text>Londrina</Text>
                    </View>
                </TouchableOpacity>

              
            </View>
            {/*Card 2 */}
            <Text>Suporte</Text>
            <View>
               <TouchableOpacity style={styles.button}>
                    <View><Feather name="shield" size={24} color="black" /></View>
                    <View>
                        <Text>Privacidade e segurança</Text>
                        <Text>Senha,dados</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <View><Feather name="help-circle" size={24} color="black" /></View>
                    <View>
                        <Text>Ajuda</Text>
                        <Text>Central de suporte</Text>
                    </View>
                </TouchableOpacity>

            </View>

            <View style={{width:'90%', alignSelf:'center'}}>
                <ButtonDefault title="Sair" color="#000" borderColor="#D4AF37" textColor="#D4AF37"/>
            </View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000'
    },
    infoUser:{
        backgroundColor:'#18181B',
        width:'90%',
        alignSelf:'center',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#ffffff2d',
        flexDirection:'row'    

    },
    titleProfile:{
        color:'#fff',
        marginTop:'10%',
        fontSize:25,
        fontFamily:'san-serif',
        fontWeight:'600',
        width:'90%',
        alignSelf:'center',
        marginBottom:'10%',
        
    },
    iconUser:{
        backgroundColor:'#27272A',
        height:80,
        width:80,
        borderRadius:40,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:'5%',
        marginTop:'5%',
        marginBottom:'5%',
        marginRight:'5%'
    },
    cardOne:{
        backgroundColor:'#18181B',        
        width:'90%',
        alignSelf:'center',
        borderRadius:10
    },
    button:{
        borderBottomWidth:1,
        borderColor:"#ffffff2d",
        flexDirection:'row',
        width:'90%',
        alignSelf:'center'

    }
})