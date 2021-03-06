import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import routes from '../routes';

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    flex: 5,
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },
  bodyText: {
    textAlign: 'center',
  },
});

const SpotAddedPage = ({ navigation }) => (
  <View style={{ flex: 1, flexDirection: 'column' }}>
    <View style={styles.textContainer}>
      <Text style={styles.headerText}>Spot added succesfully!</Text>
      <Text style={styles.bodyText}>Would you like to add available times to your Spot?</Text>
    </View>
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <Button color="red" title="Continue" onPress={() => navigation.replace(routes.ownSpots)} />
      <Button type="outline" title="Add available times" onPress={() => {}} />
    </View>
  </View>
);

SpotAddedPage.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default SpotAddedPage;
