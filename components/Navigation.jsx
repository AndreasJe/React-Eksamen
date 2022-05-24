import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from "expo-secure-store";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chatrooms from '../screens/Chatrooms';
import ChatroomDetails from '../screens/ChatroomDetails';
import HomeScreen from './../screens/HomeScreen';
import DiscoverScreen from './../screens/DiscoverScreen';
import SignupScreen from './../screens/SignupScreen';
import LoginScreen from './../screens/LoginScreen';
import ProfileScreen from './../screens/ProfileScreen';
import EditProfileScreen from './../screens/EditProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import EventDetails from '../screens/EventDetailsScreen';
import { logout, restoreUser, get_UserInfo } from '../store/actions/UserActions';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const NavigationComponent = ({ navigation }) => {
    let token = useSelector(state => state.user.idToken)

    // Loading in user data globally
    useEffect(() => {
        loadUserData();
    }, []);

    async function loadUserData() {
        const tokenFromSecureStore = await SecureStore.getItemAsync('idToken');

        if (tokenFromSecureStore) {
            
            dispatch(restoreUser(emailFromSecureStore, tokenFromSecureStore));
            get_UserInfo(tokenFromSecureStore);
            const localIdFromSecureStore = await SecureStore.getItemAsync('localId');
            const displayNameFromSecureStore = await SecureStore.getItemAsync('displayName');
            const emailFromSecureStore = await SecureStore.getItemAsync('email');
            const emailVerifiedFromSecureStore = await SecureStore.getItemAsync('emailVerified');
            const lastLoginAtFromSecureStore = await SecureStore.getItemAsync('lastLoginAt');
            const createdAtFromSecureStore = await SecureStore.getItemAsync('createdAt');



        } else {
            useDispatch(logout())
        }

    }
    return (
        <NavigationContainer >
            {token !== undefined ? (
                // if token is present show app tab navigator, if not show login/signup stack.
                // Tabnavigator with app content
                <Tab.Navigator           
             
                screenOptions={{
                    headerStyle: {
                      backgroundColor: 'white',
                    },
                    headerTintColor: 'black',
                    headerTitleStyle: {
                      color: '#5050a5',
                      fontWeight: 'bold',
                      fontSize: 25,
                      margin: 10,
                      textTransform: 'uppercase',
                    },
                    tabBarLabelStyle:  {
                    fontSize: 15,
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    margin: 0,
                    padding: 0,
                }
                }}
                >
                    <Tab.Screen 
                    name='Home' 
                    component={HomeScreen} 
                    options={{ 
                        headerShown:false, 
                        tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name='home-sharp'
                            style={{ color: focused ? '#5050a5' : '#b7b7b7', fontSize: 25 }}
                        ></Ionicons>
                        )
                    } }/>
                    <Tab.Screen 
                    name='Discover' 
                    component={EventStack} 
                    options={{
                        headerShown:false, 
                        tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name='search-outline'
                            style={{ color: focused ? '#5050a5' : '#b7b7b7', fontSize: 25 }}
                        ></Ionicons>
                        ),
                    }}/>
                    <Tab.Screen 
                    name='Chat' 
                    component={ChatStack} 
                    options={{
                        headerShown:false, 
                        tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name='chatbubbles-outline'
                            style={{ color: focused ? '#5050a5' : '#b7b7b7', fontSize: 25 }}
                        ></Ionicons>
                        ),
                    }}/>
                    <Tab.Screen
                    name='Menu' 
                    component={MenuStack} 
                    options={{
                    headerShown:false,                        
                    tabBarIcon: 
                        ({ focused }) => (
                        <Ionicons
                            name='menu-outline'
                            style={{ color: focused ? '#5050a5' : '#b7b7b7', fontSize: 25}}
                        ></Ionicons>
                        ),
                    }}/>
                </Tab.Navigator>
            ) : (
                // Stack navigator with only signup and login screens.
                <Stack.Navigator>
                    <Stack.Screen name='Signup' component={SignupScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            )}
        </NavigationContainer >
    );
}


function MenuStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen  name='Profile' component={ProfileScreen}  options={{ headerShown: false }} ></Stack.Screen>
            <Stack.Screen name='EditProfile' component={EditProfileScreen}  options={{ headerShown: false }} ></Stack.Screen>
        </Stack.Navigator>
    )
}


function EventStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen  name='DiscoverScreen' component={DiscoverScreen}  options={{ headerShown: false }} ></Stack.Screen>
            <Stack.Screen name='EventDetails' component={EventDetails}  options={({ route }) => ({ title: route.params.title })} ></Stack.Screen>
            
        </Stack.Navigator>
    )
}

function ChatStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Chatrooms' component={Chatrooms}  options={{ headerShown: false }} />
            <Stack.Screen name='ChatroomDetails' component={ChatroomDetails}  options={({ route }) => ({ title: route.params.chatroomName })}/>
            
        </Stack.Navigator>
    );
}



export default NavigationComponent;