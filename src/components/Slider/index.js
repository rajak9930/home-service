import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import {sliderData} from '../../constants/data';
import useDirection from '../../hooks/useDirection';

const Slider = () => {
  const {t} = useTranslation();
  const {isRTL} = useDirection();

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Swiper
          autoplay
          autoplayTimeout={3}
          showsPagination={false}
          loop={true}
          removeClippedSubviews={false}
          loadMinimal={true}
          loadMinimalSize={2}
          index={0}
          scrollEnabled={true}>
          {sliderData.map(item => (
            <View key={item.id} style={styles.slide}>
              <View style={[styles.card, {backgroundColor: item.bgColor}]}>
                <View
                  style={[
                    styles.headerContainer,
                    isRTL && styles.rtlHeaderContainer,
                  ]}>
                  <Text style={[styles.title, isRTL && styles.rtlText]}>
                    {t(item.titleKey)}
                  </Text>
                  <Icon
                    name="information-circle-outline"
                    size={20}
                    color="#333"
                  />
                </View>

                <Text style={[styles.discountText, isRTL && styles.rtlText]}>
                  {isRTL
                    ? `${item.discount} ${t('slider.discount.get')}`
                    : `${t('slider.discount.get')} ${item.discount}`}
                </Text>

                <TouchableOpacity
                  style={[styles.button, isRTL && styles.rtlButton]}>
                  <Text
                    style={[styles.buttonText, isRTL && styles.rtlButtonText]}>
                    {t('slider.action.grabOffer')}
                  </Text>
                  <Icon
                    name={isRTL ? 'chevron-back' : 'chevron-forward'}
                    size={16}
                    color="#333"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Swiper>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    height: 160,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: Dimensions.get('window').width - 65,
    height: 160,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rtlHeaderContainer: {
    flexDirection: 'row-reverse',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'left',
  },
  rtlText: {
    textAlign: 'right',
  },
  discountText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  rtlButton: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginRight: 4,
  },
  rtlButtonText: {
    marginRight: 0,
    marginLeft: 4,
  },
});

export default Slider;
