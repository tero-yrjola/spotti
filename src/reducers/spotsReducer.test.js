import spotsReducer from './spotsReducer';

describe('spotsReducer', () => {
  it('should return state by default', () => {
    const state = { key: 'value' };

    expect(spotsReducer(state, {})).toBe(state);
  });

  it('should return updated spots', () => {
    const spots = [{ id: 1, data: 'first' }, { id: 2, data: 'second' }, { id: 3, data: 'third' }];

    const updatedSpot = { id: 2, data: 'updated' };

    const action = {
      type: 'UPDATE_SPOT',
      updatedSpot,
      updatedSpotIndex: 1,
    };

    const newState = [spots[0], updatedSpot, spots[2]];

    expect(spotsReducer(spots, action)).toEqual(newState);
  });

  it('should add a new spot', () => {
    const spots = [{ id: 1, data: 'first' }, { id: 2, data: 'second' }, { id: 3, data: 'third' }];

    const newSpot = { id: 4, data: 'fourth' };

    const action = {
      type: 'ADD_SPOT',
      newSpot,
    };

    const newState = [spots[0], spots[1], spots[2], newSpot];

    expect(spotsReducer(spots, action)).toEqual(newState);
  });
});
