import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../constants/colors';

const NumberOfUnits = () => {
  const [units, setUnits] = useState(2);

  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  cardWrapper: {
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
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterLabel: {
    fontSize: 18,
    fontWeight: '600',
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
});

export default NumberOfUnits;
