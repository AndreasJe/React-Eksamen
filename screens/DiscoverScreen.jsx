import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { Query, useQuery } from 'react-query';
import Event from '../components/Event';

const DiscoverScreen = ({ navigation }) => {

    return (
        <ScrollView>
<Text
style={styles.header}>Upcoming Events:</Text>

              <Event
              title='Christmas Party'
              group='CBS'
              description='Rather long description about the premise and what is gonna happen at this event. It will be a very informative text, that allows the user to read more about the event. This is why im reapeating myself, and writing useless stuff like this.'
              timeStart='18:00'
              timeEnd='22:00'
              dateEnd=''
              location='Fasters Kro, 4200 Ringsted'
              dateStart='Mon. 1. APR'
              imgUrl='https://blog.ijugaad.com/file/2016/12/Group-Of-Friends-Enjoying-Christmas-Drinks-In-Bar-640x427.jpg'
              />
              <Event
              title='Christmas Theme at CBS'
              group='CBS'
              description='Rather long description about the premise and what is gonna happen at this event. It will be a very informative text, that allows the user to read more about the event. This is why im reapeating myself, and writing useless stuff like this.'
              dateStart='Mon. 1. APR'
              dateEnd='fri. 5. APR'
              location='Fætter BR, 4000 Roskilde'
              imgUrl='https://i.pinimg.com/564x/48/c9/e2/48c9e280704474e590380373ed185b3a.jpg'
              />
              <Event
              title='Christmas Dinner'
              group='CBS Social'
              description='Rather long description about the premise and what is gonna happen at this event. It will be a very informative text, that allows the user to read more about the event. This is why im reapeating myself, and writing useless stuff like this.'
              timeStart='20:00'
              timeEnd='00:00'
              dateEnd=''
              location='Poul Nyrups tidligere bolig, 4200 Ringsted'
              dateStart='Mon. 10. APR'
              imgUrl='https://www.thatsmags.com/image/view/202012/Christmas-Dinner.jpg'
              />
       </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    logo: {
      width: 140,
      height: 200,
      alignSelf: 'center',
      marginTop:20,
      marginBottom:10,
    },
    scrollView: {
      backgroundColor: 'pink',
    },
    buttonText: {
    color: 'white',
    fontSize:16,
    fontWeight:"700",
    },
    buttonContainer: {
    backgroundColor: '#5050a5',
    justifyContent: "center",
    padding: 16,
    margin:30,
    borderRadius:10,
    height:60,
    },
    copy: {
    flexDirection: 'row',
    alignSelf:'center',
    },
    copyText: {
    color: '#5050a5',
    fontSize:16,
    },
    copyLink: {
    color: '#5050a5',
    fontSize:16,
    fontWeight:"700",
    marginLeft: -4,
    },
    header: {
    fontSize:26,
    fontWeight:"700",
    marginBottom:20,
    color: '#32305d',
    padding:20,
    },
    input: {
    borderColor: '#00000070',
    borderWidth:1,
    marginLeft:40,
    marginRight:40,
    margin: 0,
    height:60,
    borderRadius:4,
    padding: 10,
    },
    shadow: {
    shadowColor: "#000000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.90,
    shadowRadius: 4.65,
    elevation: 8,
    }
  });
export default DiscoverScreen;