// CustomDrawer.js
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useTypedSelector from '../../../hooks/useTypedSelector';
import {selectedUser} from '../../../redux/auth/authSlice';

const CalendarIcon = ({color, size}) => (
  <MaterialIcons name="calendar-today" color="#fff" size={24} />
);

const PaymentIcon = ({color, size}) => (
  <MaterialIcons name="payment" color="#fff" size={24} />
);

const AddressIcon = ({color, size}) => (
  <Ionicons name="location-outline" color="#fff" size={24} />
);

const NotificationIcon = ({color, size}) => (
  <MaterialIcons name="notifications-none" color="#fff" size={24} />
);

const OffersIcon = ({color, size}) => (
  <MaterialCommunityIcons
    name="ticket-percent-outline"
    color="#fff"
    size={24}
  />
);

const ReferFriendIcon = ({color, size}) => (
  <MaterialIcons name="person-add-alt-1" color="#fff" size={24} />
);

const SupportIcon = ({color, size}) => (
  <MaterialIcons name="support-agent" color="#fff" size={24} />
);

const CustomDrawer = props => {
  const userDetails = useTypedSelector(selectedUser);
  const {name, email, picture} = userDetails.user.user_metadata;

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
          <Image source={{uri: picture}} style={styles.profileImage} />
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
        </View>

        {/* Drawer Items */}
        <View style={styles.drawerItems}>
          <DrawerItem
            icon={CalendarIcon}
            label="Calendar"
            labelStyle={styles.drawerLabel}
            // onPress={() => props.navigation.navigate('Calendar')}
          />
          <DrawerItem
            icon={PaymentIcon}
            label="Payments Methods"
            labelStyle={styles.drawerLabel}
            // onPress={() => props.navigation.navigate('Payments')}
          />
          <DrawerItem
            icon={AddressIcon}
            label="Address"
            labelStyle={styles.drawerLabel}
            // onPress={() => props.navigation.navigate('Address')}
          />
          <DrawerItem
            icon={NotificationIcon}
            label="Notification"
            labelStyle={styles.drawerLabel}
            // onPress={() => props.navigation.navigate('Notifications')}
          />
          <DrawerItem
            icon={OffersIcon}
            label="Offers"
            labelStyle={styles.drawerLabel}
            // onPress={() => props.navigation.navigate('Offers')}
          />
          <DrawerItem
            icon={ReferFriendIcon}
            label="Refer a Friend"
            labelStyle={styles.drawerLabel}
            // onPress={() => props.navigation.navigate('ReferFriend')}
          />
          <DrawerItem
            icon={SupportIcon}
            label="Support"
            labelStyle={styles.drawerLabel}
            // onPress={() => props.navigation.navigate('Support')}
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
