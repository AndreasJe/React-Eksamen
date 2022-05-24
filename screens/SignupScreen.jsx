import { View, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signup } from './../store/actions/UserActions'
import styles from "../constants/styles";

const SignupScreen = ({ navigation }) => {
    const [displayName, setdisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    return (
    <View>
        <Image
        style={styles.logo}
        source={require('../assets/icon.png')}
        />
        <Text style={styles.header}>Sign up to get access</Text>
        <TextInput style={styles.input} placeholder='Full Name'
        label='Full name'
                onChangeText={setdisplayName}
                value={displayName} />
        <TextInput style={styles.input} placeholder='Email'
        label='Email'
                onChangeText={setEmail}
                value={email} />
        <TextInput style={styles.input} placeholder='Password'
        label='Password'
        keyboardType="default"
        secureTextEntry={true}
                onChangeText={setPassword}
                value={password} />
        <TouchableOpacity style={styles.buttonContainer} onPress={() => dispatch(signup(email, password, displayName))}>
            <Text style={styles.buttonText}> Get Access</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.copy} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.copyText}>Already have a user? </Text>
            <Text style={styles.copyLink}> Log in </Text>
        </TouchableOpacity>
    </View>
    );
}

export default SignupScreen;