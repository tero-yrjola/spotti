import { createStackNavigator } from 'react-navigation';
import Search from './Search';
import SpotsMapPage from './SpotsMapPage';
import SpotInfo from '../spot-info/SpotInfo';
import Purchase from './Purchase';
import SearchInputScreen from './search-input-screen/SearchInputScreen';

const SearchNavigator = createStackNavigator(
  {
    Search,
    SpotsMapPage,
    SpotInfo,
    Purchase,
    SearchInput: SearchInputScreen,
  },
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      header: null,
    },
  }
);

SearchNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  const navigationOptions = {};
  if (routeName !== 'Search') {
    navigationOptions.tabBarVisible = false;
  }
  return navigationOptions;
};

export default SearchNavigator;
