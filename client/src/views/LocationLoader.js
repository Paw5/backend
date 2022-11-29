import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { setLocation } from '../redux/LocationSlice';

export default function LocationLoader() {
  const [status, requestPermission] = Location.useForegroundPermissions();
  const dispatch = useDispatch();
  const currentLocation = useSelector((state) => state.location);

  if (status === null) {
    requestPermission();
  } else if (status.granted && !currentLocation.loaded) {
    console.debug('Current location', currentLocation);
    Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.Balanced,
    }).then((location) => {
      console.debug('Found location', location);
      dispatch(setLocation(location));
    });
  } else console.debug('Current location', currentLocation);
}
