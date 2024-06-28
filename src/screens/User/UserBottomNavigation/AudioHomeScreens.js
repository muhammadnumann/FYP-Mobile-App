import { createStackNavigator } from "@react-navigation/stack";
import UserHome from "../UserAudios/UserHome";

const UserStack = createStackNavigator();

export const AudioHomeScreens = () => {
    return (
        <UserStack.Navigator screenOptions={{ headerShown: false }}>
            <UserStack.Screen name="UserBookingHome" component={UserHome} />
        </UserStack.Navigator>
    );
};