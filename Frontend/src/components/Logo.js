import { View,Text,StyleSheet } from "react-native";
import Feather from '@expo/vector-icons/Feather';

export default function Logo(){

    return(
        <View style={styles.view}>
            
            <Feather name="scissors" size={26} color="#D4AF37" />
            <Text style={styles.text}>BarberApp</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        flexDirection:'row',
    
    },
    text:{
        color:"#fff",
        fontSize:26,
        fontWeight:'bold',
        fontFamily:'san-serif',
        marginLeft:'2%'        

    }

})