package joon.chatserver;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat")
    public void sendMessage(ChatDto chatDto, SimpMessageHeaderAccessor accessor) {
        simpMessagingTemplate.convertAndSend("/sub/chat/" + chatDto.getChatId(), chatDto);
    }
}
