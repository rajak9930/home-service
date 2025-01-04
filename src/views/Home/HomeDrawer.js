// Main.js (HomeDrawer)
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../tabs/Home';
import CustomDrawer from './components/CustomDrawer';
import Colors from '../../constants/colors';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '85%',
          backgroundColor: 'transparent',
        },
        overlayColor: 'rgba(0,0,0,0.5)',
        drawerType: 'slide',
        sceneContainerStyle: {
          backgroundColor: 'transparent',
        },
        swipeEnabled: true,
        swipeEdgeWidth: 50,
      }}>
      <Drawer.Screen
        name="HomeScreen"
        component={Home}
        options={{
          drawerPosition: 'left',
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
