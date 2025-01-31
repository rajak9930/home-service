import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../constants/colors';
import {useCustomTheme} from '../../../theme/Theme';
import {useTranslation} from 'react-i18next';
import useDirection from '../../../hooks/useDirection';

const NumberOfUnits = ({units, setUnits, bedrooms, setBedrooms}) => {
  const theme = useCustomTheme();
  const isDarkMode = theme === 'dark';
  const {t} = useTranslation();
  const {isRTL} = useDirection();

  return (
    <View>
      <View style={[styles.container, styles.firstContainer]}>
        <View
          style={[
            styles.cardWrapper,
            isDarkMode ? styles.darkCardWrapper : styles.lightCardWrapper,
          ]}>
          {/* Number of Units Card */}
          <View
            style={[
              styles.card,
              {flexDirection: isRTL ? 'row-reverse' : 'row'},
            ]}>
            <Text
              style={[
                styles.counterLabel,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}>
              {t('units.numberOfUnits')}
            </Text>
            <View
              style={[
                styles.counterContainer,
                {flexDirection: isRTL ? 'row-reverse' : 'row'},
              ]}>
              <TouchableOpacity
                style={[
                  styles.counterButton,
                  isDarkMode
                    ? styles.darkCounterButton
                    : styles.lightCounterButton,
                ]}
                onPress={() => units > 0 && setUnits(units - 1)}>
                <Icon
                  name="remove"
                  size={24}
                  color={isDarkMode ? Colors.pureWhite : '#333'}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.counterValue,
                  isDarkMode ? styles.darkText : styles.lightText,
                ]}>
                {units}
              </Text>
              <TouchableOpacity
                style={[styles.counterButton, styles.incrementButton]}
                onPress={() => setUnits(units + 1)}>
                <Icon name="add" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Number of Bedrooms Card */}
          <View
            style={[
              styles.noPaddingCard,
              {flexDirection: isRTL ? 'row-reverse' : 'row'},
            ]}>
            <Text
              style={[
                styles.counterLabel,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}>
              {t('units.numberOfBedrooms')}
            </Text>
            <View
              style={[
                styles.counterContainer,
                {flexDirection: isRTL ? 'row-reverse' : 'row'},
              ]}>
              <TouchableOpacity
                style={[
                  styles.counterButton,
                  isDarkMode
                    ? styles.darkCounterButton
                    : styles.lightCounterButton,
                ]}
                onPress={() => bedrooms > 0 && setBedrooms(bedrooms - 1)}>
                <Icon
                  name="remove"
                  size={24}
                  color={isDarkMode ? Colors.pureWhite : '#333'}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.counterValue,
                  isDarkMode ? styles.darkText : styles.lightText,
                ]}>
                {bedrooms}
              </Text>
              <TouchableOpacity
                style={[styles.counterButton, styles.incrementButton]}
                onPress={() => setBedrooms(bedrooms + 1)}>
                <Icon name="add" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  firstContainer: {
    marginTop: 16,
  },
  cardWrapper: {
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lightCardWrapper: {
    backgroundColor: Colors.pureWhite,
  },
  darkCardWrapper: {
    backgroundColor: Colors.navBg,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    paddingBottom: 16,
    marginBottom: 16,
  },
  noPaddingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  counterLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  lightText: {
    color: '#333',
  },
  darkText: {
    color: Colors.pureWhite,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightCounterButton: {
    backgroundColor: Colors.pureWhite,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  darkCounterButton: {
    backgroundColor: '#272D37',
    borderColor: '#535763',
    borderWidth: 2,
  },
  incrementButton: {
    backgroundColor: '#6C63FF',
  },
  counterValue: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 19,
  },
});

export default NumberOfUnits;
