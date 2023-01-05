import React, { useState, useEffect, useRef } from 'react';
import Chat from '../components/Chat';
import { useParams } from 'react-router-dom';
import * as stompjs from '@stomp/stompjs';

const ChatContainer = () => {
    const [chatList, setChatList] = useState([]);
    const [chat, setChat] = useState('');

    const { chatId } = useParams();
    const client = useRef({});

    const connect = () => {
        client.current = new stompjs.Client({
            brokerURL: 'ws://localhost:8080/ws',
            onConnect: () => {
                subscribe();
            },
        });
        client.current.activate();
    };

    const publish = chat => {
        if (!client.current.connected) return;

        client.current.publish({
            destination: '/pub/chat',
            body: JSON.stringify({
                chatId: chatId,
                writerId: 1,
                chat: chat,
            }),
        });

        setChat('');
    };

    const subscribe = () => {
        client.current.subscribe('/sub/chat/' + chatId, body => {
            const json_body = JSON.parse(body.body);
            setChatList(_chat_list => [..._chat_list, json_body]);
        });
    };

    const disconnect = () => {
        client.current.deactivate();
    };

    const handleChange = event => {
        // 채팅 입력 시 state에 값 설정
        setChat(event.target.value);
    };

    const handleSubmit = event => {
        // 보내기 버튼 눌렀을 때 publish
        event.preventDefault();

        publish(chat);
    };

    useEffect(() => {
        connect();

        return () => disconnect();
    }, []);

    return <Chat chatList={chatList} chat={chat} handleChange={handleChange} handleSubmit={handleSubmit} />;
};

export default ChatContainer;
