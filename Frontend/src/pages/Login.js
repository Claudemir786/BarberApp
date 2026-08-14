import {Text,View,StyleSheet,TouchableOpacity, ScrollView} from 'react-native'
import Logo from '../components/Logo'
import InputDefault from '../components/Input'
import ButtonDefault from '../components/Button'



export default function login({navigation}){

    return(
        <ScrollView style={styles.container}>
            
               {/*cabeçario */}
                <View style={{marginTop:'30%', width:'90%',alignSelf:'center'}}>
                    <Logo/>
                </View>

                {/*corpo da página*/}
                <View style={{width:'90%', alignSelf:'center', marginTop:'10%', marginBottom:'30%'}}>

                    <Text style={styles.title}>Entrar</Text>
                    <Text style={styles.subtitle}>Digite seu e-mail para acessar sua conta</Text>

                    {/*Inputs */}
                    <InputDefault label='Email'/>
                    <InputDefault label='Senha' password={true}/>
                    <ButtonDefault title='Entrar' textColor='#000'/>

                    <View style={{flexDirection:'row',justifyContent:'center', marginTop:"10%"}}>
                        <Text style={styles.textLogin}>Não tem uma conta?</Text>
    
                        <TouchableOpacity onPress={()=> navigation.navigate("Register")}>
                            <Text style={styles.textButton}>  Criar uma conta</Text>
                        </TouchableOpacity>
                    </View>
                </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000'
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
     textLogin:{
        color:'#797377',
        fontSize:17
    },
    textButton:{
        fontSize:17,
        color:'#D4AF37',
        
    }
})