import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';

import Colors from '../../../constants/colors';
import {useCustomTheme} from '../../../theme/Theme';
import {formatDate, formatTime} from '../../../utils';
import {useTranslation} from 'react-i18next';
import useDirection from '../../../hooks/useDirection';

const BottomSheet = ({
  setIsBottomSheetVisible,
  service,
  units,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  serviceBooked,
}) => {
  const theme = useCustomTheme();
  const {t} = useTranslation();
  const {isRTL} = useDirection();

  const isDarkMode = theme === 'dark';

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Date picker handler
  const onDateChange = (event, selected) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selected) {
      setSelectedDate(selected);
    }
  };

  // Time picker handler
  const onTimeChange = (event, selected) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selected) {
      setSelectedTime(selected);
    }
  };

  // Get display text for date button
  const getDateDisplayText = () => {
    return selectedDate
      ? formatDate(selectedDate)
      : t('bottomSheet.selectDate');
  };

  const getEndTime = startTime => {
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);
    return endTime;
  };

  const getTimeDisplayText = () => {
    if (!selectedTime) {
      return t('bottomSheet.selectTime');
    }

    const endTime = getEndTime(selectedTime);
    return `${formatTime(selectedTime)} - ${formatTime(endTime)}`;
  };

  return (
    <View
      style={[
        styles.bottomSheetWrapper,
        isDarkMode ? styles.darkCard : styles.lightCard,
      ]}>
      <View style={styles.bottomSheet}>
        {/* Header Section */}
        <View
          style={[
            styles.bottomSheetHeader,
            {flexDirection: isRTL ? 'row-reverse' : 'row'},
          ]}>
          <View
            style={[
              styles.sectionHeader,
              {flexDirection: isRTL ? 'row-reverse' : 'row'},
            ]}>
            <View
              style={[
                styles.indicator,
                {marginRight: isRTL ? 0 : 8, marginLeft: isRTL ? 8 : 0},
              ]}
            />
            <Text
              style={[
                styles.bottomSheetTitle,
                isDarkMode ? styles.darkText : styles.lightText,
                isRTL && styles.rtlText,
              ]}>
              {t('bottomSheet.title')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsBottomSheetVisible(false)}
            style={[
              styles.closeButton,
              {
                backgroundColor: isDarkMode ? '#29303C' : '#EFEFEF',
              },
            ]}>
            <Icon
              name="close"
              size={24}
              color={isDarkMode ? Colors.pureWhite : '#333'}
            />
          </TouchableOpacity>
        </View>

        {/* Date Selection */}
        <TouchableOpacity
          style={[
            styles.datePickerButton,
            {flexDirection: isRTL ? 'row-reverse' : 'row'},
          ]}
          onPress={() => setShowDatePicker(true)}>
          <View
            style={[
              styles.datePickerIcon,
              {marginRight: isRTL ? 0 : 16, marginLeft: isRTL ? 16 : 0},
            ]}>
            <Icon name="calendar-outline" size={24} color="#666" />
          </View>
          <View>
            <Text style={[styles.datePickerLabel, isRTL && styles.rtlText]}>
              {t('bottomSheet.date')}
            </Text>
            <Text style={[styles.datePickerValue, isRTL && styles.rtlText]}>
              {getDateDisplayText()}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Time Selection */}
        <TouchableOpacity
          style={[
            styles.timePickerButton,
            {flexDirection: isRTL ? 'row-reverse' : 'row'},
          ]}
          onPress={() => setShowTimePicker(true)}>
          <View
            style={[
              styles.timePickerIcon,
              {marginRight: isRTL ? 0 : 16, marginLeft: isRTL ? 16 : 0},
            ]}>
            <Icon name="time-outline" size={24} color="#666" />
          </View>
          <View>
            <Text style={[styles.timePickerLabel, isRTL && styles.rtlText]}>
              {t('bottomSheet.time')}
            </Text>
            <Text style={[styles.timePickerValue, isRTL && styles.rtlText]}>
              {getTimeDisplayText()}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Date Picker Modal */}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}

        {/* Time Picker Modal */}
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime || new Date()}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onTimeChange}
            minuteInterval={30}
          />
        )}

        {/* Bottom Actions */}
        <View style={styles.bottomSheetFooter}>
          <View
            style={[
              styles.totalRow,
              {flexDirection: isRTL ? 'row-reverse' : 'row'},
            ]}>
            <Text
              style={[
                styles.totalText,
                isDarkMode ? styles.darkTotalLabel : styles.lightTotalLabel,
                isRTL && styles.rtlText,
              ]}>
              {t('bottomSheet.total')}:
            </Text>
            <Text
              style={[
                styles.priceText,
                isDarkMode ? styles.darkTotalAmount : styles.lightTotalAmount,
                isRTL && styles.rtlText,
              ]}>
              {t('bottomSheet.currency')} {service.price * units}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.continueButton,
              {
                backgroundColor: isDarkMode ? '#29303C' : Colors.primary,
              },
            ]}
            onPress={() => {
              if (selectedDate && selectedTime) {
                serviceBooked();
              } else {
                Toast.show({
                  type: 'error',
                  text2: t('bottomSheet.selectDateTime'),
                });
              }
            }}>
            <Text style={[styles.continueButtonText, isRTL && styles.rtlText]}>
              {t('bottomSheet.continue')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  darkCard: {
    backgroundColor: Colors.navBg,
  },
  lightCard: {
    backgroundColor: Colors.pureWhite,
  },
  darkText: {
    color: Colors.pureWhite,
  },
  lightText: {
    color: '#333',
  },
  darkTotalAmount: {
    color: Colors.pureWhite,
  },
  lightTotalAmount: {
    color: Colors.primaryDark,
  },
  darkTotalLabel: {
    color: Colors.darkLightGray,
  },
  lightTotalLabel: {
    color: '#666',
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionHeader: {
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
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    padding: 8,
    // backgroundColor: '#EFEFEF',
    borderRadius: 50,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFBC99',
    borderRadius: 12,
    marginBottom: 16,
  },
  timePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#D1FAE5',
    borderRadius: 12,
    marginBottom: 24,
  },
  datePickerIcon: {
    marginRight: 16,
  },
  timePickerIcon: {
    marginRight: 16,
  },
  datePickerLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  timePickerLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  datePickerValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  timePickerValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  bottomSheetFooter: {
    marginTop: 'auto',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalText: {
    fontSize: 16,
    color: '#666',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  continueButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  rtlText: {
    textAlign: 'right',
  },
});

export default BottomSheet;
