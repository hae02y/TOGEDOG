package togedog.server.domain.replyreport.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.reply.entity.Reply;
import togedog.server.global.entity.BaseEntity;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ReplyReport extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replyReportId;

    private String content;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "reply_id")
    private Reply reply;
}
