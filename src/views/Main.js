import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconTwo from 'react-native-vector-icons/Feather';
import Home from './tabs/Home';
import Profile from './tabs/Profile';
import Bookings from './tabs/Bookings';
import Colors from '../constants/colors';
import {useCustomTheme} from '../theme/Theme';
import CustomDrawer from './Home/components/CustomDrawer';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const ICON_SIZES = {
  home: 22,
  'my-library-books': 24,
  'person-outline': 27,
};

const TabIcon = ({focused, iconName, isDarkMode}) => {
  const IconComponent = iconName === 'home' ? IconTwo : Icon;

  const getIconColor = () => {
    if (focused) {
      return isDarkMode ? Colors.pureWhite : Colors.primary;
    }
    return '#6F767E';
  };

  return (
    <View style={styles.tabIconContainer}>
      <IconComponent
        name={iconName}
        size={ICON_SIZES[iconName] || 24}
        color={getIconColor()}
      />
    </View>
  );
};

const TabBarButton = props => (
  <View style={styles.tabBarButtonContainer}>
    <TouchableOpacity {...props} activeOpacity={1} />
  </View>
);

const renderTabIcon =
  (iconName, isDarkMode) =>
  ({focused}) =>
    <TabIcon focused={focused} iconName={iconName} isDarkMode={isDarkMode} />;

const TabNavigator = () => {
  const theme = useCustomTheme();
  const background = theme === 'dark' ? Colors.navBg : Colors.pureWhite;

  const tabBarStyle = {
    ...styles.tabBar,
    backgroundColor: background,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: tabBarStyle,
        tabBarItemStyle: styles.tabBarItem,
        tabBarActiveBackgroundColor: 'transparent',
        tabBarInactiveBackgroundColor: 'transparent',
        android_ripple: {enabled: false},
        pressColor: 'transparent',
        pressOpacity: 1,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarIcon: renderTabIcon('home', theme === 'dark' ? true : false),
          tabBarButton: TabBarButton,
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={Bookings}
        options={{
          tabBarIcon: renderTabIcon(
            'my-library-books',
            theme === 'dark' ? true : false,
          ),
          tabBarButton: TabBarButton,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: renderTabIcon(
            'person-outline',
            theme === 'dark' ? true : false,
          ),
          tabBarButton: TabBarButton,
        }}
      />
    </Tab.Navigator>
  );
};

const Main = () => {
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
        drawerType: 'front',
        sceneContainerStyle: {
          backgroundColor: 'transparent',
        },
      }}>
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    flex: 1,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    height: 57,
    paddingVertical: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarItem: {
    marginHorizontal: 8,
  },
  tabBarButtonContainer: {
    flex: 1,
  },
});

export default Main;
