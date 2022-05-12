import { ScrollView, StyleSheet, Text } from 'react-native';
import Event from '../components/Event';
import userReducer from '../store/reducers/UserReducer';
import styles from '../constants/styles'


const HomeScreen = ({ navigation }) => {

    return (
       
        <ScrollView>
<Text
style={styles.header}>Welcome to my exam app</Text>

<Text> Hi 
      </Text>


        </ScrollView>
        
      );
}

export default HomeScreen;