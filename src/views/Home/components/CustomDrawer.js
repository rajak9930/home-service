// CustomDrawer.js
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDrawer = props => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Add your theme switching logic here
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          {/* <Image
            source={require('./path-to-your-profile-image.jpg')} 
            style={styles.profileImage}
          /> */}
          <Text style={styles.profileName}>Ashfak Sayem</Text>
          <Text style={styles.profileEmail}>ashfaksayem@gmail.com</Text>
        </View>

        {/* Drawer Items */}
        <View style={styles.drawerItems}>
          <DrawerItem
            icon={({color, size}) => (
              <MaterialIcons name="calendar-today" color="#fff" size={24} />
            )}
            label="Calendar"
            labelStyle={styles.drawerLabel}
            onPress={() => props.navigation.navigate('Calendar')}
          />
          <DrawerItem
            icon={({color, size}) => (
              <MaterialIcons name="payment" color="#fff" size={24} />
            )}
            label="Payments Methods"
            labelStyle={styles.drawerLabel}
            onPress={() => props.navigation.navigate('Payments')}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Ionicons name="location-outline" color="#fff" size={24} />
            )}
            label="Address"
            labelStyle={styles.drawerLabel}
            onPress={() => props.navigation.navigate('Address')}
          />
          <DrawerItem
            icon={({color, size}) => (
              <MaterialIcons name="notifications-none" color="#fff" size={24} />
            )}
            label="Notification"
            labelStyle={styles.drawerLabel}
            onPress={() => props.navigation.navigate('Notifications')}
          />
          <DrawerItem
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="ticket-percent-outline"
                color="#fff"
                size={24}
              />
            )}
            label="Offers"
            labelStyle={styles.drawerLabel}
            onPress={() => props.navigation.navigate('Offers')}
          />
          <DrawerItem
            icon={({color, size}) => (
              <MaterialIcons name="person-add-alt-1" color="#fff" size={24} />
            )}
            label="Refer a Friend"
            labelStyle={styles.drawerLabel}
            onPress={() => props.navigation.navigate('ReferFriend')}
          />
          <DrawerItem
            icon={({color, size}) => (
              <MaterialIcons name="support-agent" color="#fff" size={24} />
            )}
            label="Support"
            labelStyle={styles.drawerLabel}
            onPress={() => props.navigation.navigate('Support')}
          />
        </View>
      </DrawerContentScrollView>

      {/* Theme Switcher */}
      <View style={styles.themeContainer}>
        <View style={styles.schemeContainer}>
          <MaterialIcons name="palette" color="#fff" size={24} />
          <Text style={styles.themeText}>Color Scheme</Text>
        </View>
        <View style={styles.themeSwitcher}>
          <TouchableOpacity
            style={[
              styles.themeOption,
              !isDarkMode && styles.activeThemeOption,
            ]}>
            <Ionicons
              name="sunny-outline"
              color={!isDarkMode ? '#6C63FF' : '#fff'}
              size={20}
            />
            <Text
              style={[
                styles.themeOptionText,
                !isDarkMode && styles.activeThemeOptionText,
              ]}>
              Light
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.themeOption,
              isDarkMode && styles.activeThemeOption,
            ]}>
            <Ionicons
              name="moon-outline"
              color={isDarkMode ? '#6C63FF' : '#fff'}
              size={20}
            />
            <Text
              style={[
                styles.themeOptionText,
                isDarkMode && styles.activeThemeOptionText,
              ]}>
              Dark
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C63FF',
  },
  drawerContent: {
    flex: 1,
  },
  profileSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  profileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  profileEmail: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  drawerItems: {
    flex: 1,
    paddingTop: 5,
  },
  drawerLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  themeContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  schemeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  themeText: {
    color: '#fff',
    fontSize: 16,
  },
  themeSwitcher: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    padding: 4,
    marginTop: 10,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    flex: 1,
  },
  activeThemeOption: {
    backgroundColor: '#fff',
  },
  themeOptionText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
  activeThemeOptionText: {
    color: '#6C63FF',
  },
});

export default CustomDrawer;
