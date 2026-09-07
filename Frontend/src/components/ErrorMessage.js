import { StyleSheet,Text } from "react-native"




export default function ErrorMessage({text}){
    return(
         <Text style={styles.errorMessage}>{text}</Text>
    )
}


const styles = StyleSheet.create({
     errorMessage:{
        color:'red',
        fontSize:18,
        textAlign:'center',
        marginBottom:'5%',
        fontWeight:'500'
    }
})