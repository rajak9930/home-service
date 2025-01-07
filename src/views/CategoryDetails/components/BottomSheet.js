import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from '../../../constants/colors';
import {useCustomTheme} from '../../../theme/Theme';
import {formatDate, formatTime} from '../../../utils';

const BottomSheet = ({
  setIsBottomSheetVisible,
  service,
  units,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}) => {
  const theme = useCustomTheme();

  const isDarkMode = theme === 'dark';

  // const [selectedDate, setSelectedDate] = useState(null);
  // const [selectedTime, setSelectedTime] = useState(null);
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
    return selectedDate ? formatDate(selectedDate) : 'Select your Date';
  };

  const getEndTime = startTime => {
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);
    return endTime;
  };

  const getTimeDisplayText = () => {
    if (!selectedTime) {
      return 'Select your Time';
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
        <View style={styles.bottomSheetHeader}>
          <View style={styles.sectionHeader}>
            <View style={styles.indicator} />
            <Text
              style={[
                styles.bottomSheetTitle,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}>
              Select your Date & Time?
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
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}>
          <View style={styles.datePickerIcon}>
            <Icon name="calendar-outline" size={24} color="#666" />
          </View>
          <View>
            <Text style={styles.datePickerLabel}>DATE</Text>
            <Text style={styles.datePickerValue}>{getDateDisplayText()}</Text>
          </View>
        </TouchableOpacity>

        {/* Time Selection */}
        <TouchableOpacity
          style={styles.timePickerButton}
          onPress={() => setShowTimePicker(true)}>
          <View style={styles.timePickerIcon}>
            <Icon name="time-outline" size={24} color="#666" />
          </View>
          <View>
            <Text style={styles.timePickerLabel}>TIME</Text>
            <Text style={styles.timePickerValue}>{getTimeDisplayText()}</Text>
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
          <View style={styles.totalRow}>
            <Text
              style={[
                styles.totalText,
                isDarkMode ? styles.darkTotalLabel : styles.lightTotalLabel,
              ]}>
              Total:
            </Text>
            <Text
              style={[
                styles.priceText,
                isDarkMode ? styles.darkTotalAmount : styles.lightTotalAmount,
              ]}>
              USD {service.price * units}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.continueButton,
              styles.continueButtonText,
              {
                backgroundColor: isDarkMode ? '#29303C' : Colors.primary,
              },
            ]}>
            <Text style={styles.continueButtonText}>Continue</Text>
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
});

export default BottomSheet;
