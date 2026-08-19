import{View,Text,StyleSheet} from "react-native"
import Feather from '@expo/vector-icons/Feather';

export default function NotFound({title=""}){
    return(
        
        <View style={styles.errorNotFound}>
            <Feather name="x-circle" size={100} color="#ffffff48" />
            <Text style={styles.textNotFound}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
     errorNotFound:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        alignSelf:'center',
        marginTop:'10%'
    },
    textNotFound:{
        color:'#ffffff48',
        fontSize:25,
        textAlign:'center'
    }
})