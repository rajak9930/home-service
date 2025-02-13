import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';

import {useCustomTheme} from '../../../theme/Theme';
import Colors from '../../../constants/colors';
import NumberOfUnits from './NumberOfUnits';
import {propertyTypes} from '../../../constants/data';
import {thousandSeparator} from '../../../utils';
import RichTextEditor from './RichTextEditor';
import BottomSheet from './BottomSheet';
import {useDispatch} from 'react-redux';
import {
  selectedDraftService,
  setDraftService,
} from '../../../redux/draftService/draftServiceSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTypedSelector from '../../../hooks/useTypedSelector';
import Toast from 'react-native-toast-message';
import {setBookedService} from '../../../redux/bookedService/bookedServiceSlice';
import {useTranslation} from 'react-i18next';
import useDirection from '../../../hooks/useDirection';

const ServiceDetails = () => {
  const route = useRoute();
  const theme = useCustomTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {isRTL} = useDirection();

  const isDarkMode = theme === 'dark';
  const {service} = route.params;
  const draftService = useTypedSelector(selectedDraftService);

  const [selectedProperty, setSelectedProperty] = useState(2);
  const [units, setUnits] = useState(2);
  const [bedrooms, setBedrooms] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [description, setDescription] = useState('');

  const serviceBooked = () => {
    const data = {
      service,
      selectedProperty,
      units,
      bedrooms,
      description,
      selectedDate,
      selectedTime,
    };
    dispatch(setBookedService(data));
    AsyncStorage.setItem('bookedService', JSON.stringify(data));

    setTimeout(() => {
      navigation.navigate('Main', {
        screen: 'TabNavigator',
        params: {
          screen: 'Bookings',
        },
      });
    }, 1000);
    setIsBottomSheetVisible(false);
  };

  const handleContentChange = content => {
    // console.log('Content changed:', content);
    setDescription(content);
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

  const handleSavedDraft = data => {
    const isExisting = draftService?.some(
      item => item.service.id === service.id,
    );

    dispatch(setDraftService(data));

    const newData = isExisting
      ? draftService.filter(item => item.service.id !== service.id)
      : [...(draftService || []), data];

    AsyncStorage.setItem('draftService', JSON.stringify(newData));

    Toast.show({
      type: isExisting ? 'success' : 'success',
      text2: isExisting
        ? 'Service removed from drafts'
        : 'Service saved to drafts',
    });
  };

  const isDraftSaved = draftService?.some(
    item => item.service.id === service.id,
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}>
      {/* Main Content with Blur */}

      <View style={styles.contentContainer}>
        {isBottomSheetVisible && (
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType={isDarkMode ? 'dark' : 'light'}
            blurAmount={3}
            reducedTransparencyFallbackColor="white"
          />
        )}

        <ScrollView
          style={{opacity: isBottomSheetVisible ? 0.3 : 1}}
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
                isDarkMode ? styles.darkGradient : styles.lightGradient,
              ]}
            />

            <TouchableOpacity
              style={[styles.backButton]}
              onPress={() => navigation.goBack()}>
              <Icon
                name={isRTL ? 'arrow-back' : 'arrow-back'}
                size={24}
                color={Colors.primaryDark}
              />
            </TouchableOpacity>

            <View
              style={[
                styles.ratingContainer,
                {left: isRTL ? null : 16, right: isRTL ? 16 : null},
                {flexDirection: isRTL ? 'row-reverse' : 'row'},
              ]}>
              <Icon name="star" size={13} color="#FFF" />
              <Text
                style={[
                  styles.ratingText,
                  {marginLeft: isRTL ? 0 : 4, marginRight: isRTL ? 4 : 0},
                ]}>
                {service.rating}
              </Text>
            </View>

            <Text
              style={[
                styles.serviceTitle,
                {left: isRTL ? null : 16, right: isRTL ? 16 : null},
                isRTL && styles.rtlText,
              ]}>
              {t(service.title)}
            </Text>
          </View>

          {/* Property Type Section */}
          <View style={styles.propertyTypeContainer}>
            <View
              style={[
                styles.propertyTypeCard,
                isDarkMode ? styles.darkCard : styles.lightCard,
              ]}>
              <View
                style={[
                  styles.sectionHeader,
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
                    styles.sectionTitle,
                    isDarkMode ? styles.darkText : styles.lightText,
                    isRTL && styles.rtlText,
                  ]}>
                  {t('serviceDetails.typeOfProperty')}
                </Text>
              </View>

              <View
                style={[
                  styles.propertyTypes,
                  {flexDirection: isRTL ? 'row-reverse' : 'row'},
                ]}>
                {propertyTypes.map(type => (
                  <TouchableOpacity
                    key={type.id}
                    style={styles.propertyItem}
                    onPress={() => setSelectedProperty(type.id)}>
                    <View
                      style={[
                        styles.iconContainer,
                        isDarkMode
                          ? styles.darkIconContainer
                          : styles.lightIconContainer,
                        selectedProperty === type.id &&
                          styles.selectedIconContainer,
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
                        isDarkMode
                          ? styles.darkPropertyText
                          : styles.lightPropertyText,
                        isRTL && styles.rtlText,
                      ]}>
                      {t(
                        `serviceDetails.propertyTypes.${type.title.toLowerCase()}`,
                      )}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

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

          {!isKeyboardVisible && <View style={styles.bottomPadding} />}
        </ScrollView>

        {!isKeyboardVisible && (
          <Animated.View
            style={[
              styles.bottomSection,
              isDarkMode ? styles.darkBottomSection : styles.lightBottomSection,
              {opacity: isBottomSheetVisible ? 0.3 : 1},
            ]}>
            <View
              style={[
                styles.totalContainer,
                {flexDirection: isRTL ? 'row-reverse' : 'row'},
              ]}>
              <Text
                style={[
                  styles.totalLabel,
                  isDarkMode ? styles.darkTotalLabel : styles.lightTotalLabel,
                  isRTL && styles.rtlText,
                ]}>
                {t('serviceDetails.total')}:
              </Text>
              <Text
                style={[
                  styles.totalAmount,
                  isDarkMode ? styles.darkTotalAmount : styles.lightTotalAmount,
                  isRTL && styles.rtlText,
                ]}>
                {t('bottomSheet.currency')}{' '}
                {thousandSeparator(service.price * units)}
              </Text>
            </View>

            <View
              style={[
                styles.buttonContainer,
                {flexDirection: isRTL ? 'row-reverse' : 'row'},
              ]}>
              <TouchableOpacity
                style={[
                  styles.draftButton,
                  isDarkMode ? styles.darkDraftButton : styles.lightDraftButton,
                ]}
                onPress={() => {
                  const data = {
                    service,
                    selectedProperty,
                    units,
                    bedrooms,
                  };
                  handleSavedDraft(data);
                }}>
                <Text
                  style={[
                    styles.draftButtonText,
                    isDarkMode
                      ? styles.darkDraftButtonText
                      : styles.lightDraftButtonText,
                    isRTL && styles.rtlText,
                  ]}>
                  {isDraftSaved
                    ? t('serviceDetails.removeDraft')
                    : t('serviceDetails.saveDraft')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => setIsBottomSheetVisible(true)}>
                <Text style={[styles.bookButtonText, isRTL && styles.rtlText]}>
                  {t('serviceDetails.bookNow')}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </View>
      {/* Bottom Sheet */}
      {isBottomSheetVisible && (
        <BottomSheet
          setIsBottomSheetVisible={setIsBottomSheetVisible}
          service={service}
          units={units}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          serviceBooked={serviceBooked}
        />
      )}
    </SafeAreaView>
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
    backgroundColor: '#15162E',
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
  lightGradient: {
    height: '50%',
  },
  darkGradient: {
    height: '100%',
  },
  darkCard: {
    backgroundColor: Colors.navBg,
  },
  lightCard: {
    backgroundColor: Colors.pureWhite,
  },
  darkText: {
    color: Colors.pureWhite,
  },
  lightText: {
    color: '#333',
  },
  darkIconContainer: {
    borderColor: '#535763',
    backgroundColor: '#272D37',
  },
  lightIconContainer: {
    borderColor: Colors.darkLightGray,
    backgroundColor: Colors.pureWhite,
  },
  selectedIconContainer: {
    backgroundColor: Colors.primary,
    borderWidth: 0,
  },
  darkPropertyText: {
    color: Colors.pureWhite,
  },
  lightPropertyText: {
    color: Colors.primaryDark,
  },
  darkBottomSection: {
    backgroundColor: '#0F1621',
  },
  lightBottomSection: {
    backgroundColor: Colors.pureWhite,
  },
  darkTotalLabel: {
    color: Colors.darkLightGray,
  },
  lightTotalLabel: {
    color: '#666',
  },
  darkTotalAmount: {
    color: Colors.pureWhite,
  },
  lightTotalAmount: {
    color: Colors.primaryDark,
  },
  darkDraftButton: {
    backgroundColor: '#272D37',
    borderColor: '#535763',
    borderWidth: 2,
  },
  lightDraftButton: {
    backgroundColor: Colors.pureWhite,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  darkDraftButtonText: {
    color: Colors.darkLightGray,
  },
  lightDraftButtonText: {
    color: Colors.primary,
  },
});

export default ServiceDetails;
