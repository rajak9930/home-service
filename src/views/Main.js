import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Home from './tabs/Home';
import Profile from './tabs/Profile';
import Bookings from './tabs/Bookings';

const Tab = createBottomTabNavigator();

const TabIcon = ({focused, iconName}) => (
  <View style={styles.tabIconContainer}>
    <Icon
      name={iconName}
      size={iconName === 'my-library-books' ? 24 : 27}
      color={focused ? '#0061FF' : '#666876'}
    />
  </View>
);

const TabBarButton = props => (
  <View style={styles.tabBarButtonContainer}>
    <TouchableOpacity {...props} activeOpacity={1} />
  </View>
);

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarActiveBackgroundColor: 'transparent',
        tabBarInactiveBackgroundColor: 'transparent',
        android_ripple: {enabled: false},
        pressColor: 'transparent',
        pressOpacity: 1,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} iconName="home" />
          ),
          tabBarButton: TabBarButton,
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={Bookings}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} iconName="my-library-books" />
          ),
          tabBarButton: TabBarButton,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} iconName="person" />
          ),
          tabBarButton: TabBarButton,
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({
  tabIconContainer: {
    flex: 1,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: 'white',
    height: 67,
    paddingVertical: 8,
  },
  tabBarItem: {
    marginHorizontal: 8,
  },
  tabBarButtonContainer: {
    flex: 1,
  },
});
