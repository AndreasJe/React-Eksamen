import { Button, FlatList, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import Input from '../components/Input';
import { useEffect, useState } from 'react';
import Event from '../components/Event';
import styles from "../constants/styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import { fetchEvents, addEvent } from '../store/actions/EventActions';


const DiscoverScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([
{  
  title: 'Christmas Party',
  imgUrl: 'https://blog.ijugaad.com/file/2016/12/Group-Of-Friends-Enjoying-Christmas-Drinks-In-Bar-640x427.jpg',
  group: 'CBS Jul',
  timeStart: '18:00',
  timeEnd: '20:00',
  dateStart: 'Mon 9. APR',
  location: 'Frederiksberg',
  description: 'Kom til fest, og få en hest. Spare ribs turducken chuck meatball. Chislic salami capicola, turducken alcatra ribeye ground round shank fatback. Tongue corned beef cupim buffalo pork loin. Capicola shankle boudin, pig shank ground round tongue ham pork sirloin chuck picanha landjaeger porchetta brisket.',
  key: '1',
},
{  
  title: 'Easter Party',
  imgUrl: 'https://www.thespruce.com/thmb/dQw9d4TVBc-L5PR1wv45Go6OsSs=/941x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/kids-easter-party-games-2104432_hero_3254-6d5a1e0be2a34d6ea66bd6d489dfba53.jpg',
  group: 'CBS Film',
  timeStart: '18:00',
  timeEnd: '00:00',
  dateStart: 'Tirs 13. APR',
  location: 'Frederiksberg',
  description: 'Kom til fest, og få en hest. Spare ribs turducken chuck meatball. Chislic salami capicola, turducken alcatra ribeye ground round shank fatback. Tongue corned beef cupim buffalo pork loin. Capicola shankle boudin, pig shank ground round tongue ham pork sirloin chuck picanha landjaeger porchetta brisket.',
  key: '2',
},
{  
  title: 'Summer Party',
  imgUrl: 'https://www.thatsmags.com/image/view/202012/Christmas-Dinner.jpg',
  group: 'CBS',
  timeStart: '18:00',
  timeEnd: '20:00',
  dateStart: 'Fre 23. APR',
  location: 'Frederiksberg',
  description: 'Kom til fest, og få en hest. Spare ribs turducken chuck meatball. Chislic salami capicola, turducken alcatra ribeye ground round shank fatback. Tongue corned beef cupim buffalo pork loin. Capicola shankle boudin, pig shank ground round tongue ham pork sirloin chuck picanha landjaeger porchetta brisket.',
  key: '3',
},
{  
  title: 'CBS Film presents: Sengekantsfilm',
  imgUrl: 'https://dam-p-dfi.pqcloud.eu/preview/0bj148KRKNtA-EHlVVCryd/previews/maxWidth_800_maxHeight_800.jpg/*/0bj148KRKNtA-EHlVVCryd_micr.jpg?authcred=R3Vlc3Q6R3Vlc3Q=',
  group: 'CBS Film',
  timeStart: '00:00',
  timeEnd: '06:00',
  dateStart: 'Onsdag 25 APR',
  location: 'Frederiksberg',
  description: 'Kom til fest, og få en hest. Spare ribs turducken chuck meatball. Chislic salami capicola, turducken alcatra ribeye ground round shank fatback. Tongue corned beef cupim buffalo pork loin. Capicola shankle boudin, pig shank ground round tongue ham pork sirloin chuck picanha landjaeger porchetta brisket.',
  key: '4',
},
{  
  title: 'Spring Party',
  imgUrl: 'https://cdn.shopify.com/s/files/1/2185/3409/articles/86e5ac2c95fe1df5cf4077c138650a4a.jpg?v=1556575076',
  group: 'CBS',
  timeStart: '18:00',
  timeEnd: '20:00',
  dateStart: 'Fre 29. APR',
  location: 'Frederiksberg',
  description: 'Kom til fest, og få en hest. Spare ribs turducken chuck meatball. Chislic salami capicola, turducken alcatra ribeye ground round shank fatback. Tongue corned beef cupim buffalo pork loin. Capicola shankle boudin, pig shank ground round tongue ham pork sirloin chuck picanha landjaeger porchetta brisket.',
  key: '5',
},
{  
  title: 'Winter Party',
  group: 'CBS',
  imgUrl: 'https://i.pinimg.com/564x/48/c9/e2/48c9e280704474e590380373ed185b3a.jpg',
  timeStart: '20',
  timeEnd: '02',
  dateStart: 'Mon 04. DEC',
  location: 'Århus',
  description: 'Kom til fest, og få en hest. Spare ribs turducken chuck meatball. Chislic salami capicola, turducken alcatra ribeye ground round shank fatback. Tongue corned beef cupim buffalo pork loin. Capicola shankle boudin, pig shank ground round tongue ham pork sirloin chuck picanha landjaeger porchetta brisket.',
  key: '6',
},
  ]
  )
    return (
        <View style={styles.mainContainer}>     
          <View style={styles.blockHeader}>
         <Ionicons name="calendar" style={styles.headerIkon}></Ionicons>
          <Text style={styles.blockHeaderText}>Upcoming events:</Text>
          </View> 
       <FlatList  
       style={styles.eventList} 
       data={events} 
       renderItem={({item}) => (
        <Event
        redirect={() =>
          navigation.navigate('EventDetails',item)
          }
        title={item.title}
        group={item.group}
        description={item.description}
        timeStart={item.timeStart}
        timeEnd={item.timeEnd}
        location={item.location}
        dateStart={item.dateStart}
        imgUrl={item.imgUrl}
        /> 
       )} />
       </View>




    );
}

export default DiscoverScreen;