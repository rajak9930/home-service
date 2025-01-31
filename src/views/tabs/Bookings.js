import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import Colors from '../../constants/colors';
import {useCustomTheme} from '../../theme/Theme';
import useDirection from '../../hooks/useDirection';
import Draft from '../Bookings/components/Draft';
import Upcoming from '../Bookings/components/Upcoming';
import History from '../Bookings/components/History';

const Bookings = () => {
  const theme = useCustomTheme();
  const {t} = useTranslation();
  const {isRTL} = useDirection();
  const isDarkMode = theme === 'dark';

  const tabs = [
    {id: 'upcoming', label: t('bookings.tabs.upcoming')},
    {id: 'history', label: t('bookings.tabs.history')},
    {id: 'draft', label: t('bookings.tabs.draft')},
  ];

  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}>
      <View
        style={[
          styles.titleContainer,
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
            styles.title,
            isDarkMode && styles.darkText,
            isRTL && styles.rtlText,
          ]}>
          {t('bookings.title')}
        </Text>
      </View>

      <View
        style={[
          styles.tabsHeader,
          {
            backgroundColor: isDarkMode ? Colors.navBg : Colors.pureWhite,
          },
        ]}>
        <View
          style={[
            styles.tabContainer,
            {flexDirection: isRTL ? 'row-reverse' : 'row'},
          ]}>
          {(isRTL ? [...tabs].reverse() : tabs).map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                isDarkMode ? styles.darkTab : styles.lightTab,
                activeTab === tab.id &&
                  (isDarkMode ? styles.darkActiveTab : styles.lightActiveTab),
                {marginRight: isRTL ? 0 : 8, marginLeft: isRTL ? 8 : 0},
              ]}
              onPress={() => setActiveTab(tab.id)}>
              <Text
                style={[
                  styles.tabText,
                  isDarkMode ? styles.darkTabText : styles.lightTabText,
                  activeTab === tab.id &&
                    (isDarkMode
                      ? styles.darkActiveTabText
                      : styles.lightActiveTabText),
                  isRTL && styles.rtlText,
                ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.wrap}>
        <View style={styles.bodyWrap}>
          {activeTab === 'upcoming' ? (
            <Upcoming />
          ) : activeTab === 'history' ? (
            <History />
          ) : (
            <Draft />
          )}
        </View>
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
  wrap: {
    marginBottom: 16,
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 8,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  lightTab: {
    backgroundColor: 'transparent',
  },
  darkTab: {
    backgroundColor: 'transparent',
  },
  lightActiveTab: {
    backgroundColor: Colors.primary + '20',
  },
  darkActiveTab: {
    backgroundColor: '#3B414D',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  lightTabText: {
    color: Colors.lightGray,
  },
  darkTabText: {
    color: Colors.darkLightGray,
  },
  lightActiveTabText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  darkActiveTabText: {
    color: Colors.pureWhite,
    fontWeight: '600',
  },
  indicator: {
    width: 4,
    height: 20,
    backgroundColor: '#CABDFF',
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  darkText: {
    color: Colors.pureWhite,
  },
  bodyWrap: {
    flex: 1,
  },
  rtlText: {
    writingDirection: 'rtl',
  },
});

export default Bookings;
