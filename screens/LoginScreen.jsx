import { TouchableOpacity, View, Image, Text, TextInput} from 'react-native';
import {  useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from './../store/actions/UserActions'
import styles from '../constants/styles'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    return (
    <View>
            <Image
            style={styles.logo}
            source={require('../assets/icon.png')}
            />
            <Text style={styles.header}>Login</Text>
            <TextInput 
                style={styles.input} 
                placeholder='Email' 
                label='Email'
                onChangeText={setEmail}
                value={email} />
            <TextInput style={styles.input} 
                placeholder='Password'
                keyboardType="default"
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password} />
            <TouchableOpacity style={styles.buttonContainer} 
                onPress={() => dispatch(login(email, password))}>
                <Text style={styles.buttonText}> Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.copy} 
                onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.copyText}>Don't have a user? </Text>
                <Text style={styles.copyLink}> Sign up </Text>
            </TouchableOpacity> 
    </View>
    );
}

export default LoginScreen;