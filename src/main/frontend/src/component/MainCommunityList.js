import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./MainCommunityList.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, /*Autoplay*/ } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        navigation={true}
        loop={true}
        // speed={3000}
        // autoplay={{delay:0, disableOnInteraction:false}}
        modules={[Pagination, Navigation, /*Autoplay*/]}
        className="mySwiper"
      >
        <SwiperSlide>
          <h5>게시글 타이틀이 두 줄까지 노출됩니다</h5>
          <p>
            게시글 내용이 노출됩니다.게시글 내용이 노출됩니다.게시글 내용이
            노출됩니다.게시글 내용이 노출됩니다.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h5>게시글 타이틀이 두 줄까지 노출됩니다</h5>
          <p>
            게시글 내용이 노출됩니다.게시글 내용이 노출됩니다.게시글 내용이
            노출됩니다.게시글 내용이 노출됩니다.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h5>게시글 타이틀이 두 줄까지 노출됩니다</h5>
          <p>
            게시글 내용이 노출됩니다.게시글 내용이 노출됩니다.게시글 내용이
            노출됩니다.게시글 내용이 노출됩니다.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h5>게시글 타이틀이 두 줄까지 노출됩니다</h5>
          <p>
            게시글 내용이 노출됩니다.게시글 내용이 노출됩니다.게시글 내용이
            노출됩니다.게시글 내용이 노출됩니다.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h5>게시글 타이틀이 두 줄까지 노출됩니다</h5>
          <p>
            게시글 내용이 노출됩니다.게시글 내용이 노출됩니다.게시글 내용이
            노출됩니다.게시글 내용이 노출됩니다.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h5>게시글 타이틀이 두 줄까지 노출됩니다</h5>
          <p>
            게시글 내용이 노출됩니다.게시글 내용이 노출됩니다.게시글 내용이
            노출됩니다.게시글 내용이 노출됩니다.
          </p>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
