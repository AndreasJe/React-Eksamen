import { ScrollView,SafeAreaView,View,StatusBar, StyleSheet, Text } from 'react-native';
import Event from '../components/Event';
import userReducer from '../store/reducers/UserReducer';
import styles from '../constants/styles'
import Ionicons from '@expo/vector-icons/Ionicons';


const HomeScreen = ({ navigation }) => {

    return (
       
      <View style={styles.mainContainer}>
        <View style={styles.StatusBar}>
            <StatusBar translucent barStyle="light-content" />
        </View>
          <View style={styles.blockHeader}>
            <Ionicons name="home" style={styles.headerIkon}></Ionicons>
            <Text style={styles.blockHeaderText}>Welcome:</Text>
          </View> 
            <Text style={styles.header}>Welcome to my exam app</Text>
          <View style={styles.copyContainer}>
            <View>
              <Text style={styles.copyText}>I hope everything works :) </Text>
              <Text style={{color: "#5050a5",fontWeight:'700'}}>Sometimes it does</Text>
            </View>
          </View>

        </View>
        
      );
}

export default HomeScreen;