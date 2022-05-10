import { View, Text, Button } from 'react-native';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()
const HomeScreen = ({ navigation }) => {

    return (
        <View>
            <Text>I am HomeScreen</Text>
        </View>
    );
}
 
export default HomeScreen;