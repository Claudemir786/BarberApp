import { registerRootComponent } from 'expo';

import App from './App';
import index from './src/pages/Index.js';
import Register from './src/pages/Register.js';
import Login from './src/pages/Login.js';
import Home from './src/pages/Home.js';
import Appointments from './src/pages/Appointments.js';
import Barbershop from './src/pages/barbershop.js';
import Dashboard from './src/pages/owner/Dashboard.js';
import OwnerAppointments from './src/pages/owner/Appointments.js';
import Barber from './src/pages/owner/Barber.js';
import Clients from './src/pages/owner/Clients.js';
import ListAppointments from './src/pages/owner/ListAppointments.js';




// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Clients);
