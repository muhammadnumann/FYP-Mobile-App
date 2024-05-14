import { createStackNavigator } from '@react-navigation/stack';

//IMPORT SCENES
import UserBottomNavigation from '../screens/User/UserBottomNavigation/UserBottomNavigation';
import ServiceProviderNavigation from '../screens/Service_Provider/BottomNavigation/ServiceProviderNavigation';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

//Create Routes
const HomeStack = ({ navigation }) => {
  const user = useSelector((state) => state.AuthReducer.user);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='UserHome' component={UserBottomNavigation} />
    </Stack.Navigator>
  );
};

export default HomeStack;
