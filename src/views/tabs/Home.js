import React from 'react';
import {View, StyleSheet} from 'react-native';

import TopBar from '../Home/components/TopBar';

const Home = () => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <TopBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
});

export default Home;
