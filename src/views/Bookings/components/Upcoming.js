import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import IconOne from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import Colors from '../../../constants/colors';
import images from '../../../constants/images';
import {useCustomTheme} from '../../../theme/Theme';
import useTypedSelector from '../../../hooks/useTypedSelector';
import {selectedBookedService} from '../../../redux/bookedService/bookedServiceSlice';
import {formatDateEnd, formatTimeWithEnd} from '../../../utils';
import useDirection from '../../../hooks/useDirection';

const Upcoming = () => {
  const navigation = useNavigation();
  const theme = useCustomTheme();
  const {t} = useTranslation();
  const {isRTL} = useDirection();

  const isDarkMode = theme === 'dark';
  const futureBookings = useTypedSelector(selectedBookedService);

  if (!futureBookings?.length) {
    return (
      <View
        style={[
          styles.emptyContainer,
          {
            backgroundColor: isDarkMode ? Colors.navBg : Colors.pureWhite,
          },
        ]}>
        <Image source={images.Upcoming} style={styles.emptyImage} />
        <Text style={[styles.noOrderText, isDarkMode && styles.darkText]}>
          {t('upcoming.empty.title')}
        </Text>
        <Text style={[styles.subText, isDarkMode && styles.darkSubText]}>
          {t('upcoming.empty.description1')}
        </Text>
        <Text style={[styles.subText, isDarkMode && styles.darkSubText]}>
          {t('upcoming.empty.description2')}
        </Text>
        <TouchableOpacity
          style={styles.viewServicesButton}
          onPress={() => navigation.navigate('CategoryDetails')}>
          <Text style={styles.buttonText}>
            {t('upcoming.empty.buttonText')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.wrap, isDarkMode && styles.darkWrap]}>
      {futureBookings.map((booking, index) => {
        const referenceCode = `${new Date().getTime()}`;
        return (
          <View
            key={index}
            style={[styles.card, isDarkMode && styles.darkCard]}>
            {/* Header Section */}
            <View
              style={[
                styles.headerSection,
                {flexDirection: isRTL ? 'row-reverse' : 'row'},
              ]}>
              <View
                style={[
                  styles.serviceIcon,
                  {marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0},
                ]}>
                <Image source={images.categoryOne} style={styles.categoryOne} />
              </View>
              <View style={styles.titleContainer}>
                <Text style={[styles.title, isDarkMode && styles.darkText]}>
                  {booking.service.title}
                </Text>
                <Text style={styles.reference}>
                  {t('upcoming.booking.referenceCode', {
                    code: referenceCode.substring(1, 7),
                  })}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.rowStatus,
                {flexDirection: isRTL ? 'row-reverse' : 'row'},
              ]}>
              <Text style={styles.label}>
                {t('upcoming.booking.status.label')}
              </Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {t('upcoming.booking.status.confirmed')}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.row,
                {flexDirection: isRTL ? 'row-reverse' : 'row'},
              ]}>
              <View
                style={[
                  styles.iconWrapper,
                  {
                    marginRight: isRTL ? 0 : 12,
                    marginLeft: isRTL ? 12 : 0,
                  },
                ]}>
                <IconOne
                  name="calendar-outline"
                  size={24}
                  color={Colors.lightGray}
                />
              </View>
              <View>
                <Text
                  style={[styles.scheduleText, isDarkMode && styles.darkText]}>
                  {t('upcoming.booking.schedule.time', {
                    time: formatTimeWithEnd(booking.selectedTime),
                    date: formatDateEnd(booking.selectedDate),
                  })}
                </Text>
                <Text style={styles.schedule}>
                  {t('upcoming.booking.schedule.label')}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.rowLast,
                {flexDirection: isRTL ? 'row-reverse' : 'row'},
              ]}>
              <View
                style={{
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={[
                    styles.serviceIcon,
                    {
                      marginRight: isRTL ? 0 : 12,
                      marginLeft: isRTL ? 12 : 0,
                    },
                  ]}>
                  <Text style={styles.serviceIconText}>W</Text>
                </View>

                <View>
                  <Text
                    style={[
                      styles.providerName,
                      isDarkMode && styles.darkText,
                    ]}>
                    {t('upcoming.booking.serviceProvider.name')}
                  </Text>
                  <Text style={styles.schedule}>
                    {t('upcoming.booking.serviceProvider.label')}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.callButton,
                  {flexDirection: isRTL ? 'row-reverse' : 'row'},
                ]}>
                <IconOne name="call" size={19} color={Colors.pureWhite} />
                <Text
                  style={[
                    styles.callButtonText,
                    {
                      marginLeft: isRTL ? 0 : 8,
                      marginRight: isRTL ? 8 : 0,
                    },
                  ]}>
                  {t('upcoming.booking.callButton')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    // new
    backgroundColor: Colors.pureWhite,
    marginBottom: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emptyImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  noOrderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  categoryOne: {
    width: 51,
    height: 51,
    resizeMode: 'contain',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  darkSubText: {
    color: Colors.darkLightGray,
  },
  darkText: {
    color: Colors.pureWhite,
  },
  viewServicesButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    color: Colors.pureWhite,
    fontSize: 16,
    fontWeight: '600',
  },
  schedule: {
    color: Colors.lightGray,
    fontSize: 12,
    marginTop: 2,
  },
  card: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    backgroundColor: Colors.pureWhite,
    borderRadius: 8,
    elevation: 2,
  },
  darkCard: {
    backgroundColor: Colors.navBg,
  },
  headerSection: {
    flexDirection: 'row',
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  serviceIcon: {
    width: 43,
    height: 43,
    borderRadius: 24,
    backgroundColor: '#FFE5D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceIconText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9457',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    color: Colors.black,
  },
  reference: {
    color: Colors.lightGray,
    fontSize: 12,
  },
  rowStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rowLast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#4CAF50',
    fontWeight: '500',
    fontSize: 12,
  },
  label: {
    fontSize: 14,
    color: Colors.lightGray,
    marginRight: 12,
  },
  iconWrapper: {
    marginRight: 12,
    padding: 8,
    borderRadius: 50,
    borderColor: '#EFEFEF',
    borderWidth: 1,
  },
  scheduleText: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '500',
  },

  providerName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },

  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    padding: 9,
    borderRadius: 12,
  },
  callButtonText: {
    color: Colors.pureWhite,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Upcoming;
