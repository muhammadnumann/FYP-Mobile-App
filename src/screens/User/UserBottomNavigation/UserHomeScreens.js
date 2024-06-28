import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserHome from "../UserHome/UserHome";
import AgentsScreen from "../Agents/AgentsScreen";
import Address from "../UserHome/Address";
import BookingConfirmation from "../Agents/BookingConfirmation";
import UserInbox from "../UserInbox/UserInbox";
import SelectBooking from "../Agents/SelectBooking";
import AgentAvailability from "../Agents/AgentAvailability";
import ClientPaymentMethod from "../PaymentScreens/ClientPaymentMethod";
import AvailableServices from "../UserHome/Services/AvailableServices";
import AddBookingAddress from "../UserHome/Services/AddBookingAddress";
import ScheduleBooking from "../UserHome/Services/ScheduleBooking";
import ClientBookingRecepient from "../PaymentScreens/ClientBookingRecepient";
import UserNotification from "../UserNotifications/UserNotfications";
import AllServices from "../UserHome/AllServices";


const UserStack = createStackNavigator();

export const UserHomeScreens = () => {
    return (
        <UserStack.Navigator screenOptions={{ headerShown: false }}>
            <UserStack.Screen name="UserHome" component={UserHome} />
            <UserStack.Screen name="UserNotification" component={UserNotification} />
            <UserStack.Screen name="Address" component={Address} />
            <UserStack.Screen name="AgentsScreen" component={AgentsScreen} />
            <UserStack.Screen name="SelectBooking" component={SelectBooking} />
            <UserStack.Screen
                name="ClientBookingRecepient"
                component={ClientBookingRecepient}
            />


            <UserStack.Screen
                name="AvailableServices"
                component={AvailableServices}
            />
            <UserStack.Screen
                name="AddBookingAddress"
                component={AddBookingAddress}
            />
            <UserStack.Screen name="ScheduleBooking" component={ScheduleBooking} />

            <UserStack.Screen
                name="ClientPaymentMethod"
                component={ClientPaymentMethod}
            />
            <UserStack.Screen
                name="AgentAvailability"
                component={AgentAvailability}
            />
            <UserStack.Screen
                name="BookingConfirmation"
                component={BookingConfirmation}
            />
            <UserStack.Screen name="UserInbox" component={UserInbox} />

            <UserStack.Screen name="AllServices" component={AllServices} />
        </UserStack.Navigator>
    );
};



