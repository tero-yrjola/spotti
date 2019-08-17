import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import SpotsMap from './spots-map/SpotsMap';
import SpotsMapCarousel from './spots-carousel/SpotsMapCarousel';
import MapFiltersContainer from './map-filters/MapFiltersContainer';
import routes from '../routes';

const minuteInMilliseconds = 60000;
const currentDate = new Date();
const defaultValueForFromFilter = currentDate;
const defaultValueForToFilter = new Date(currentDate.getTime() + minuteInMilliseconds * 60);

class SpotsMapPage extends React.Component {
  constructor(props) {
    super(props);
    this.carouselRef = React.createRef();
    this.mapRef = React.createRef();
    this.state = {
      ToFilterValue: defaultValueForToFilter,
      FromFilterValue: defaultValueForFromFilter,
      currentActiveIndex: 0,
    };
  }

  setMapRef = c => {
    this.mapRef = c;
  };

  setCarouselRef = c => {
    this.carouselRef = c;
  };

  showSpotInfoOfActiveSpot = () => {
    const { spots, navigation } = this.props;
    const { currentActiveIndex, ToFilterValue, FromFilterValue } = this.state;
    navigation.navigate(routes.spotInfo, {
      spot: spots[currentActiveIndex],
      timeFilters: { to: ToFilterValue, from: FromFilterValue },
    });
  };

  animateMapTo = coordinates =>
    this.mapRef.animateCamera({
      center: { latitude: coordinates.latitude, longitude: coordinates.longitude },
    });

  centerMapOnSpotIndex = i => {
    const { spots } = this.props;
    this.setState({ currentActiveIndex: i });
    const spotToCenter = spots[i];
    this.animateMapTo(spotToCenter);
  };

  snapCarouselToSpotIndex = i => {
    this.setState({ currentActiveIndex: i });
    this.carouselRef.snapToItem(i);
  };

  onFilterValueChange = (key, value) => {
    const { ToFilterValue, FromFilterValue } = this.state;

    if (key === 'FromFilterValue')
      if (value > ToFilterValue.getTime() - minuteInMilliseconds * 5)
        this.setState({
          FromFilterValue: value,
          ToFilterValue: new Date(value.getTime() + minuteInMilliseconds * 5),
        });
      else this.setState({ FromFilterValue: value });
    else if (key === 'ToFilterValue')
      if (value > FromFilterValue.getTime() + minuteInMilliseconds * 5)
        this.setState({ ToFilterValue: value });
  };

  render() {
    const {
      navigation: {
        state: {
          params: { searchCoordinates: initialCoordinates, disableSearchLocationMarker },
        },
      },
      navigation,
      spots,
    } = this.props;

    const { ToFilterValue, FromFilterValue, currentActiveIndex } = this.state;
    return (
      <View>
        <MapFiltersContainer
          to={ToFilterValue}
          from={FromFilterValue}
          onChange={this.onFilterValueChange}
          goBack={navigation.goBack}
        />
        <SpotsMap
          currentActiveIndex={currentActiveIndex}
          onActiveSpotChange={this.snapCarouselToSpotIndex}
          spots={spots}
          initialCoordinates={initialCoordinates}
          disableSearchLocationMarker={disableSearchLocationMarker}
          animateMapTo={this.animateMapTo}
          setRef={this.setMapRef}
        />
        <SpotsMapCarousel
          showSpotInfoOfActiveSpot={this.showSpotInfoOfActiveSpot}
          navigation={navigation}
          onActiveSpotChange={this.centerMapOnSpotIndex}
          spots={spots}
          setRef={this.setCarouselRef}
        />
      </View>
    );
  }
}

SpotsMapPage.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        searchCoordinates: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          disableSearchLocationMarker: PropTypes.bool,
        }).isRequired,
      }),
    }),
  }).isRequired,
  spots: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  spots: state.spots,
});

export default connect(
  mapStateToProps,
  null
)(SpotsMapPage);
