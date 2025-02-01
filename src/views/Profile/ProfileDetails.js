import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import Colors from '../../constants/colors';
import {useCustomTheme} from '../../theme/Theme';
import useDirection from '../../hooks/useDirection';
import {selectedUser} from '../../redux/auth/authSlice';
import useTypedSelector from '../../hooks/useTypedSelector';

const ProfileDetails = () => {
  const theme = useCustomTheme();
  const {isRTL} = useDirection();
  const {t} = useTranslation();

  const userDetails = useTypedSelector(selectedUser);
  const isDarkMode = theme === 'dark';
  return (
    <>
      <View style={styles.detailItem}>
        <Text
          style={[
            styles.detailLabel,
            isDarkMode && styles.darkText,
            isRTL && styles.rtlText,
          ]}>
          {t('profile.details.phoneNumber')}
        </Text>
        <View
          style={[
            styles.detailValue,
            isDarkMode && styles.darkDetailValue,
            {
              flexDirection: isRTL ? 'row-reverse' : 'row',
            },
          ]}>
          <Text
            style={[
              styles.detailText,
              isDarkMode && styles.darkText,
              isRTL && styles.rtlText,
            ]}>
            +92 {userDetails?.user?.phone || '313 4866442'}
          </Text>
        </View>
      </View>
      <View style={styles.detailItem}>
        <Text
          style={[
            styles.detailLabel,
            isDarkMode && styles.darkText,
            isRTL && styles.rtlText,
          ]}>
          {t('profile.details.email')}
        </Text>
        <View
          style={[
            styles.detailValue,
            isDarkMode && styles.darkDetailValue,
            {
              flexDirection: isRTL ? 'row-reverse' : 'row',
            },
          ]}>
          <Text
            style={[
              styles.detailText,
              isDarkMode && styles.darkText,
              isRTL && styles.rtlText,
            ]}>
            {userDetails?.user?.email}
          </Text>
        </View>
      </View>
      <View style={styles.detailItem}>
        <Text
          style={[
            styles.detailLabel,
            isDarkMode && styles.darkText,
            isRTL && styles.rtlText,
          ]}>
          {t('profile.details.gender')}
        </Text>
        <View
          style={[
            styles.detailValue,
            isDarkMode && styles.darkDetailValue,
            {
              flexDirection: isRTL ? 'row-reverse' : 'row',
            },
          ]}>
          <Text
            style={[
              styles.detailText,
              isDarkMode && styles.darkText,
              isRTL && styles.rtlText,
            ]}>
            {t('profile.details.male')}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  detailValue: {
    backgroundColor: Colors.primaryLight,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  darkDetailValue: {
    backgroundColor: Colors.primaryDark,
  },
  detailText: {
    fontSize: 15,
    color: Colors.black,
  },
  detailItem: {
    marginBottom: 18,
  },
});

export default ProfileDetails;
