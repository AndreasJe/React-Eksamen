import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  Button,
  ImageBackground,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import styles from "../constants/styles";

const ChatroomDetails = ({navigation, route}) => {
    const data = route.params.errors;

    return (
        <View style={styles.mainContainer}>
            <StatusBar translucent barStyle="dark-content" />
            <View style={styles.copyContainer}>
            <View>
            <Text style={styles.copyText}>Here we will have some messages, </Text>
            <Text style={{color: "#5050a5",fontWeight:'700'}}>if i can make it in time</Text>
            </View>
            </View>
            <Button title="Go back" onPress={() => navigation.navigate('Chatrooms')} />
        </View>
    );
}

export default ChatroomDetails;