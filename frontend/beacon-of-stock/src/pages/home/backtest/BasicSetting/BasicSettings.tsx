import React, { useState } from 'react';
import SelectIndustry from './SelectIndustry';
import SelectIndustryBackground from './SelectIndustryBackground';

const BasicSettings = () => {
  const [basicSettings, setBasicSettings] = useState({
    // 산업
    industry: '선택',
    // 거래비용
    tradeCost: '0',
    // 최대 종목 수
    maxNum: '10',
    // 리밸런싱 주기
    rebalance: '3개월',
    // 정렬 기준
    sort: '시가총액 높은 순',
    // 정렬 기준 값
    sortRatio: '20',
    // 시작 시점
    start: '2000-01',
    // 종료 시점
    end: '2022-12',
  });

  const {
    industry,
    tradeCost,
    maxNum,
    rebalance,
    sort,
    sortRatio,
    start,
    end,
  } = basicSettings;

  // 산업 모달 상태
  const [showIndustry, setShowIndustry] = useState(false);

  // 산업 선택 모달 활성화 여부 설정
  const showIndustryHandler = () => {
    setShowIndustry(true);
  };

  // 산업
  // const [industry, setIndustry] = useState<string>("선택");
  // 거래비용
  const tradeCostChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // 입력값에서 숫자와 소수점 이외의 문자를 모두 제거
    // console.log(event.target.value);
    // console.log(event.target.value.replace(/[^\d.]/g, ''));
    let newVal = event.target.value.replace(/[^\d.]/g, '');

    // 입력값에서 소수점이 여러 개인 경우 첫 번째 소수점만 남김
    const dotIndex = newVal.indexOf('.');
    const hasMultipleDots =
      dotIndex !== -1 && newVal.indexOf('.', dotIndex + 1) !== -1;
    if (hasMultipleDots) {
      newVal = newVal.substring(0, newVal.lastIndexOf('.'));
    }

    // 입력값에서 소수점 아래 둘째 자리 이후의 숫자를 모두 제거
    const decimalIndex = newVal.indexOf('.');
    if (decimalIndex !== -1) {
      const decimalLength = newVal.substring(decimalIndex + 1).length;
      if (decimalLength > 2) {
        newVal = newVal.substring(0, decimalIndex + 3);
      }
    }
    if (newVal === '') {
      setBasicSettings((prevState) => {
        return {
          ...prevState,
          tradeCost: '0',
        };
      });
    } else if (
      newVal.indexOf('.') + 1 === newVal.length ||
      (newVal.indexOf('.') + 2 === newVal.length &&
        newVal[newVal.indexOf('.') + 1] === '0')
      // 소수점 표시가 있는 경우 혹은 소수점 아래 첫번째 자리가 0인 경우 그대로
    ) {
      setBasicSettings((prevState) => {
        return {
          ...prevState,
          tradeCost: newVal,
        };
      });
    } else if (0 <= Number(newVal) && Number(newVal) <= 100) {
      newVal = String(parseFloat(newVal));
      setBasicSettings((prevState) => {
        return {
          ...prevState,
          tradeCost: newVal,
        };
      });
    }
  };
  // 최대 종목 수
  const maxNumChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    // 숫자만 보이도록 정규식 작성
    // console.log(event.target.value.replace(/[^0-9]/g, ''));
    const newVal = event.target.value.replace(/[^0-9]/g, '');
    if (newVal === '') {
      setBasicSettings((prevState) => {
        return {
          ...prevState,
          maxNum: '0',
        };
      });
    } else if (0 <= Number(newVal) && Number(newVal) <= 30) {
      setBasicSettings((prevState) => {
        return {
          ...prevState,
          maxNum: String(parseFloat(newVal)),
        };
      });
    }
  };
  // 리밸런싱 주기 선택값 가져오기
  const rebalanceChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // text 값
    // console.log(event.target.options[event.target.selectedIndex].text);
    // value 값
    // console.log(event.target.value);
    setBasicSettings((prevState) => {
      return { ...prevState, rebalance: event.target.value };
    });
  };
  // 정렬 기준
  const sortChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // value 값
    // console.log(event.target.value);
    setBasicSettings((prevState) => {
      return { ...prevState, sort: event.target.value };
    });
  };
  // 정렬 기준 값
  const sortRatioChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // console.log(event.target.value);
    // 숫자만 보이도록 정규식 작성
    // console.log(event.target.value.replace(/[^0-9]/g, ''));
    const newVal = event.target.value.replace(/[^0-9]/g, '');
    if (newVal === '') {
      setBasicSettings((prevState) => {
        return {
          ...prevState,
          sortRatio: '0',
        };
      });
    } else if (0 <= Number(newVal) && Number(newVal) <= 100) {
      setBasicSettings((prevState) => {
        return {
          ...prevState,
          sortRatio: String(parseFloat(newVal)),
        };
      });
    }
  };
  // 시작 시점
  const startChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    setBasicSettings((prevState) => {
      return { ...prevState, start: event.target.value };
    });
  };
  // 종료 시점
  const endChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    setBasicSettings((prevState) => {
      return { ...prevState, end: event.target.value };
    });
  };

  return (
    <React.Fragment>
      <p className='mb-2 text-xl font-KJCbold'>기본 설정</p>
      {/* <div className='flex flex-col justify-center mx-[5%]'> */}
      <div className='flex flex-col justify-center mx-[5%]'>
        <div className='my-1'>
          <label htmlFor='industry'>산업</label>
          <div className='border rounded-xl'>
            <input
              type='button'
              id='industry'
              defaultValue={industry}
              onClick={showIndustryHandler}
              className='flex m-1 w-[95%] text-sm'
            />
          </div>

          {showIndustry && (
            <div>
              <SelectIndustryBackground setShowIndustry={setShowIndustry} />
              <SelectIndustry setShowIndustry={setShowIndustry} />
            </div>
          )}
        </div>

        <div className='my-1'>
          <label htmlFor='tradeCost'>거래비용</label>
          <div className='flex items-center border flex-between rounded-xl'>
            <input
              type='text'
              id='tradeCost'
              onChange={tradeCostChangeHandler}
              value={tradeCost}
              className='flex m-1 w-[95%] text-sm'
            />
            <p className='mr-[3%] text-sm'>%</p>
          </div>
        </div>

        <div className='my-1'>
          <label htmlFor='maxNum'>최대 종목 수 (max 30)</label>
          <div className='border rounded-xl'>
            <input
              type='text'
              id='maxNum'
              value={maxNum}
              onChange={maxNumChangeHandler}
              className='flex m-1 w-[95%] text-sm'
            />
          </div>
        </div>

        <div className='my-1'>
          <label htmlFor='rebalance'>리밸런싱 주기</label>
          <div className='border rounded-xl'>
            <select
              name='rebalance'
              id='rebalance'
              value={rebalance}
              onChange={rebalanceChangeHandler}
              className='flex m-1 w-[95%] text-sm'
            >
              <option value='3개월'>3개월</option>
              <option value='6개월'>6개월</option>
              <option value='12개월'>12개월</option>
            </select>
          </div>
        </div>

        <div className='my-1'>
          <label htmlFor='sort'>정렬 기준</label>
          <div className='flex justify-between'>
            <div className='border rounded-xl w-[60%]'>
              <select
                name='sort'
                id='sort'
                value={sort}
                onChange={sortChangeHandler}
                className='flex m-1 w-[95%] text-sm'
              >
                <option value='시가총액 높은 순'>시가총액 높은 순</option>
                <option value='시가총액 낮은 순'>시가총액 낮은 순</option>
                <option value='영업이익률 우선'>영업이익률 우선</option>
                <option value='자본수익률 우선'>자본수익률 우선</option>
                <option value='F-score 높은 순'>F-score 높은 순</option>
              </select>
            </div>
            <div className='flex items-center justify-center border rounded-xl w-[35%]'>
              <input
                type='text'
                id='sortRatio'
                value={sortRatio}
                onChange={sortRatioChangeHandler}
                className='w-[90%] m-1 text-sm'
              />
              <p className='mr-[5%] text-sm'>%</p>
            </div>
          </div>
        </div>

        <div className='my-1'>
          <label htmlFor='start'>시작 시점</label>
          <div className='border rounded-xl'>
            <input
              type='month'
              id='start'
              value={start}
              min='2000-01'
              max='2022-12'
              onChange={startChangeHandler}
              className='flex m-1 w-[95%] text-sm'
            />
          </div>
        </div>

        <div className='my-1'>
          <label htmlFor='end'>종료 시점</label>
          <div className='border rounded-xl'>
            <input
              type='month'
              id='end'
              value={end}
              min='2000-01'
              max='2022-12'
              onChange={endChangeHandler}
              className='flex m-1 w-[95%] text-sm'
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BasicSettings;