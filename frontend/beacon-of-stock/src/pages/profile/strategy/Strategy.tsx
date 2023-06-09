import { TileBoard } from './TileBoard';
import { Pagenation } from '../../../component/Pagenation';
// import { SearchbarNone } from '../../../component/search/SearchbarNone';
// import StrategySelect from '../../../component/select_box/StrategySelect';
import { useEffect, useState, useCallback } from 'react';
import axios_api from '../../../assets/config/Axios';
import { getCookie } from '../../../assets/config/Cookie';
import { usePageStore } from '../../../store/store';
import { Link } from 'react-router-dom';

export const Strategy = () => {
  const { page, setPage } = usePageStore();
  const pageSize = 20;
  // const 게시물수 = 100;
  // const [totalElements, setTotalElements] = useState(게시물수);
  const [totalPages, setTotalPages] = useState(10);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const token = getCookie('accessToken');
  // console.log(items);
  const fetchData = useCallback(() => {
    setLoading(true); // 데이터를 요청할 때 로딩 상태 설정
    axios_api
      .get('/strategies', {
        headers: {
          authentication: token,
        },
        params: {
          pageSize: pageSize,
          pageNumber: page,
        },
      })
      .then((res) => {
        // console.log(res.data);
        // setTotalElements(res.data.totalElements);
        setTotalPages(res.data.totalPages);
        setItems(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // 데이터 요청 완료 후 로딩 상태 설정
      });
  }, []);

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <section>
      {loading ? (
        <div className='h-[600px] m-20'>
          {/* <div className='flex justify-between'>
            <div className='w-20 h-12 bg-gray-200 rounded-md animate-pulse'></div>
            <div className='w-64 h-12 bg-gray-200 rounded-md animate-pulse'></div>
          </div> */}
          <div className='grid grid-cols-5 ml-16'>
            <div className='w-64 m-8 bg-gray-200 rounded-md animate-pulse h-44'></div>
            <div className='w-64 m-8 bg-gray-200 rounded-md animate-pulse h-44'></div>
            <div className='w-64 m-8 bg-gray-200 rounded-md animate-pulse h-44'></div>
            <div className='w-64 m-8 bg-gray-200 rounded-md animate-pulse h-44'></div>
            <div className='w-64 m-8 bg-gray-200 rounded-md animate-pulse h-44'></div>
          </div>
          <div className='grid grid-cols-5 ml-16'>
            <div className='w-64 m-8 bg-gray-200 rounded-md animate-pulse h-44'></div>
            <div className='w-64 m-8 bg-gray-200 rounded-md animate-pulse h-44'></div>
            <div className='w-64 m-8 bg-gray-200 rounded-md animate-pulse h-44'></div>
            <div className='w-64 m-8 bg-gray-200 rounded-md animate-pulse h-44'></div>
            <div className='w-64 m-8 bg-gray-200 rounded-md animate-pulse h-44'></div>
          </div>
        </div>
      ) : (
        <>
          {items.length > 0 ? (
            <div className='m-9'>
              <p className='text-2xl font-KJCbold m-9'>내 전략조회</p>
              {/* 필터링 부분 나중에 다시 만질 일 있으면 ㄱㄱ */}
              {/* <article className='flex justify-between mx-5'>
                <div className='w-[68px] ml-6'>
                  <StrategySelect />
                </div>
                <div className='m-0 w-80'>
                  <SearchbarNone />
                </div>
              </article> */}
              <article className='grid grid-cols-1 ml-16 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 content-evenly'>
                {items.map((item, index) => (
                  <TileBoard key={index} item={item} />
                ))}
              </article>
              <article className='my-8'>
                <Pagenation totalPage={totalPages} />
              </article>
              {/* <article className='flex justify-center my-8 ml-32'>
                <SearchbarNone />
              </article> */}
            </div>
          ) : (
            <div className='grid content-center justify-center h-[600px]'>
              <p className='m-10 text-xl text-center font-KJCbold'>
                내 전략에 아무런 데이터가 없습니다.
              </p>
              <p className='mb-5 text-center'>
                내 전략보기 기능은 백테스트 후 저장하는 기능입니다.
              </p>
              <Link
                to='/'
                className='grid content-center bg-[#131313] text-[#fefefe] mx-20 p-2 rounded'
              >
                <p className='text-center'>백테스트하러 가기</p>
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};
