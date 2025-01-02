import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

import {onboarding} from '../../constants/data';
import Colors from '../../constants/colors';
import images from '../../constants/images';
import {useCustomTheme} from '../../theme/Theme';

const {width, height} = Dimensions.get('window');

const Onboarding = () => {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const theme = useCustomTheme();

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (swiperRef.current && currentIndex < onboarding.length - 1) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handleSkip = () => {
    navigation.replace('SignIn');
  };

  const handleGetStarted = () => {
    navigation.replace('SignIn');
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme === 'dark' ? Colors.primaryDark : Colors.pureWhite,
        },
      ]}>
      <Image source={images.onboardingTop} style={styles.topImage} />

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        style={styles.wrapper}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        loop={false}
        showsPagination={false}
        onIndexChanged={index => setCurrentIndex(index)}>
        {onboarding.map((item, index) => (
          <View key={item.id} style={styles.slide}>
            <View style={styles.imageWrapper}>
              <Image source={item.image} style={styles.image} />
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.paginationContainer}>
                <View style={styles.pagination}>
                  {onboarding.map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.dot,
                        currentIndex === i && styles.activeDot,
                      ]}
                    />
                  ))}
                </View>
              </View>

              <Text
                style={[
                  styles.title,
                  {color: theme === 'dark' ? Colors.pureWhite : Colors.black},
                ]}>
                {item.title}
              </Text>
              <Text
                style={[
                  styles.description,
                  {
                    color:
                      theme === 'dark'
                        ? Colors.darkLightGray
                        : Colors.lightBlack,
                  },
                ]}>
                {item.description}
              </Text>

              {index === onboarding.length - 1 ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleGetStarted}>
                  <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={handleNext}>
                  <Icon name="right" size={20} color="#fff" />
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
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
