import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {

    return (
        <View>
            <Text>I am HomeScreen</Text>
            <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
            <Button title="Logout" onPress={() => dispatch(logout())} />
        </View>
    );
}

export default HomeScreen;