import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../pages/owner/Dashboard";
import OwnerAppointments from "../pages/owner/Appointments";
import Barber from "../pages/owner/Barber";
import Clients from "../pages/owner/Clients";
import Settings from "../pages/owner/Settings";
import Feather from "@expo/vector-icons/Feather";

const TABS = createBottomTabNavigator();

export default function TabsOwner({ navigation }) {
  return (
    <TABS.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#27272A", height: 90, padding: 5 },
        tabBarActiveTintColor: "#D4AF37",
        tabBarInactiveTintColor: "#797377",
      }}
    >
      <TABS.Screen
        name="Inicio"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <Feather name="grid" size={30} color="#D4AF37" />;
            }
            return <Feather name="grid" size={30} color="#797377" />;
          },
        }}
      />
      <TABS.Screen
        name="Agenda"
        component={OwnerAppointments}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <Feather name="calendar" size={30} color="#D4AF37" />;
            }
            return <Feather name="calendar" size={30} color="#797377" />;
          },
        }}
      />
      <TABS.Screen
        name="Equipe"
        component={Barber}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <Feather name="users" size={30} color="#D4AF37" />;
            }
            return <Feather name="users" size={30} color="#797377" />;
          },
        }}
      />
      <TABS.Screen
        name="Clientes"
        component={Clients}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <Feather name="search" size={30} color="#D4AF37" />;
            }
            return <Feather name="search" size={30} color="#797377" />;
          },
        }}
      />
      <TABS.Screen
        name="Barbearia"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <Feather name="settings" size={30} color="#D4AF37" />;
            }
            return <Feather name="settings" size={30} color="#797377" />;
          },
        }}
      />
    </TABS.Navigator>
  );
}
