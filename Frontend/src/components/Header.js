
import { View,StyleSheet } from "react-native"
import Logo from "./Logo.js"

export default function HeaderLogo(){

    return(
       
        <View>
             <View style={styles.header} >
            <Logo/>               
            </View>
                <View style={{borderBottomWidth:1,borderColor:'#ffffff5e', width:'100%',marginTop:'5%'}}></View>
        </View>
       
    )
}


const styles = StyleSheet.create({
    header:{
        backgroundColor:'#000',
        marginTop:"15%",
        width:'90%',
        alignSelf:'center'
    }
})