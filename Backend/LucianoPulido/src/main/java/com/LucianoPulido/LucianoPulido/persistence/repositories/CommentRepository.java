package com.LucianoPulido.LucianoPulido.persistence.repositories;

import java.util.Set;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.LucianoPulido.LucianoPulido.models.Comment;
import com.LucianoPulido.LucianoPulido.persistence.base.GenericRepository;

@Repository
public interface CommentRepository extends GenericRepository<Comment, UUID>, CrudRepository<Comment, UUID>{
    @Query(value = "SELECT * FROM comments ORDER BY date DESC LIMIT :limit OFFSET :offset", nativeQuery = true)
    public Set<Comment> findWithPagination(@Param("limit") int limit, @Param("offset") int offset);

    @Query(value = "SELECT COUNT(id) FROM comments WHERE parent_id IS NOT null", nativeQuery = true)
    public Long countResponses();
}
