import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";
import Appointments from "../pages/Appointments";
import Feather from '@expo/vector-icons/Feather';
import Profile from "../pages/Profile";

const TABS = createBottomTabNavigator();


export default function Tabs(){

    return(
        <TABS.Navigator initialRouteName="Home" screenOptions={
            {
                headerShown:false,
                tabBarStyle:{backgroundColor:'#27272A', height:90, padding:5},
                tabBarActiveTintColor:'#D4AF37',
                tabBarInactiveTintColor:"#797377"
            }
            
            }>
            
            <TABS.Screen name="Home" component={Home}
            options={{
                tabBarIcon:({focused})=>{
                    if(focused){
                        return <Feather name="home" size={30} color="#D4AF37" />
                    }
                    return <Feather name="home" size={30} color="#797377"/>
                }
            }}
            />

            <TABS.Screen name="Agendamentos" component={Appointments}
                 options={{
                    tabBarIcon:({focused})=>{
                        if(focused){
                            return <Feather name="calendar" size={30} color="#D4AF37" />
                        }
                        return <Feather name="calendar" size={30} color="#797377"/>
                    }
            }}
            />

            <TABS.Screen name="Perfil" component={Profile}
                 options={{
                    tabBarIcon:({focused})=>{
                        if(focused){
                            return <Feather name="user" size={30} color="#D4AF37" />
                        }
                        return <Feather name="user" size={30} color="#797377"/>
                    }
            }}
            />
            
        </TABS.Navigator>
    )
}
