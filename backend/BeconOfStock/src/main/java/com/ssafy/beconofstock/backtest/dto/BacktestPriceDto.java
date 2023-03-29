package com.ssafy.beconofstock.backtest.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BacktestPriceDto {

    private Integer year;
    private Integer month;
    private Double value;
}
