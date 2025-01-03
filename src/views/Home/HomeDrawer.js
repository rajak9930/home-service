import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../tabs/Home';
import CustomDrawer from './components/CustomDrawer';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '85%',
        },
      }}>
      <Drawer.Screen name="HomeScreen" component={Home} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
