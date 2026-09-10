import {Text,View,TouchableOpacity,StyleSheet,FlatList} from 'react-native'


export default function CardBarberShop({barbershop, onPress}){
    return(
        <>
            {/*cards de barbearias */}
            <View style={styles.cardBarbershop}>
                <TouchableOpacity style={{width:'90%', alignSelf:'center',marginTop:'5%',marginBottom:'5%'}}
                    onPress={()=>onPress(barbershop.id)}
                >
                    {/*Nome da barbearia*/}
                    <Text style={[styles.titleCard,{marginBottom:'1%'}]}>
                        {barbershop.name}
                    </Text>

                    <View>
                        <Text style={{fontSize:15,color:'#797377',}}>{barbershop.city}</Text>  
                        <Text style={{fontSize:15,color:'#797377',}}>Endereço: {barbershop.address}</Text>                      
                    </View>
                       
                
                </TouchableOpacity>                                        
            </View>
        </>
    )
}

const styles = StyleSheet.create({
     cardBarbershop:{
        backgroundColor:'#18181B',
        borderRadius:10,
        marginBottom:'3%',
        width:'90%',
        alignSelf:'center' 

    },
    titleCard:{
        color:"#fff",
        fontWeight:'500',
        fontSize:18
    },
})