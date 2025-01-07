import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedUser} from '../../redux/auth/authSlice';
import Colors from '../../constants/colors';
import {useCustomTheme} from '../../theme/Theme';

const Profile = () => {
  const userDetails = useTypedSelector(selectedUser);
  const theme = useCustomTheme();
  const isDarkMode = theme === 'dark';

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}>
      <View style={styles.wrap}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View style={styles.indicator} />
            <Text style={[styles.title, isDarkMode && styles.darkText]}>
              Profile
            </Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Edit Profile</Text>
            <Icon name="create-outline" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image
            source={{uri: userDetails?.user?.user_metadata?.picture}}
            style={styles.profileImage}
          />
          <View style={styles.nameContainer}>
            <Text style={[styles.name, isDarkMode && styles.darkText]}>
              {userDetails?.user?.user_metadata?.full_name}
            </Text>
            <Text style={styles.username}>
              @
              {userDetails?.user?.user_metadata?.name
                ?.toLowerCase()
                .replace(/\s/g, '')}
            </Text>
          </View>
        </View>

        {/* Details Sections */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Phone Number</Text>
            <View style={styles.detailValue}>
              {/* <Image
                source={require('../../assets/images/us-flag.png')}
                style={styles.flagIcon}
              /> */}
              <Text style={[styles.detailText, isDarkMode && styles.darkText]}>
                +1 {userDetails?.user?.phone || '64 012 3456'}
              </Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>E-mail</Text>
            <View style={styles.detailValue}>
              <Text style={[styles.detailText, isDarkMode && styles.darkText]}>
                {userDetails?.user?.email}
              </Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Gender</Text>
            <View style={styles.detailValue}>
              <Text style={[styles.detailText, isDarkMode && styles.darkText]}>
                Male
              </Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Date of Birth</Text>
            <View style={styles.detailValue}>
              <Text style={[styles.detailText, isDarkMode && styles.darkText]}>
                Not Set
              </Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Icon name="log-out-outline" size={24} color="#FF4B55" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: Colors.primaryLight,
  },
  darkContainer: {
    backgroundColor: Colors.primaryDark,
  },
  wrap: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 4,
    height: 20,
    backgroundColor: '#CABDFF',
    borderRadius: 2,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    color: Colors.primary,
    marginRight: 4,
    fontSize: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#666',
  },
  detailsContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  detailItem: {
    marginBottom: 24,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  detailValue: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    borderRadius: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
  },
  darkText: {
    color: Colors.pureWhite,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    padding: 16,
    backgroundColor: '#FFE5E7',
    borderRadius: 12,
  },
  logoutText: {
    color: '#FF4B55',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default Profile;
