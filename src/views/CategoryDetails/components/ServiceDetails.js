import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCustomTheme} from '../../../theme/Theme';
import Colors from '../../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import NumberOfUnits from './NumberOfUnits';
import {propertyTypes} from '../../../constants/data';

const ServiceDetails = () => {
  const route = useRoute();
  const theme = useCustomTheme();
  const navigation = useNavigation();

  const isDarkMode = theme === 'dark';
  const {service} = route.params;

  const [selectedProperty, setSelectedProperty] = useState(2);
  const [units, setUnits] = useState(2);
  const [bedrooms, setBedrooms] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Image Section */}
        <View style={styles.imageContainer}>
          <Image source={service.image} style={styles.headerImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          />
          <TouchableOpacity
            style={[
              styles.backButton,
              {
                backgroundColor: isDarkMode
                  ? Colors.primaryDark
                  : Colors.primaryLight,
              },
            ]}
            onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back"
              size={24}
              color={isDarkMode ? Colors.pureWhite : '#333'}
            />
          </TouchableOpacity>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={13} color="#FFF" />
            <Text style={styles.ratingText}>{service.rating}</Text>
          </View>
          <Text style={styles.serviceTitle}>{service.title}</Text>
        </View>

        {/* Property Type Section */}
        <View style={styles.propertyTypeContainer}>
          <View style={styles.propertyTypeCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.indicator} />
              <Text style={styles.sectionTitle}>Type of Property</Text>
            </View>
            <View style={styles.propertyTypes}>
              {propertyTypes.map(type => (
                <TouchableOpacity
                  key={type.id}
                  style={[styles.propertyItem]}
                  onPress={() => setSelectedProperty(type.id)}>
                  <View
                    style={[
                      styles.iconContainer,
                      selectedProperty === type.id && styles.selectedProperty,
                    ]}>
                    <IconTwo
                      name={type.icon}
                      size={29}
                      color={selectedProperty === type.id ? '#FFF' : '#D1D3D4'}
                    />
                  </View>
                  <Text style={[styles.propertyText]}>{type.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Bedrooms Counter */}
        <NumberOfUnits />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryLight,
  },
  imageContainer: {
    height: 270,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 70,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FB9450',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    zIndex: 2,
  },
  ratingText: {
    color: Colors.pureWhite,
    marginLeft: 4,
    fontWeight: '600',
    fontSize: 12,
  },
  serviceTitle: {
    position: 'absolute',
    bottom: 30,
    left: 16,
    color: Colors.pureWhite,
    fontSize: 28,
    fontWeight: 'bold',
    zIndex: 2,
  },
  propertyTypeContainer: {
    paddingHorizontal: 16,
    marginTop: -20,
  },
  propertyTypeCard: {
    backgroundColor: Colors.pureWhite,
    borderRadius: 8,
    zIndex: 2,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  indicator: {
    width: 4,
    height: 20,
    backgroundColor: '#CABDFF',
    borderRadius: 2,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  propertyTypes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  propertyItem: {
    alignItems: 'center',
    width: '30%',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderColor: Colors.darkLightGray,
    borderWidth: 2,
  },
  selectedProperty: {
    backgroundColor: Colors.primary,
    borderWidth: 0,
  },
  propertyText: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.primaryDark,
    fontWeight: '400',
  },
});

export default ServiceDetails;
