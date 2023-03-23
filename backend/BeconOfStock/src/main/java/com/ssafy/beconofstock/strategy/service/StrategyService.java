package com.ssafy.beconofstock.strategy.service;

import com.ssafy.beconofstock.member.entity.Member;
import com.ssafy.beconofstock.strategy.dto.StrategyAddDto;
import com.ssafy.beconofstock.strategy.dto.StrategyDetailDto;
import com.ssafy.beconofstock.strategy.entity.Indicator;
import com.ssafy.beconofstock.strategy.entity.StrategyIndicator;
import com.ssafy.beconofstock.strategy.repository.StrategyIndicatorRepository;

import java.util.List;
import java.util.Map;

public interface StrategyService {


    StrategyDetailDto getStrategyDetail(Member member, Long strategyId);
    Map<String, List<Indicator>> getIndicators();
    List<StrategyIndicator> getStrategy(Long id);
    void addStrategy(Member member, StrategyAddDto strategyAddDto);
    void patchStrategy(Member member, StrategyAddDto strategyAddDto, Long strategyId);
    void deleteStrategy(Member member, Long StrategyId);

}
