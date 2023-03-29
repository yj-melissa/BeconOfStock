package com.ssafy.beconofstock.strategy.repository;

import com.ssafy.beconofstock.board.entity.Board;
import com.ssafy.beconofstock.member.entity.Member;
import com.ssafy.beconofstock.strategy.entity.Strategy;
import com.ssafy.beconofstock.strategy.entity.StrategyDibs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StrategyDibsRepository extends JpaRepository<StrategyDibs, Long> {

//    Boolean existsByStrategyAndMember(Strategy strategy, Member member);

//    void deleteByStrategyAndMember(Strategy strategy, Member member);

    @Query("select sd from StrategyDibs sd where sd.member=:member")
    Page<StrategyDibs> findStrategyDibsByMember (Member member, Pageable pageable);

}
