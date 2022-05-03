import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet } from 'react-native';
import Screen1 from './../screens/Screen1';
import Screen2 from './../screens/Screen2';
import Screen3 from './../screens/Screen3';
import MenuScreen from './../screens/MenuScreen';
import HomeScreen from './../screens/HomeScreen';
import DiscoverScreen from './../screens/DiscoverScreen';
import SignupScreen from './../screens/SignupScreen';
import LoginScreen from './../screens/LoginScreen';
import ProfileScreen from './../screens/ProfileScreen';
import EditProfileScreen from './../screens/EditProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const NavigationComponent = ({ navigation }) => {
    const token = useSelector(state => state.user.idToken)

    return (
        <NavigationContainer >
            {token !== undefined ? (
                // Show the app with all navigation
                <Tab.Navigator            
                tabBarOptions= {{
                    labelStyle: {
                    fontSize: 15,
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    margin: 0,
                    padding: 0,
                }
                }}
             
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
                }}
                >
                    <Tab.Screen 
                    name='Home' 
                    component={HomeScreen} 
                    options={{ 
                        tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name='home-sharp'
                            style={{ color: focused ? '#5050a5' : '#b7b7b7', fontSize: 25 }}
                        ></Ionicons>
                        ),
                    }}/>
                    <Tab.Screen 
                    name='Discover' 
                    component={DiscoverScreen} 
                    options={{
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
                        tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name='menu-outline'
                            style={{ color: focused ? '#5050a5' : '#b7b7b7', fontSize: 25}}
                        ></Ionicons>
                        ),
                    }}/>
                </Tab.Navigator>
            ) : (
                // show a stack navigator with only signup and login screens.
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

function ChatStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Screen1' component={Screen1}  options={{ headerShown: false }} />
            <Stack.Screen name='Screen2' component={Screen2}  options={{ headerShown: false }} />
            <Stack.Screen name='AndreScreen' component={Screen3}  options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}



export default NavigationComponent;