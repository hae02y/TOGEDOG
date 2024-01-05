package togedog.server.domain.chat.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import togedog.server.domain.chat.entity.ChatRoom;
import togedog.server.global.entity.BaseEntity;
import togedog.server.global.entity.ReportState;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatReport extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatReportId;

    private Long reportedMemberId;

    private String content;

    @Enumerated(EnumType.STRING)
    private ReportState reportState;

    @ManyToOne
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;
}
