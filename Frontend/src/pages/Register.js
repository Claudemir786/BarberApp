
import {Text,View,StyleSheet, TouchableOpacity,ScrollView} from 'react-native'
import Logo from '../components/Logo'
import ButtonDefault from '../components/Button'
import InputDefault from '../components/Input'



export default function Register({navigation}){

    return(
        <ScrollView style={styles.container}>
             
             {/*cabeçario */}
             <View style={{marginTop:'30%', width:'90%',alignSelf:'center'}}>
                <Logo/>
             </View>

             {/*corpo da página*/}
             <View style={{width:'90%', alignSelf:'center', marginTop:'10%', marginBottom:'30%'}}>

                <Text style={styles.title}>Criar uma conta</Text>
                <Text style={styles.subtitle}>Preencha seus dados para criar sua conta</Text>

                {/*Inputs */}

                <InputDefault label='Nome'/>
                <InputDefault label='Email'/>
                <InputDefault label='Senha' password={true}/>
                <ButtonDefault title='Criar Conta' textColor='#000'/>

                <View style={{flexDirection:'row',justifyContent:'center', marginTop:"10%"}}>
                    <Text style={styles.textLogin}>Já tem uma conta?</Text>

                    <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
                        <Text style={styles.textButton}>  Entrar</Text>
                    </TouchableOpacity>
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
    textLogin:{
        color:'#797377',
        fontSize:17
    },
    textButton:{
        fontSize:17,
        color:'#D4AF37',
        
    }

})