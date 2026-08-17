
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import index from "../pages/Index.js";
import login from "../pages/Login.js";
import Register from "../pages/Register";
import  Tabs  from "./tabs.js";

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

       </STACK.Navigator>
    )
}