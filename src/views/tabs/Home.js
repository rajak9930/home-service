import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import TopBar from '../Home/components/TopBar';
import SearchBar from '../../components/SearchBar';

const Home = () => {
  return (
    <View style={styles.mainContainer}>
      {/* Top Bar */}
      <TopBar />

      {/* Greeting Section */}
      <View style={styles.greetingContainer}>
        <View style={styles.greeting}>
          <Text style={styles.hello}>HELLO ASHFAK</Text>
          <Text>👋</Text>
        </View>
        <Text style={styles.subtitle}>What you are looking for today</Text>
        <SearchBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  greetingContainer: {
    padding: 16,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hello: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 6,
  },
});

export default Home;
