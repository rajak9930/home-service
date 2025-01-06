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
import {sliderData} from '../../constants/data';

const Slider = () => {
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
          {sliderData.map((item, index) => (
            <View key={item.id} style={styles.slide}>
              <View style={[styles.card, {backgroundColor: item.bgColor}]}>
                <View style={styles.headerContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Icon
                    name="information-circle-outline"
                    size={20}
                    color="#333"
                  />
                </View>

                <Text style={styles.discountText}>Get {item.discount}</Text>

                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Grab Offer</Text>
                  <Icon name="chevron-forward" size={16} color="#333" />
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
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  discountText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#333',
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
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginRight: 4,
  },
});

export default Slider;
