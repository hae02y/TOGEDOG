package togedog.server.domain.feed.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import togedog.server.domain.feed.entity.Feed;

public interface FeedRepository extends JpaRepository<Feed, Long> {
}
