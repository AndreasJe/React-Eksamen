import { useEffect, useState } from 'react';
import {  FlatList,StatusBar, Text, TextInput, Modal, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import styles from "../constants/styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import { addChatroom, deleteChatroom, fetchChatrooms, toggleOnline } from '../store/actions/ChatActions';

const Chatrooms = ({ navigation }: { navigation: any }) => {
    const [text, onChangeText] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const isOnline = useSelector((state: RootState) => state.chat.isOnline); // subscribing to the store's chat slice/part
    const dispatch = useDispatch(); 
    const chatrooms = useSelector((state: RootState) => state.chat.chatrooms);

    useEffect(() => {
        dispatch(fetchChatrooms())
    }, []);

    console.log("chatrooms", chatrooms);

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.chatroomItem} onPress={() =>
            navigation.navigate('ChatroomDetails',item)
            }>
            <Text style={styles.chatroomText}>{item.chatroomName}</Text>
            
            <View style={styles.chatroomButton}> 
            <Ionicons 
                name='remove-circle-outline'
                onPress={() => dispatch(deleteChatroom(item.id))}
                style={styles.chatDeleteIcon}
                ></Ionicons>
            </View>
        </TouchableOpacity>
    );

    return (
    <KeyboardAvoidingView style={styles.mainContainer}>
        <View style={styles.StatusBar}>
            <StatusBar translucent barStyle="light-content" />
        </View>
        <View style={styles.blockHeader}>
            <Ionicons name="chatbubbles" style={styles.headerIkon}></Ionicons>
            <Text style={styles.blockHeaderText}>Chatrooms:</Text>
        </View> 
        <View style={styles.modalContainer}>
            <Modal visible={modalOpen} animationType='slide'>
                <View style={styles.modalContent}>
                <View style={styles.StatusBar}>
                    <StatusBar translucent barStyle="light-content" />
                </View>
                <View style={styles.blockHeader}>
                    <Ionicons name="calendar" style={styles.headerIkon}></Ionicons>
                    <Text style={styles.blockHeaderText}>Upcoming events:</Text>
                </View>
                <View style={styles.modalInnerContent}>
                    <Text>Modal Open</Text>
                    <Ionicons 
                    name='close-circle-outline'
                    style={{...styles.modalToggle, ...styles.modalClose}}
                    onPress={() => setModalOpen(false)}
                    ></Ionicons>      
                <View>
                    <TextInput  placeholder="Chatroom name"
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}  />
            <TouchableOpacity onPress={() => dispatch(addChatroom(text))} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Add chatroom</Text>
            </TouchableOpacity>
                </View>
                </View> 
                </View>
            </Modal>
        </View>
        <View style={styles.topContainer}>
            <View style={styles.flexEndContainer} >
                <TouchableOpacity onPress={() => dispatch(toggleOnline())} style={styles.topRightContainer}>  
                    <Ionicons 
                    name={isOnline ? 'checkmark-circle' : 'close-circle'}
                    style={[styles.onlineStatus,{color: isOnline ? "green" : "red",}]}></Ionicons> 
                    <Text style={styles.onlineStatusText}>{isOnline ? "Online" : "Offline"} </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.topLeftContainer}>
                <Text style={styles.addChatTxt}>Add Chatroom</Text>
                <Ionicons 
                name='add-circle-outline'
                onPress={() => setModalOpen(true)}
                style={styles.modalToggle}
                ></Ionicons>
            </View>
        </View>
        <FlatList style={styles.chatroomList} data={chatrooms} renderItem={renderItem} />     
    </KeyboardAvoidingView>
    );
}

export default Chatrooms;