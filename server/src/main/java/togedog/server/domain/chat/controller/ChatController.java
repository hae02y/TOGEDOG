package togedog.server.domain.chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.chat.dto.*;
import togedog.server.domain.chat.entity.ChatReport;
import togedog.server.domain.chat.entity.ChatRoom;
import togedog.server.domain.chat.service.ChatService;
import togedog.server.domain.member.service.MemberService;
import togedog.server.global.auth.utils.LoginMemberUtil;
import togedog.server.global.dto.SingleResponseDto;
import togedog.server.global.response.ApiPageResponse;

import java.util.List;

@RestController
@RequestMapping("/chat")
@CrossOrigin(allowedHeaders = "*", origins = "*")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    private final LoginMemberUtil loginMemberUtil;

    //채팅방 생성
    @PostMapping
    public ResponseEntity<String> postChatRoom(@RequestBody ChatPostRequest chatPostRequest) {

        Long chatRoomId = chatService.createChatRoom(chatPostRequest);

        return new ResponseEntity<>("chatRoomId: " + chatRoomId, HttpStatus.CREATED);
    }

    //채팅방 목록 조회
    @GetMapping
    public ResponseEntity<List<ChatRoomResponse>> getChatRooms(@RequestParam("member-id") Long memberId) {

//        Long memberId = loginMemberUtil.getLoginMemberId();

        List<ChatRoomResponse> responses = chatService.findChatRooms(memberId);

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    //채팅방 조회
    @PostMapping("/{chatroom-id}")
    public ResponseEntity<ChatRoomResponse> getChatRoom(@PathVariable("chatroom-id") Long chatRoomId, @RequestBody ChatGetRequest chatGetRequest) {

        ChatRoomResponse response = chatService.findChatRoom(chatGetRequest.getMemberId(), chatRoomId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{chatroom-id}")
    public ResponseEntity deleteChatRoom(@PathVariable("chatroom-id") Long chatRoomId) {

        chatService.deleteRoom(chatRoomId);

        return new ResponseEntity<>("채팅방 삭제 완료", HttpStatus.NO_CONTENT);
    }

    @PostMapping("/report")
    public ResponseEntity postChatReport(@RequestBody ChatReportRequest chatReportRequest) {

        Long chatReportId = chatService.createChatReport(chatReportRequest);

        return ResponseEntity.status(HttpStatus.OK).body("신고 접수, chatReportId: " + chatReportId);
    }

    @GetMapping("/report")
    public ResponseEntity getChatReport(@RequestParam("page_number") int pageNumber, @RequestParam("page_size") int pageSize) {

        ChatReportPageResponse result =  chatService.findChatReports(pageNumber, pageSize);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
