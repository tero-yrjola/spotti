import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import AutocompleteList from './AutocompleteList';
import SearchInput from './SearchInput';
import { SEARCH_COORDINATES, AUTOCOMPLETE_SUGGESTIONS } from '../../mock-data';

const SearchInputScreen = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState('');

  const getAutocompleteSuggestions = () => {
    const searchInputInLowerCase = searchInput.toLowerCase();
    return AUTOCOMPLETE_SUGGESTIONS[searchInputInLowerCase] || [];
  };

  const handleSearchInputChange = text => setSearchInput(text);
  const handleSuggestionSelect = () =>
    navigation.navigate('SpotsMapPage', { searchCoordinates: SEARCH_COORDINATES });
  const handleGoBackClick = () => navigation.navigate('Search');
  const handleSearchClick = () => {
    if (getAutocompleteSuggestions().length > 0) {
      navigation.navigate('SpotsMapPage', { searchCoordinates: SEARCH_COORDINATES });
    }
  };

  return (
    <View>
      <SearchInput
        handleGoBackClick={handleGoBackClick}
        handleSearchInputChange={handleSearchInputChange}
        handleSearchClick={handleSearchClick}
        searchInput={searchInput}
      />
      {searchInput.length >= 3 ? (
        <AutocompleteList
          autocompleteSuggestions={getAutocompleteSuggestions()}
          handleSuggestionSelect={handleSuggestionSelect}
        />
      ) : (
        <Text>Try &quot;Kupittaa&quot;</Text>
      )}
    </View>
  );
};

SearchInputScreen.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default SearchInputScreen;
