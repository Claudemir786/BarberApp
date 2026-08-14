import { StyleSheet, Text, TouchableOpacity, View } from "react-native";




//compponente que ira ser utilizado como padrão em todas as teas que precisar
export default function ButtonDefault({title="Enviar",color="#D4AF37", textColor = "#fff",borderColor="#f7f7f73d",onpress}){

    return(
        <View style={styles.view}>

            <TouchableOpacity 
            style={[styles.button, {backgroundColor:color,borderColor:borderColor}]}
            onPress={onpress}
            >     
                <Text style={[styles.text,{color:textColor}]}>{title}</Text>
            </TouchableOpacity>
            
        </View>
    )
}


const styles = StyleSheet.create({
    view:{
        width:'100%',
        alignSelf:'center'
    },
    text:{
        fontSize:22,
        textAlign:'center',
        fontWeight:'500'

    },
    button:{
        borderWidth:1,
        padding:16,
        borderRadius:10
    }
}) 