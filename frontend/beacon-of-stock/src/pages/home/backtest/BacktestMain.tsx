import React from 'react';

import BasicSettings from './BasicSetting/BasicSettings';
import FactorSettings from './Factor/FactorSettings';
import SelectedItems from './Factor/SelectedItems';

const backTestHandler = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

const BacktestMain = () => {
  return (
    <React.Fragment>
      <form onSubmit={backTestHandler}>
        <div className='flex justify-end my-[1%] mr-[8%]'>
          <input
            className='text-lg font-KJCbold text-[#FEFEFE] border rounded-xl bg-[#A47ECF] px-[1%] py-[0.5%]'
            type='submit'
            value='백테스트'
          />
        </div>
        <main className='h-[80vh] flex place-content-around items-center mx-[5%]'>
          <section className='relative inline-block w-[29%] h-full border overflow-y-auto'>
            <BasicSettings />
          </section>
          <section className='relative inline-block w-[29%] h-full border overflow-y-auto'>
            <FactorSettings />
          </section>
          <section className='relative inline-block w-[29%] h-full border overflow-y-auto'>
            <SelectedItems />
          </section>
        </main>
      </form>
    </React.Fragment>
  );
};

export default BacktestMain;
