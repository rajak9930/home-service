import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import images from '../../../constants/images';
import {useCustomTheme} from '../../../theme/Theme';
import Colors from '../../../constants/colors';

const ApplianceRepair = () => {
  const theme = useCustomTheme();
  const isDarkMode = theme === 'dark';

  return (
    <View>
      <View style={styles.titleContainer}>
        <View style={styles.indicator} />
        <Text
          style={[
            styles.title,
            {color: isDarkMode ? Colors.white : Colors.black},
          ]}>
          Appliance Repair
        </Text>
      </View>

      <TouchableOpacity style={styles.offerCard}>
        <Image
          source={images.Appliance}
          style={styles.applianceImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  indicator: {
    width: 4,
    height: 20,
    backgroundColor: '#CABDFF',
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#172B4D',
  },

  applianceImage: {
    width: '100%',
    height: 215,
    resizeMode: 'contain',
  },
});

export default ApplianceRepair;
