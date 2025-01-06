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

const propertyTypes = [
  {
    id: 1,
    title: 'Home',
    icon: 'home-outline',
  },
  {
    id: 2,
    title: 'Office',
    icon: 'office-building',
  },
  {
    id: 3,
    title: 'Villa',
    icon: 'store-outline',
  },
];

const ServiceDetails = () => {
  const route = useRoute();
  const theme = useCustomTheme();
  const navigation = useNavigation();

  const isDarkMode = theme === 'dark';
  const {service} = route.params;

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [units, setUnits] = useState(2);
  const [bedrooms, setBedrooms] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Image Section */}
        <View style={styles.imageContainer}>
          <Image source={service.image} style={styles.headerImage} />
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
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.indicator} />
            <Text style={styles.sectionTitle}>Type of Property</Text>
          </View>
          <View style={styles.propertyTypes}>
            {propertyTypes.map(type => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.propertyItem,
                  selectedProperty === type.id && styles.selectedProperty,
                ]}
                onPress={() => setSelectedProperty(type.id)}>
                <IconTwo
                  name={type.icon}
                  size={24}
                  color={selectedProperty === type.id ? '#FFF' : '#666'}
                />
                <Text
                  style={[
                    styles.propertyText,
                    selectedProperty === type.id && styles.selectedPropertyText,
                  ]}>
                  {type.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Units Counter */}
        <View style={styles.section}>
          <Text style={styles.counterLabel}>Number of Units</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => units > 0 && setUnits(units - 1)}>
              <Icon name="remove" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.counterValue}>{units}</Text>
            <TouchableOpacity
              style={[styles.counterButton, styles.incrementButton]}
              onPress={() => setUnits(units + 1)}>
              <Icon name="add" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bedrooms Counter */}
        <View style={styles.section}>
          <Text style={styles.counterLabel}>Number of Bedrooms</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => bedrooms > 0 && setBedrooms(bedrooms - 1)}>
              <Icon name="remove" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.counterValue}>{bedrooms}</Text>
            <TouchableOpacity
              style={[styles.counterButton, styles.incrementButton]}
              onPress={() => setBedrooms(bedrooms + 1)}>
              <Icon name="add" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>USD {service.price}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.draftButton}>
              <Text style={styles.draftButtonText}>Save Draft</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imageContainer: {
    height: 270,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 6,
    borderRadius: 8,
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 90,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FB9450',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  ratingText: {
    color: '#FFF',
    marginLeft: 4,
    fontWeight: '600',
    fontSize: 12,
  },
  serviceTitle: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    width: '50%',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  indicator: {
    width: 4,
    height: 20,
    backgroundColor: '#6C63FF',
    borderRadius: 2,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  propertyTypes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  propertyItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  selectedProperty: {
    backgroundColor: '#6C63FF',
  },
  propertyText: {
    marginTop: 8,
    color: '#666',
  },
  selectedPropertyText: {
    color: '#FFF',
  },
  counterLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
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
    marginHorizontal: 24,
  },
  bottomSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  draftButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6C63FF',
    alignItems: 'center',
  },
  draftButtonText: {
    color: '#6C63FF',
    fontWeight: '600',
  },
  bookButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});

export default ServiceDetails;
