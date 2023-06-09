import React, { useState, useEffect } from 'react';
import SelectIndustry from './SelectIndustry';
import { useBacktestIndustryStore } from '../../../../store/store';
import axios_api from '../../../../assets/config/Axios';
import { getCookie } from '../../../../assets/config/Cookie';
import cancel from '../../../../assets/img/erase.png';
import checkboxChecked from '../../../../assets/img/checkbox-checked.png';
import checkboxBlank from '../../../../assets/img/checkbox-blank.png';

interface Props {
  setShowIndustry: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectIndustries = (props: Props) => {
  // 산업 받아오기
  type industryType = {
    industries: {
      id: number;
      industryName: string;
    }[];
  };

  const [industries, setIndustries] = useState<industryType>();
  const token = getCookie('accessToken');

  useEffect(() => {
    axios_api
      .get('/industries', {
        headers: {
          authentication: token,
        },
      })
      .then((response) => {
        // console.log(response);
        // console.log(response.data);
        setIndustries(response.data);
      })
      .catch((error) => console.log(error));
  }, [token]);

  // 산업 선택 여부
  const [selectIndustries, setSelectIndustries] = useState<boolean>(false);
  const backtestIndustry = useBacktestIndustryStore();

  const selectIndustriesHandler = () => {
    setSelectIndustries(!selectIndustries);
    if (!selectIndustries) {
      backtestIndustry.selectAllIndustry();
    } else if (selectIndustries) {
      backtestIndustry.resetSelectedIndustry();
    }
  };

  const checkSelectedHandler = (checkSelected: boolean) => {
    // console.log(checkSelected);
    setSelectIndustries(checkSelected);
  };

  // X버튼 누르면 모달 사라지게
  const closeSelectIndustry = () => {
    props.setShowIndustry(false);
  };

  // console.log(backtestIndustry.selectedIndustries);
  // console.log(backtestIndustry.allSelectedIndustry);

  return (
    <div className='fixed top-[10%] left-[36%] w-[28%] h-[80%] p-[1%] overflow-auto bg-[#FEFEFE] z-10'>
      <div>
        <div className='flex items-center justify-between'>
          <span className='text-xl'>산업 선택</span>
          <img
            src={cancel}
            alt='cancel'
            className='w-6 cursor-pointer'
            onClick={closeSelectIndustry}
          />
        </div>
        <div className='flex items-center justify-end my-[3%]'>
          {selectIndustries ? (
            <img
              src={checkboxChecked}
              alt='checkboxChecked'
              className='w-4'
              onClick={selectIndustriesHandler}
            />
          ) : (
            <img
              src={checkboxBlank}
              alt='checkboxBlank'
              className='w-4'
              onClick={selectIndustriesHandler}
            />
          )}
          <span className='text-sm ml-2 mr-[10%]'>전체 선택</span>
        </div>
      </div>
      <ul>
        {industries?.industries.map((industry) => {
          return (
            <li key={industry.id}>
              <SelectIndustry
                id={industry.id}
                industryName={industry.industryName}
                onCheckSelected={checkSelectedHandler}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectIndustries;
