import { useEffect, useState } from 'react';
import { usePageStore } from '../store/store';

type pagebationProps = {
  totalPage: number;
};

export const Pagenation = ({ totalPage }: pagebationProps) => {
  const { page, setPage } = usePageStore();
  // console.log(page);
  const allPage = totalPage;
  const [first, setFirst] = useState<number>(0);
  const [end, setEnd] = useState<number>(Math.min(allPage, 10));
  // =====================================================
  // 이전 버튼과 다음 버튼에 대한 식
  // =====================================================
  const prevClick = () => {
    if (first === 0) {
      return; // first가 0일 때는 작동하지 않음
    }
    // 0보다 작아지지 않게.
    setFirst(Math.max(0, first - 10));
    if (end - 10 < 11) {
      setEnd(10);
    } else {
      setEnd(end - 10);
    }
  };
  const nextClick = () => {
    if (end >= allPage) {
      return; // 마지막 페이지인 경우, 넘어가지 않음
    }
    setFirst(first + 10);
    setEnd(Math.min(allPage, end + 10));
    // 마지막 페이지에는 작동 x
  };
  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = first; i < end && pageNumbers.length < 10; i++) {
      pageNumbers.push(i + 1);
    }
    return pageNumbers;
  };
  // =====================================================
  // 이전 버튼과 다음 버튼에 대한 식  끝
  // =====================================================
  useEffect(() => {
    setFirst(0);
    setEnd(Math.min(allPage, 10));
  }, [allPage]);
  return (
    <article className='flex justify-center m-auto p-auto'>
      <button
        id='prev-button'
        onClick={prevClick}
        className='box border-2 border-[#6773BB] rounded-md bg-[#6773BB] text-[#fefefe] text-lg w-16 h-12 my-4 ml-4 mr-3'
        disabled={first === 0}
      >
        prev
      </button>
      <div className='flex justify-around'>
        {generatePageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            className={`my-4 mx-1 px-1 text-lg h-12 w-12 border-2 rounded-sm ${
              page === pageNumber
                ? 'border-[#6773BB] text-[#6773BB]'
                : 'border-gray-400 text-gray-400 hover:border-[#6773BB] hover:text-[#6773BB]'
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        id='next-button'
        onClick={nextClick}
        className='box border-2 border-[#6773BB] rounded-md bg-[#6773BB] text-[#fefefe] text-lg w-16 h-12 my-4 mr-4 ml-4'
        disabled={end === allPage}
      >
        next
      </button>
    </article>
  );
};
