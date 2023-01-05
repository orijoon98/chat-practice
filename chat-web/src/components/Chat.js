/** @jsxImportSource @emotion/react */
import styled from 'styled-components';

const Chat = ({ chatList, chat, handleChange, handleSubmit }) => {
    return (
        <ChatContainer>
            <ChatWrapper>
                <ChatTitle>
                    <h1>채팅</h1>
                </ChatTitle>
                <div>
                    <div className="chat-list">
                        {chatList.map(it => (
                            <ul>
                                <li>{it.chat}</li>
                            </ul>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" name="chatInput" onChange={handleChange} value={chat} />
                        </div>
                        <input type="submit" value="의견 보내기" />
                    </form>
                </div>
            </ChatWrapper>
        </ChatContainer>
    );
};

const ChatContainer = styled.div`
    text-align: center;
    width: 100vw;
    height: 100vh;
`;

const ChatWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
`;

const ChatTitle = styled.div`
    margin-top: 100px;
    margin-bottom: 50px;
`;

export default Chat;
