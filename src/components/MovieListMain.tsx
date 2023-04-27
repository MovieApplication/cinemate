import {MovieListItems} from "utils/interface"
import Image from "next/image"
import {Virtual, Navigation} from "swiper"
import {Swiper, SwiperSlide} from "swiper/react"
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/virtual'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons"

interface MovieListProps {
  ListItem: MovieListItems[];
}

const MovieListMain = (props: MovieListProps) => {
  return (
    <>
      <Swiper
        modules={[Virtual, Navigation]}
        slidesPerView={7.5}
        slidesPerGroup={7}
        virtual
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next'
        }}
      >
        <div className="swiper-button-prev">
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className="swiper-button-next">
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        {
          props.ListItem.map((items, index) => (
            <SwiperSlide key={items.id} spaceBetween={10} virtualIndex={index}>
              <Image
                src={items.poster_path === 'https://image.tmdb.org/t/p/w500/null' ? '/images/none_poster.png' : items.poster_path}
                alt={items.title}
                width={200}
                height={260}
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  )
}

export default MovieListMain
