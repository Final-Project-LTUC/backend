const getDistanceFromLatLonInKm = require('../../src/utils/distanceCalc'); 

describe('getDistanceFromLatLonInKm', () => {
  it('should calculate the distance between two points correctly', () => {
    const lat1 = 52.520008; 
    const lon1 = 13.404954; 
    const lat2 = 48.856613; 
    const lon2 = 2.352222;  

    const distance = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);

    expect(distance).toBeCloseTo(1051, 0); 
  });

  it('should return 0 for the same point', () => {
    const lat = 40.712776; 
    const lon = -74.005974; 

    const distance = getDistanceFromLatLonInKm(lat, lon, lat, lon);

    expect(distance).toBe(0);
  });

  it('should handle negative latitudes and longitudes', () => {
    const lat1 = -33.868820;
    const lon1 = 151.209290; 
    const lat2 = -23.550520;
    const lon2 = -46.633308; 
    const distance = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);

    expect(distance).toBeCloseTo(11163, 0); 
  });

});
