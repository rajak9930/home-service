import React from 'react';
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
import Colors from '../../../constants/colors';

// Icon configuration
const ICONS = {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
};

const DRAWER_ITEMS = [
  {
    icon: {
      type: 'MaterialIcons',
      name: 'calendar-today',
    },
    label: 'Calendar',
  },
  {
    icon: {
      type: 'MaterialIcons',
      name: 'payment',
    },
    label: 'Payments Methods',
  },
  {
    icon: {
      type: 'Ionicons',
      name: 'location-outline',
    },
    label: 'Address',
  },
  {
    icon: {
      type: 'MaterialIcons',
      name: 'notifications-none',
    },
    label: 'Notification',
  },
  {
    icon: {
      type: 'MaterialCommunityIcons',
      name: 'ticket-percent-outline',
    },
    label: 'Offers',
  },
  {
    icon: {
      type: 'MaterialIcons',
      name: 'person-add-alt-1',
    },
    label: 'Refer a Friend',
  },
  {
    icon: {
      type: 'MaterialIcons',
      name: 'support-agent',
    },
    label: 'Support',
  },
];

const IconRenderer = ({type, name, isDarkMode, color = '#fff', size = 21}) => {
  const IconComponent = ICONS[type];
  return (
    <IconComponent
      name={name}
      color={isDarkMode ? '#6F767E' : color}
      size={size}
    />
  );
};

const CustomDrawer = props => {
  const theme = useCustomTheme();
  const dispatch = useDispatch();
  const userDetails = useTypedSelector(selectedUser);
  const {name, email, picture} = userDetails.user.user_metadata;

  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
    AsyncStorage.setItem(
      'theme',
      JSON.stringify({
        newTheme,
      }),
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.navBg : Colors.primary},
      ]}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={{uri: picture}} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{name}</Text>
            <Text
              style={styles.profileEmail}
              numberOfLines={1}
              ellipsizeMode="tail">
              {email}
            </Text>
          </View>
        </View>

        {/* Drawer Items */}
        <View style={styles.drawerItems}>
          {DRAWER_ITEMS.map((item, index) => (
            <View key={index} style={styles.drawerItemWrapper}>
              <DrawerItem
                // eslint-disable-next-line react/no-unstable-nested-components
                icon={() => (
                  <IconRenderer
                    type={item.icon.type}
                    name={item.icon.name}
                    isDarkMode={isDarkMode}
                  />
                )}
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
          <IconRenderer
            type="MaterialIcons"
            name="palette"
            isDarkMode={isDarkMode}
          />
          <Text style={styles.themeText}>Color Scheme</Text>
        </View>
        <View style={styles.themeSwitcher}>
          <TouchableOpacity
            style={[
              styles.themeOption,
              !isDarkMode && styles.activeThemeOption,
            ]}
            onPress={() => toggleTheme()}>
            <IconRenderer
              type="Ionicons"
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
              isDarkMode && {backgroundColor: Colors.navBg},
            ]}
            onPress={() => toggleTheme()}>
            <IconRenderer
              type="Ionicons"
              name="moon-outline"
              color={isDarkMode ? '#fff' : '#fff'}
              size={20}
            />
            <Text
              style={[
                styles.themeOptionText,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  color: isDarkMode ? '#fff' : '#fff',
                },
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
  profileInfo: {
    flex: 1,
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
    marginTop: 10,
    padding: 6,
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
