import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../constants/colors';
import {useCustomTheme} from '../../../theme/Theme';

const NumberOfUnits = ({units, setUnits, bedrooms, setBedrooms}) => {
  const theme = useCustomTheme();

  const isDarkMode = theme === 'dark';

  return (
    <View>
      <View style={[styles.container, styles.firstContainer]}>
        <View
          style={[
            styles.cardWrapper,
            {
              backgroundColor: isDarkMode ? Colors.navBg : Colors.pureWhite,
            },
          ]}>
          <View style={styles.card}>
            <Text
              style={[
                styles.counterLabel,
                {
                  color: isDarkMode ? Colors.pureWhite : '#333',
                },
              ]}>
              Number of Units
            </Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={[
                  styles.counterButton,
                  {
                    borderColor: isDarkMode ? '#535763' : Colors.darkLightGray,
                    backgroundColor: isDarkMode ? '#272D37' : Colors.pureWhite,
                    borderWidth: isDarkMode ? 2 : 0,
                  },
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
                  {
                    color: isDarkMode ? Colors.pureWhite : '#333',
                  },
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

          <View>
            <View>
              <View
                style={[
                  styles.card,
                  {
                    marginBottom: 0,
                    borderBottomWidth: 0,
                    paddingBottom: 0,
                  },
                ]}>
                <Text
                  style={[
                    styles.counterLabel,
                    {
                      color: isDarkMode ? Colors.pureWhite : '#333',
                    },
                  ]}>
                  Number of Bedrooms
                </Text>
                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    style={[
                      styles.counterButton,
                      {
                        borderColor: isDarkMode
                          ? '#535763'
                          : Colors.darkLightGray,
                        backgroundColor: isDarkMode
                          ? '#272D37'
                          : Colors.pureWhite,
                        borderWidth: isDarkMode ? 2 : 0,
                      },
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
                      {
                        color: isDarkMode ? Colors.pureWhite : '#333',
                      },
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
      </View>
      {/* Bedrooms */}
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
    backgroundColor: Colors.pureWhite,
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
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    paddingBottom: 16,
    marginBottom: 16,
  },
  counterLabel: {
    fontSize: 15,
    fontWeight: '600',
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
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
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
