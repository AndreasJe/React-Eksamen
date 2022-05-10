import { View, Text, Button } from 'react-native';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { CHATROOMS } from '../dummy.data';


const HomeScreen = ({ navigation }) => {

    return (
       
        <View>
            <Text>Welcome to the homescreen</Text>
            <Text>data.title</Text>
            <Text>data.timeStart - data.TimeEnd on the data.date</Text>
            <Text>data.description</Text>
        </View>
        
      );
}
 
export default HomeScreen;