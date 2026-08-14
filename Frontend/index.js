import { registerRootComponent } from 'expo';

import App from './App';
import index from './src/pages/Index.js';
import Register from './src/pages/Register.js';
import Login from './src/pages/Login.js';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
