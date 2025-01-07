import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCustomTheme} from '../../../theme/Theme';
import Colors from '../../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import NumberOfUnits from './NumberOfUnits';
import {propertyTypes} from '../../../constants/data';
import {thousandSeparator} from '../../../utils';
import RichTextEditor from './RichTextEditor';

const ServiceDetails = () => {
  const route = useRoute();
  const theme = useCustomTheme();
  const navigation = useNavigation();

  const isDarkMode = theme === 'dark';
  const {service} = route.params;

  const [selectedProperty, setSelectedProperty] = useState(2);
  const [units, setUnits] = useState(2);
  const [bedrooms, setBedrooms] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleContentChange = content => {
    console.log('Content changed:', content);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    // Cleanup listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? '#15162E' : Colors.primaryLight,
        },
      ]}>
      <View style={styles.contentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            isKeyboardVisible && styles.scrollContentWithKeyboard,
          ]}>
          {/* Header Image Section */}
          <View style={styles.imageContainer}>
            <Image source={service.image} style={styles.headerImage} />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              style={[
                styles.gradient,
                {
                  height: isDarkMode ? '100%' : '50%',
                },
              ]}
            />
            <TouchableOpacity
              style={[styles.backButton]}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color={Colors.primaryDark} />
            </TouchableOpacity>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={13} color="#FFF" />
              <Text style={styles.ratingText}>{service.rating}</Text>
            </View>
            <Text style={styles.serviceTitle}>{service.title}</Text>
          </View>

          {/* Property Type Section */}
          <View style={styles.propertyTypeContainer}>
            <View
              style={[
                styles.propertyTypeCard,
                {
                  backgroundColor: isDarkMode ? Colors.navBg : Colors.pureWhite,
                },
              ]}>
              <View style={styles.sectionHeader}>
                <View style={styles.indicator} />
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: isDarkMode ? Colors.pureWhite : '#333',
                    },
                  ]}>
                  Type of Property
                </Text>
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
                        {
                          borderColor: isDarkMode
                            ? '#535763'
                            : Colors.darkLightGray,
                          backgroundColor: isDarkMode
                            ? '#272D37'
                            : Colors.pureWhite,
                        },
                        selectedProperty === type.id && {
                          backgroundColor: Colors.primary,
                          borderWidth: 0,
                        },
                      ]}>
                      <IconTwo
                        name={type.icon}
                        size={29}
                        color={
                          selectedProperty === type.id ? '#FFF' : '#D1D3D4'
                        }
                      />
                    </View>
                    <Text
                      style={[
                        styles.propertyText,
                        {
                          color: isDarkMode
                            ? Colors.pureWhite
                            : Colors.primaryDark,
                        },
                      ]}>
                      {type.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Bedrooms Counter */}
          <NumberOfUnits
            units={units}
            setUnits={setUnits}
            bedrooms={bedrooms}
            setBedrooms={setBedrooms}
          />

          <RichTextEditor
            initialContent=""
            onChangeContent={handleContentChange}
            placeholder="Write your description here..."
          />

          {/* Add padding at the bottom only when keyboard is not shown */}
          {!isKeyboardVisible && <View style={styles.bottomPadding} />}
        </ScrollView>

        {/* Bottom Section - Hidden when keyboard is visible */}
        {!isKeyboardVisible && (
          <Animated.View
            style={[
              styles.bottomSection,
              {
                backgroundColor: isDarkMode ? '#0F1621' : Colors.pureWhite,
              },
            ]}>
            <View style={styles.totalContainer}>
              <Text
                style={[
                  styles.totalLabel,
                  {
                    color: isDarkMode ? Colors.darkLightGray : '#666',
                  },
                ]}>
                Total:
              </Text>
              <Text
                style={[
                  styles.totalAmount,
                  {
                    color: isDarkMode ? Colors.pureWhite : Colors.primaryDark,
                  },
                ]}>
                USD {thousandSeparator(service.price * units)}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.draftButton,
                  {
                    backgroundColor: isDarkMode ? '#272D37' : Colors.pureWhite,
                    borderColor: isDarkMode ? '#535763' : Colors.primary,
                    borderWidth: isDarkMode ? 2 : 1,
                  },
                ]}>
                <Text
                  style={[
                    styles.draftButtonText,
                    {
                      color: isDarkMode ? Colors.darkLightGray : Colors.primary,
                    },
                  ]}>
                  Save Draft
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryLight,
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    flexGrow: 1,
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
    zIndex: 2,
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
    position: 'relative',
    zIndex: 3,
  },
  propertyTypeCard: {
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
    width: 60,
    height: 60,
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
  bottomPadding: {
    height: 30,
  },
  bottomSection: {
    backgroundColor: Colors.pureWhite,
    // borderTopLeftRadius: 24,
    // borderTopRightRadius: 24,
    padding: 16,
    paddingBottom: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    color: Colors.primaryDark,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  draftButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
  },
  draftButtonText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  bookButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  bookButtonText: {
    color: Colors.pureWhite,
    fontWeight: '600',
  },
});

export default ServiceDetails;
