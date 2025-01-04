import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

import useTypedSelector from '../../../hooks/useTypedSelector';
import {selectedUser} from '../../../redux/auth/authSlice';
import {useCustomTheme} from '../../../theme/Theme';
import {setTheme} from '../../../redux/theme/themeSlice';

const CalendarIcon = ({color, size}) => (
  <MaterialIcons name="calendar-today" color="#fff" size={21} />
);

const PaymentIcon = ({color, size}) => (
  <MaterialIcons name="payment" color="#fff" size={21} />
);

const AddressIcon = ({color, size}) => (
  <Ionicons name="location-outline" color="#fff" size={21} />
);

const NotificationIcon = ({color, size}) => (
  <MaterialIcons name="notifications-none" color="#fff" size={21} />
);

const OffersIcon = ({color, size}) => (
  <MaterialCommunityIcons
    name="ticket-percent-outline"
    color="#fff"
    size={21}
  />
);

const ReferFriendIcon = ({color, size}) => (
  <MaterialIcons name="person-add-alt-1" color="#fff" size={21} />
);

const SupportIcon = ({color, size}) => (
  <MaterialIcons name="support-agent" color="#fff" size={21} />
);

const CustomDrawer = props => {
  const theme = useCustomTheme();
  const dispatch = useDispatch();
  const userDetails = useTypedSelector(selectedUser);
  const {name, email, picture} = userDetails.user.user_metadata;

  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
    AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={{uri: picture}} style={styles.profileImage} />
          <View>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileEmail}>{email}</Text>
          </View>
        </View>

        {/* Drawer Items */}
        <View style={styles.drawerItems}>
          {[
            {icon: CalendarIcon, label: 'Calendar'},
            {icon: PaymentIcon, label: 'Payments Methods'},
            {icon: AddressIcon, label: 'Address'},
            {icon: NotificationIcon, label: 'Notification'},
            {icon: OffersIcon, label: 'Offers'},
            {icon: ReferFriendIcon, label: 'Refer a Friend'},
            {icon: SupportIcon, label: 'Support'},
          ].map((item, index) => (
            <View key={index} style={styles.drawerItemWrapper}>
              <DrawerItem
                icon={item.icon}
                label={item.label}
                labelStyle={styles.drawerLabel}
              />
            </View>
          ))}
        </View>
      </DrawerContentScrollView>

      {/* Theme Switcher */}
      <View style={styles.themeContainer}>
        <View style={styles.schemeContainer}>
          <MaterialIcons name="palette" color="#fff" size={21} />
          <Text style={styles.themeText}>Color Scheme</Text>
        </View>
        <View style={styles.themeSwitcher}>
          <TouchableOpacity
            style={[
              styles.themeOption,
              !isDarkMode && styles.activeThemeOption,
            ]}
            onPress={() => toggleTheme()}>
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
            style={[styles.themeOption, isDarkMode && styles.activeThemeOption]}
            onPress={() => toggleTheme()}>
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 35,
    marginBottom: 10,
  },
  profileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  profileEmail: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  drawerItems: {
    flex: 1,
    paddingVertical: 10,
  },
  drawerItemWrapper: {
    marginVertical: -3,
  },
  drawerLabel: {
    color: '#fff',
    fontSize: 14,
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
