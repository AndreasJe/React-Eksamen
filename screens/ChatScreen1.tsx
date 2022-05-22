import { useEffect, useState } from 'react';
import styles from "../constants/styles";
import { Button, FlatList, Modal, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import Input from '../components/Input';
import Ionicons from '@expo/vector-icons/Ionicons';
import { addChatroom, deleteChatroom, fetchChatrooms, toggleOnline } from '../store/actions/ChatActions';


const ChatScreen1 = ({ navigation }: { navigation: any }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [text, onChangeText] = useState('');

    const isOnline = useSelector((state: RootState) => state.chat.isOnline); // subscribing to the store's chat slice/part
    const dispatch = useDispatch(); 
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
        <View style={styles.modalContainer}>

            <Modal visible={modalOpen} animationType='slide'>
                <View style={styles.modalContent}>
                    <Text>Modal Open</Text>
                    <Ionicons 
                    name='add-circle-outline'
                    style={{...styles.modalToggle, ...styles.modalClose}}
                    onPress={() => setModalOpen(false)}
                                ></Ionicons>
                </View>
            </Modal>

            <Ionicons 
            name='add-circle-outline'
            onPress={() => setModalOpen(true)}
            style={styles.modalToggle}
                        ></Ionicons>

            <Text>I am screen 1</Text>
                <View style={styles.onlineContainer} >
                    <Text>Online Status:</Text>
                    <TouchableOpacity style={[styles.onlineStatus,{backgroundColor: isOnline ? "green" : "red",}]}>
                    </TouchableOpacity>
                </View>

            <Button title="Online Status" onPress={() => dispatch(toggleOnline())} />

            <Input placeholder="Chatroom name"
                style={styles.input}
                onChangeText={onChangeText}
                value={text}  />

            <Button title='Add chatroom' onPress={() => dispatch(addChatroom(text))} />

            <FlatList style={styles.chatroomList} data={chatrooms} renderItem={renderItem} />
        </View>
    );
}

export default ChatScreen1;