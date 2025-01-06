import images from './images';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const onboarding = [
  {
    id: 1,
    title: 'Beauty parlour \u00A0\u00A0at your home',
    description:
      'Get professional beauty services and treatments in the comfort of your home',
    image: images.onboardingOne,
  },
  {
    id: 2,
    title: 'Plumber & expart nearby you',
    description:
      'Connect with skilled plumbers and experts in your area for quick repairs and solutions',
    image: images.onboardingTwo,
  },
  {
    id: 3,
    title: 'Professional home cleaning',
    description:
      'Experience thorough home cleaning services by trained and verified professionals',
    image: images.onboardingThree,
  },
];

export const categoriesList = [
  {
    id: 1,
    title: 'AC Repair',
    image: images.categoryOne,
  },
  {
    id: 2,
    title: 'Beauty',
    image: images.categoryTwo,
  },
  {
    id: 3,
    title: 'Appliance',
    image: images.categoryThree,
  },
  {
    id: 4,
    title: 'Painting',
    image: images.categoryFour,
  },
  {
    id: 5,
    title: 'Cleaning',
    image: images.categoryFive,
  },
  {
    id: 6,
    title: 'Plumbing',
    image: images.categorySix,
  },
  {
    id: 7,
    title: 'Electronics',
    image: images.categorySeven,
  },
  {
    id: 8,
    title: 'Shifting',
    image: images.categoryEight,
  },
  {
    id: 9,
    title: "Men's Salon",
    image: images.categoryNine,
  },
];

export const sliderData = [
  {
    id: 1,
    title: 'Offer AC Service',
    discount: '25%',
    bgColor: '#F0F8FF',
  },
  {
    id: 2,
    title: 'Offer Cleaning Service',
    discount: '15%',
    bgColor: '#FFE4E1',
  },
  {
    id: 3,
    title: 'Offer Painting Service',
    discount: '10%',
    bgColor: '#E0FFF0',
  },
];

export const categoryData = [
  {
    id: 1,
    title: 'AC Repair',
    image: images.categoryOne,
  },
  {
    id: 2,
    title: 'Beauty',
    image: images.categoryTwo,
  },
  {
    id: 3,
    title: 'Appliance',
    image: images.categoryThree,
  },
];

export const cleaningData = [
  {
    id: 1,
    title: 'Home Cleaning',
    image: images.CleaningOne,
    discount: '10% OFF',
  },
  {
    id: 2,
    title: 'Carpet Cleaning',
    image: images.CleaningTwo,
  },
  {
    id: 3,
    title: 'Office Cleaning',
    image: images.CleaningThree,
    discount: '15% OFF',
  },
];

// Icon configuration
export const ICONS = {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
};

export const DRAWER_ITEMS = [
  {
    icon: {
      type: 'MaterialIcons',
      name: 'calendar-today',
    },
    label: 'Calendar',
  },
  {
    icon: {
      type: 'MaterialIcons',
      name: 'payment',
    },
    label: 'Payments Methods',
  },
  {
    icon: {
      type: 'Ionicons',
      name: 'location-outline',
    },
    label: 'Address',
  },
  {
    icon: {
      type: 'MaterialIcons',
      name: 'notifications-none',
    },
    label: 'Notification',
  },
  {
    icon: {
      type: 'MaterialCommunityIcons',
      name: 'ticket-percent-outline',
    },
    label: 'Offers',
  },
  {
    icon: {
      type: 'MaterialIcons',
      name: 'person-add-alt-1',
    },
    label: 'Refer a Friend',
  },
  {
    icon: {
      type: 'MaterialIcons',
      name: 'support-agent',
    },
    label: 'Support',
  },
];

export const subCategoryList = [
  {
    id: 1,
    title: 'AC Check-Up',
    rating: 4.8,
    reviews: 87,
    price: 128,
    image: images.AcOne,
  },
  {
    id: 2,
    title: 'AC Regular Service',
    rating: 4.5,
    reviews: 87,
    price: 128,
    image: images.AcTwo,
  },
  {
    id: 3,
    title: 'AC Installation',
    rating: 4.5,
    reviews: 87,
    price: 170,
    image: images.AcThree,
  },
  {
    id: 4,
    title: 'AC Uninstallation',
    rating: 4.5,
    reviews: 87,
    price: 170,
    image: images.AcFour,
  },
];
