import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

const AddSpotPage1 = ({ goToNextPage }) => (
  <View style={styles.container}>
    <Button title="Ready!" onPress={goToNextPage} />
  </View>
);

AddSpotPage1.propTypes = {
  goToNextPage: PropTypes.func.isRequired,
};

export default AddSpotPage1;
