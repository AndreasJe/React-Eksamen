import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import  styles  from '../constants/styles';
import { add, addChatroom, deleteChatroom, fetchChatrooms, subtract, toggleOnline } from '../store/actions/ChatActions';


const Screen1 = ({ navigation }: { navigation: any }) => {
    const [text, onChangeText] = useState('');

    const isOnline = useSelector((state: RootState) => state.chat.isOnline); // subscribing to the store's chat slice/part
    const dispatch = useDispatch();
    const lengthArray = useSelector((state: RootState) => state.chat )
    const NumberOfChatrooms = useSelector((state: RootState) => state.chat.counter)
    const chatrooms = useSelector((state: RootState) => state.chat.chatrooms);

    useEffect(() => {
        dispatch(fetchChatrooms())
    }, []);

    console.log("chatrooms", chatrooms);

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.chatroomItem} onPress={() => navigation.navigate('Screen2')}>
            <Text style={styles.chatroomText} >{item.title}</Text>
            <TouchableOpacity   style={styles.chatroomButton}  onPress={() => dispatch(deleteChatroom(item.id))}> 
            <Text>Delete</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );


    return (
        <View>
            <Text>I am screen 1</Text>
                <View style={styles.onlineContainer} >
                    <Text>Online Status:</Text>
                    <TouchableOpacity style={[styles.onlineStatus,{backgroundColor: isOnline ? "green" : "red",}]}>
                    </TouchableOpacity>
                </View>

            <Button title="Online Status" onPress={() => dispatch(toggleOnline())} />

            <Text>How many icecreams should Christians children have {NumberOfChatrooms}</Text>
            <Button title="Give Icecream" onPress={() => dispatch(add())} />
            <Button title="Steal Icecream" onPress={() => dispatch(subtract())} />

            <TextInput placeholder="Chatroom name"
                style={styles.input}
                onChangeText={onChangeText}
                value={text}  />

            <Button title='Add chatroom' onPress={() => dispatch(addChatroom(text))} />

            <FlatList style={styles.chatroomList} data={chatrooms} renderItem={renderItem} />
        </View>
    );
}

export default Screen1;