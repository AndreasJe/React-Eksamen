import { FlatList, StatusBar, Text, TextInput, Modal, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import Input from '../components/Input';
import { useEffect, useState } from 'react';
import Event from '../components/Event';
import styles from "../constants/styles";
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { fetchEvents, addEvent } from '../store/actions/EventActions';


const DiscoverScreen = ({ navigation }: { navigation: any }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [location, setLocation] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch(); 
  const chatrooms = useSelector((state: RootState) => state.events);
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
  dateStart: 'Tue 13. APR',
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
  dateStart: 'Fri 23. APR',
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
  dateStart: 'Wed 25 APR',
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
  dateStart: 'Fri 29. APR',
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
{  
  title: 'CBS Film presents: Everything Everywhere - All at Once ',
  imgUrl: 'https://i.guim.co.uk/img/media/153d94f8afe195de7a5c1370ef875f7e0b33f6f8/0_0_3504_2336/master/3504.jpg?width=1020&quality=85&auto=format&fit=max&s=a93c3e3a4b9aa7d98fce019b81e2c60c',
  group: 'CBS Film',
  timeStart: '00:00',
  timeEnd: '06:00',
  dateStart: 'Wed 25 APR',
  location: 'Frederiksberg',
  description: 'Kom til fest, og få en hest. Spare ribs turducken chuck meatball. Chislic salami capicola, turducken alcatra ribeye ground round shank fatback. Tongue corned beef cupim buffalo pork loin. Capicola shankle boudin, pig shank ground round tongue ham pork sirloin chuck picanha landjaeger porchetta brisket.',
  key: '7',
},
  ]
  )
    return (
      <View style={styles.mainContainer}>
        
        <View style={styles.modalContainer}>
            <Modal visible={modalOpen} animationType='slide'>
                <View style={styles.modalContent}>
                <View style={styles.StatusBar}>
                    <StatusBar translucent barStyle="light-content" />
                </View>
                <View style={styles.blockHeader}>
                    <Ionicons name="calendar" style={styles.headerIkon}></Ionicons>
                    <Text style={styles.blockHeaderText}>Add a new event:</Text>
                </View>
                <View style={styles.modalInnerContent}>
                  <View style={styles.container}>
                    <Text style={styles.copyText}>Input info below and submit it by clicking "Add Event"</Text>
                  </View>  
                    <Ionicons 
                    name='close-circle-outline'
                    style={{...styles.modalToggle, ...styles.modalClose,...styles.modalTweak }}
                    onPress={() => setModalOpen(false)}
                    ></Ionicons>      
                <View>
                    <TextInput  placeholder="Event Title"
                        style={styles.input}
                        onChangeText={setTitle}
                        value={title}  />
                    <TextInput  placeholder="Description"
                        style={styles.input}
                        onChangeText={setDescription}
                        value={description}  />
                    <TextInput  placeholder="Background image (IMG URL)"
                        style={styles.input}
                        onChangeText={setImgURL}
                        value={imgURL}  />
                    <TextInput  placeholder="Location"
                        style={styles.input}
                        onChangeText={setLocation}
                        value={location}  />

                  <View style={styles.spaceEvenly}>
                    <View>
                    <TextInput  placeholder="Start time"
                        style={styles.input}
                        onChangeText={setTimeStart}
                        value={timeStart}  />
                    </View>
                    <View>
                    <TextInput  placeholder="End time"
                        style={styles.input}
                        onChangeText={setTimeEnd}
                        value={timeEnd}  />
                    </View>
                  </View>

                  <View style={styles.spaceEvenly}>
                    <View>
                    <TextInput  placeholder="Start Date"
                        style={styles.input}
                        onChangeText={setDateStart}
                        value={dateStart}  />
                    </View>
                    <View>
                    <TextInput  placeholder="End Date"
                        style={styles.input}
                        onChangeText={setDateEnd}
                        value={dateEnd}  />
                    </View>
                  </View>
            <TouchableOpacity onPress={() => dispatch(addEvent(title, description, imgURL, location, timeStart, timeEnd, dateStart, dateEnd ))} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Add Event</Text>
            </TouchableOpacity>
                </View>
                </View> 
                </View>
            </Modal>
        </View>
        
        <View style={styles.StatusBar}>
          <StatusBar translucent barStyle="light-content" />
        </View>
        <View style={styles.blockHeader}>
          <Ionicons name="search" style={styles.headerIkon}></Ionicons>
            <Text style={styles.blockHeaderText}>Upcoming Events:</Text>
        </View> 
<View style={styles.AddEvent}>
        <Text style={styles.addEventText}>Add new event</Text>
        <Ionicons 
        name='add-circle-outline'
        onPress={() => setModalOpen(true)}
        style={styles.modalToggle}
        ></Ionicons>
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
        )}/>
      </View>
    );
}

export default DiscoverScreen;