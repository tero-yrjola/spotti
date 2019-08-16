import React from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import ReservationStack from './containers/reservation/ReservationStack';
import MySpotsStack from './containers/my-spots/MySpotsStack';

const AppNavigator = createBottomTabNavigator(
  {
    Reservation: ReservationStack,
    'My Spots': MySpotsStack,
  },
  {
    initialRouteName: 'Reservation',
    tabBarOptions: {
      activeTintColor: '#478DD2',
      labelStyle: { fontSize: 16 },
      style: { height: 60 },
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => <AppContainer />;

export default App;

// To use storybook, replace the above line with:
// export default from './storybook';
