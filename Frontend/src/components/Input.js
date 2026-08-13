import { StyleSheet, Text, TextInput, View } from "react-native";


export default function InputDefault({label="default",placeholder,password,value,onChange}){

    return(
        <View style={styles.view}>
            <Text style={styles.label}>{label}</Text>
            <TextInput 
            style={styles.input}
            value={value}
            onChangeText={onChange}
            secureTextEntry={password}
            placeholder={placeholder}
            placeholderTextColor={"#797377"}
            
            />

        </View>
    )
}

const styles = StyleSheet.create({
  view:{
    width:'90%',
    alignSelf:'center',
    marginBottom:'10%'
  },
  label:{
    color:"#fff",
    fontSize:17,
    fontWeight:'500',
    marginBottom:'2%'

  },
  input:{
    backgroundColor:'#18181B',
    borderRadius:10,
    padding:16,
    fontSize:22,
    color:'#797377'
  }

})