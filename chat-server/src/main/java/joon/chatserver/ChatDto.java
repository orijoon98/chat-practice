package joon.chatserver;

import lombok.Data;

@Data
public class ChatDto {
    private Integer chatId;
    private Integer writerId;
    private String chat;
}
