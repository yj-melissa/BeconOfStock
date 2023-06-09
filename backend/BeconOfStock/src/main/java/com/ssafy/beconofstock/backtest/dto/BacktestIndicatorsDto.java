package com.ssafy.beconofstock.backtest.dto;

import com.ssafy.beconofstock.backtest.entity.BacktestSortType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class BacktestIndicatorsDto {
    List<Long> indicators;
    List<Long> industries;
    Integer startYear;
    Integer startMonth;
    Integer endYear;
    Integer endMonth;
    BacktestSortType backtestSortType;
    Integer sortRatio;
    Integer maxStocks;
    Double fee;
    Integer rebalance;

}
