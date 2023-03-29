import { useState, useEffect } from 'react';
import { useBacktestFactorStore } from '../../../../store/store';

import question from '../../../../assets/img/question.png';
import checkboxBlank from '../../../../assets/img/checkbox-blank.png';
import checkboxChecked from '../../../../assets/img/checkbox-checked.png';

interface Props {
  id: number;
  title: string;
  count: number;
  description: string;
}

const FactorDetail = (props: Props) => {
  const [factorSelected, setFactorSelected] = useState<boolean>(false);
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const backtestFactor = useBacktestFactorStore();
  // console.log(backtestFactor.indicators);
  // console.log(backtestFactor.selectedIndicators);
  // console.log(props.id);

  // 로드될 때 backtestFactor.selectedIndicators에 id가 있는 경우 factorSelected를 true로
  // id가 없는 경우 factorSelected를 false로
  useEffect(() => {
    if (
      backtestFactor.selectedIndicators.includes(props.id) &&
      factorSelected === false
    ) {
      setFactorSelected(true);
      backtestFactor.addIndicator(props.id, props.title);
    } else if (!backtestFactor.selectedIndicators.includes(props.id)) {
      setFactorSelected(false);
    }
  }, [backtestFactor.selectedIndicators]);

  const factorSelectedHandler = () => {
    setFactorSelected(!factorSelected);
    if (!factorSelected) {
      backtestFactor.addIndicator(props.id, props.title);
      backtestFactor.addSelectedIndicator(props.id);
    } else if (factorSelected) {
      backtestFactor.removeIndicator(props.id);
      backtestFactor.removeSelectedIndicator(props.id);
    }
  };

  const mouseEnterHandler = () => {
    setShowDescription(true);
  };

  const mouseLeaveHandler = () => {
    setShowDescription(false);
  };

  return (
    <div className='flex justify-center'>
      <div className='flex my-[1%] w-[70%] justify-between items-center'>
        <div className='flex items-center'>
          {factorSelected ? (
            <img
              src={checkboxChecked}
              alt='checkboxChecked'
              className='w-5'
              onClick={factorSelectedHandler}
            />
          ) : (
            <img
              src={checkboxBlank}
              alt='checkboxBlank'
              className='w-5'
              onClick={factorSelectedHandler}
            />
          )}
          <p className='ml-1 text-sm'>{props.title}</p>
          <img
            src={question}
            alt='question'
            className='w-5 ml-[3%]'
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
          />
        </div>
        {showDescription && (
          <div className='flex justify-center'>
            <p className='text-sm absolute border rounded-lg border-[#131313] bg-[#FEFEFE] px-[3%] py-[2%]'>
              {props.description}
            </p>
          </div>
        )}
        <div className='flex justify-center rounded-full border-[#131313] bg-[#FAF6FF]'>
          <p>{props.count}</p>
        </div>
      </div>
    </div>
  );
};

export default FactorDetail;
