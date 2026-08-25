
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import index from "../pages/Index.js";
import login from "../pages/Login.js";
import Register from "../pages/Register";
import  Tabs  from "./tabs.js";
import Barbershop from "../pages/barbershop.js";
import RegisterBarbershop from "../pages/owner/RegisterBarbershop.js";
import BusinessHours from "../pages/owner/RegisterBusinessHours.js";

const STACK = createNativeStackNavigator();


export default function Stack(){
    return(
       <STACK.Navigator 
       initialRouteName="Index"
       screenOptions={({headerShown:false})}
       >

            <STACK.Screen name="Index" component={index} />
            <STACK.Screen name="Login" component={login}/>
            <STACK.Screen name="Register" component={Register}/>
            <STACK.Screen name="Tab" component={Tabs}/>
            <STACK.Screen name="Barbershop" component={Barbershop}/>
            <STACK.Screen name="RegisterBarbershop" component={RegisterBarbershop}/>
            <STACK.Screen name="BusinessHours" component={BusinessHours}/>

       </STACK.Navigator>
    )
}