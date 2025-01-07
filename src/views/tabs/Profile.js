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
      <View style={styles.titleContainer}>
        <View style={styles.indicator} />
        <Text style={[styles.title, isDarkMode && styles.darkText]}>
          Profile
        </Text>
      </View>

      <View style={styles.tabsHeader}>
        <View style={styles.tabContainer}>
          <View style={styles.profileSection}>
            <Image
              source={{uri: userDetails?.user?.user_metadata?.picture}}
              style={styles.profileImage}
            />
            <View>
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
        </View>
      </View>

      <View style={styles.wrap}>
        {/* Profile Info */}

        {/* Details Sections */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Phone Number</Text>
            <View style={styles.detailValue}>
              <Text style={[styles.detailText, isDarkMode && styles.darkText]}>
                +92 {userDetails?.user?.phone || '313 4866442'}
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
  tabsHeader: {
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.pureWhite,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 16,
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

  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 40,
    marginRight: 16,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontSize: 16,
    color: '#666',
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    borderRadius: 8,
    backgroundColor: Colors.pureWhite,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailItem: {
    marginBottom: 24,
  },
  detailLabel: {
    fontSize: 15,
    color: Colors.black,
    marginBottom: 8,
  },
  detailValue: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
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
