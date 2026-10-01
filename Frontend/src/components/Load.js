
import{View, ActivityIndicator}from 'react-native'

export default function Load(){
    return(
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={"large"} color={"#D4AF37"}/>
        </View>
    )
}