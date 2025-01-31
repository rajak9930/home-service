import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  I18nManager, // Import I18nManager
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import Colors from '../../constants/colors';
import images from '../../constants/images';
import {useCustomTheme} from '../../theme/Theme';
import useDirection from '../../hooks/useDirection';

const {width, height} = Dimensions.get('window');

const Onboarding = () => {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const theme = useCustomTheme();
  const {t} = useTranslation();
  const {isRTL} = useDirection();

  const onboardingData = [
    {
      id: 1,
      title: t('onboarding.screens.beautySalon.title'),
      description: t('onboarding.screens.beautySalon.description'),
      image: images.onboardingOne,
    },
    {
      id: 2,
      title: t('onboarding.screens.plumber.title'),
      description: t('onboarding.screens.plumber.description'),
      image: images.onboardingTwo,
    },
    {
      id: 3,
      title: t('onboarding.screens.cleaning.title'),
      description: t('onboarding.screens.cleaning.description'),
      image: images.onboardingThree,
    },
  ];

  const isDarkMode = theme === 'dark';
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (swiperRef.current && currentIndex < onboardingData.length - 1) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handleSkip = () => {
    navigation.replace('SignIn');
  };

  const handleGetStarted = () => {
    navigation.replace('SignIn');
  };

  // If RTL, reverse the data array to maintain correct order
  const displayData = isRTL ? [...onboardingData].reverse() : onboardingData;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? Colors.primaryDark : Colors.pureWhite,
        },
      ]}>
      <Image source={images.onboardingTop} style={styles.topImage} />
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>{t('onboarding.skip')}</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        style={styles.wrapper}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        loop={false}
        showsPagination={false}
        onIndexChanged={index => setCurrentIndex(index)}
        horizontal={true}
        // Set the initial page to last for RTL
        index={isRTL ? onboardingData.length - 1 : 0}
        // Force RTL direction
        dir="rtl">
        {displayData.map((item, index) => (
          <View key={item.id} style={styles.slide}>
            <View style={styles.imageWrapper}>
              <Image source={item.image} style={styles.image} />
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.paginationContainer}>
                <View
                  style={[
                    styles.pagination,
                    {flexDirection: isRTL ? 'row-reverse' : 'row'},
                  ]}>
                  {onboardingData.map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.dot,
                        isRTL
                          ? onboardingData.length - 1 - currentIndex === i &&
                            styles.activeDot
                          : currentIndex === i && styles.activeDot,
                      ]}
                    />
                  ))}
                </View>
              </View>

              <Text
                style={[
                  styles.title,
                  {color: isDarkMode ? Colors.pureWhite : Colors.black},
                ]}>
                {item.title}
              </Text>
              <Text
                style={[
                  styles.description,
                  {
                    color: isDarkMode
                      ? Colors.darkLightGray
                      : Colors.lightBlack,
                  },
                ]}>
                {item.description}
              </Text>

              {index === (isRTL ? 0 : onboardingData.length - 1) ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleGetStarted}>
                  <Text style={styles.buttonText}>
                    {t('onboarding.getStarted')}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={() => {
                    isRTL
                      ? swiperRef.current.scrollBy(-1)
                      : swiperRef.current.scrollBy(1);
                  }}>
                  <Icon
                    name={isRTL ? 'left' : 'right'}
                    size={20}
                    color={Colors.pureWhite}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    width: width,
    height: height * 0.5,
    marginTop: 50,
  },
  image: {
    width: width,
    height: '100%',
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  paginationContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 15,
    paddingHorizontal: 50,
  },
  description: {
    fontSize: 15,
    color: Colors.lightGray,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 30,
    fontWeight: '500',
  },
  topImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
  skipButton: {
    position: 'absolute',
    top: 17,
    right: 17,
    backgroundColor: '#B5EBCD',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1,
  },
  skipText: {
    color: '#2C2B46',
    fontWeight: '500',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D8D8D8',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  nextButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: Colors.pureWhite,
    fontSize: 16,
    fontWeight: '600',
  },
});
