import React from 'react';
import PropTypes from 'prop-types';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import routes from '../routes';
import { bottomButton } from '../../../Theme';
import BackButtonWithSpottiLogo from '../../lib/BackButtonWithSpottiLogo';
import ReservationSummary from './ReservationSummary';

const styles = StyleSheet.create({
  topContainer: {
    height: '100%',
  },
  arrowContainer: {
    paddingLeft: '5%',
    paddingTop: '5%',
  },
  informationContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  singleContainer: {
    padding: 20,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  totalPaymentContainer: {
    alignItems: 'center',
    paddingBottom: '20%',
  },
  strongText: {
    fontWeight: 'bold',
  },
});

const Purchase = ({
  navigation: {
    state: {
      params: { spot, timeFilters, durationOfParkingInHours },
    },
  },
  navigation,
}) => (
  <View style={styles.topContainer}>
    <BackButtonWithSpottiLogo onPress={navigation.goBack} />
    <View style={styles.informationContainer}>
      <View style={styles.singleContainer}>
        <Text>
          Osoite: <Text style={styles.strongText}>{spot.address}</Text>
        </Text>
        <Text>
          Ajankohta:{' '}
          <Text style={styles.strongText}>
            {timeFilters.from} - {timeFilters.to}
          </Text>
        </Text>
      </View>
      <View style={styles.singleContainer}>
        <Text>
          Maksutapa:
          <Text style={styles.strongText}> Luottokortti</Text>
        </Text>
        <Button onPress={() => {}} title="Vaihda maksutapaa" />
      </View>

      <View style={styles.singleContainer}>
        <ReservationSummary
          durationInHours={parseFloat(durationOfParkingInHours)}
          pricePerHour={parseFloat(spot.price_per_hour)}
        />
      </View>
    </View>

    <TouchableOpacity
      style={bottomButton.container}
      onPress={() =>
        navigation.navigate(routes.postReservation, {
          navigation,
          spotCoordinates: { latitude: spot.coordinates.x, longitude: spot.coordinates.y },
        })
      }
    >
      <Text style={bottomButton.text}>VAHVISTA</Text>
    </TouchableOpacity>
  </View>
);

export default Purchase;

Purchase.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        spot: PropTypes.shape({
          date: PropTypes.string,
          price_per_hour: PropTypes.string,
          chosenTime: PropTypes.string,
          address: PropTypes.string,
        }).isRequired,
        timeFilters: PropTypes.shape({
          time: PropTypes.string,
          date: PropTypes.string,
        }).isRequired,
        durationOfParkingInHours: PropTypes.number.isRequired,
      }),
    }),
  }).isRequired,
};
