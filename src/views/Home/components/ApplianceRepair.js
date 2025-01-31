import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons';

import images from '../../../constants/images';
import {useCustomTheme} from '../../../theme/Theme';
import Colors from '../../../constants/colors';
import useDirection from '../../../hooks/useDirection';

const ApplianceRepair = () => {
  const theme = useCustomTheme();
  const isDarkMode = theme === 'dark';
  const {t} = useTranslation();
  const {isRTL} = useDirection();

  return (
    <View>
      <View style={[styles.titleContainer, isRTL && styles.titleContainerRTL]}>
        <View style={styles.indicator} />
        <Text
          style={[
            styles.title,
            {color: isDarkMode ? Colors.white : Colors.black},
            isRTL && styles.textRTL,
          ]}>
          {t('applianceRepair.title')}
        </Text>
      </View>

      <TouchableOpacity style={styles.offerCard}>
        <Image
          source={images.ApplianceTwo}
          style={styles.applianceImage}
          resizeMode="contain"
        />

        <View
          style={[styles.contentOverlay, isRTL && styles.contentOverlayRTL]}>
          <View
            style={[styles.offerTitleRow, isRTL && styles.offerTitleRowRTL]}>
            <Text style={[styles.offerTitle, isRTL && styles.textRTL]}>
              {t('applianceRepair.dryCleaningOffer.title')}
            </Text>
            <IconTwo name="information" size={18} color="#33383F" />
          </View>

          <Text style={[styles.discountText, isRTL && styles.textRTL]}>
            {t('applianceRepair.dryCleaningOffer.discount')}
          </Text>

          <TouchableOpacity
            style={[styles.grabButton, isRTL && styles.grabButtonRTL]}>
            <Text style={[styles.grabButtonText, isRTL && styles.textRTL]}>
              {t('applianceRepair.dryCleaningOffer.action')}
            </Text>
            <Icon
              name={isRTL ? 'chevron-back' : 'chevron-forward'}
              size={20}
              color="#A492EB"
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  titleContainerRTL: {
    flexDirection: 'row-reverse',
  },
  indicator: {
    width: 4,
    height: 20,
    backgroundColor: '#CABDFF',
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#172B4D',
  },
  textRTL: {
    textAlign: 'right',
  },
  offerCard: {
    width: '100%',
    height: 215,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  applianceImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentOverlay: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
  },
  contentOverlayRTL: {
    alignItems: 'flex-end',
  },
  offerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 5,
  },
  offerTitleRowRTL: {
    flexDirection: 'row-reverse',
  },
  offerTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#33383F',
  },
  discountText: {
    fontSize: 42,
    fontWeight: '600',
    color: '#1A1D1F',
    marginTop: 4,
    marginBottom: 8,
  },
  grabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  grabButtonRTL: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-start',
  },
  grabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#A492EB',
    marginRight: 4,
  },
});

export default ApplianceRepair;
