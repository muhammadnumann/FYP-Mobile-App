import { createStackNavigator } from "@react-navigation/stack";
import UserBookingHome from "../UserBookings/UserBookingHome";
import UserNotification from "../UserNotifications/UserNotfications";
import AvailableServiceProviders from "../UserBookings/AvailableServiceProviders";
import ClientPaymentReceipt from "../PaymentScreens/ClientPaymentReceipt";
import ClientBookingRecepient from "../PaymentScreens/ClientBookingRecepient";
import ClientPaymentMethod from "../PaymentScreens/ClientPaymentMethod";
import AgentProfileScreen from "../Agents/AgentProfileScreen";
import UserInboxHome from "../UserInbox/UserInboxHome";
import UserInbox from "../UserInbox/UserInbox";

const UserStack = createStackNavigator();

export const BookingHomeScreens = () => {
    return (
        <UserStack.Navigator screenOptions={{ headerShown: false }}>
            <UserStack.Screen name="UserBookingHome" component={UserBookingHome} />
            <UserStack.Screen
                name="AvailableServiceProviders"
                component={AvailableServiceProviders}
            />
            <UserStack.Screen name="UserNotification" component={UserNotification} />

            <UserStack.Screen
                name="ClientPaymentReceipt"
                component={ClientPaymentReceipt}
            />
            <UserStack.Screen
                name="ClientBookingRecepient"
                component={ClientBookingRecepient}
            />
            <UserStack.Screen
                name="ClientPaymentMethod"
                component={ClientPaymentMethod}
            />
            <UserStack.Screen
                name="AgentProfileScreen"
                component={AgentProfileScreen}
            />
            <UserStack.Screen name="UserInboxList" component={UserInboxHome} />
            <UserStack.Screen name="UserInbox" component={UserInbox} />
        </UserStack.Navigator>
    );
};