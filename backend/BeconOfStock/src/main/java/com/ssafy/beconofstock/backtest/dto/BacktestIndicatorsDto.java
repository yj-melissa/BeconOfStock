package com.ssafy.beconofstock.backtest.dto;

import com.ssafy.beconofstock.backtest.entity.BacktestSortType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BacktestIndicatorsDto {


    List<Integer> indicatos;
    List<String> industries;
    Integer startYear;
    Integer startMonth;
    Integer endYear;
    Integer endMonth;
    BacktestSortType backtestSortType;
    Integer maxStocks;
    Double fee;
    Integer rebalance;

}
