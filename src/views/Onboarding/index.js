import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {onboarding} from '../../constants/data';
import Colors from '../../constants/colors';
import images from '../../constants/images';

const {width, height} = Dimensions.get('window');

const Onboarding = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={images.onboardingTop} style={styles.topImage} />

      <TouchableOpacity style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Swiper
        style={styles.wrapper}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        loop={false}
        renderPagination={(index, total, context) => (
          <View style={styles.paginationContainer}>
            <View style={styles.pagination}>
              {onboarding.map((_, i) => (
                <View
                  key={i}
                  style={[styles.dot, index === i && styles.activeDot]}
                />
              ))}
            </View>
          </View>
        )}>
        {onboarding.map((item, index) => (
          <View key={item.id} style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>

            {index === onboarding.length - 1 ? (
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.nextButton}>
                <Icon name="arrow-forward" size={24} color="#fff" />
              </TouchableOpacity>
            )}
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
    backgroundColor: '#fff',
  },
  topImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'contain',
  },
  skipButton: {
    position: 'absolute',
    top: 19,
    right: 19,
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
  slide: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  image: {
    height: 380,
    width: 195,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: Colors.lightGray,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D8D8D8',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  nextButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
