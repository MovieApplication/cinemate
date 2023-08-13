import {MovieListItems} from "utils/interface"
import Image from "next/image"
import {Virtual, Navigation} from "swiper"
import {Swiper, SwiperSlide} from "swiper/react"
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/virtual'
import home from 'styles/Home.module.scss'
import detail from 'pages/detail/Detail.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronLeft, faChevronRight, faCircleInfo} from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

interface MovieListProps {
  detailList: boolean;
  listItem: { title: string; item: MovieListItems[]; page: number; fetchNext?: () => void };
  width: number;
  height: number;
}

const MovieList = (props: MovieListProps) => {
  return (
    <Swiper
      modules={[Virtual, Navigation]}
      virtual
      slidesPerView={7.5}
      slidesPerGroup={7}
      navigation={{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      }}
      onReachEnd={() => props.listItem.fetchNext?.()}
      breakpoints={{
        1920: {
          width: 1920,
          slidesPerView: 7.5,
          slidesPerGroup: 7
        },
        1366: {
          width: 1366,
          slidesPerView: 6.5,
          slidesPerGroup: 6,
        },
        1280: {
          width: 1280,
          slidesPerView: 5.5,
          slidesPerGroup: 5,
        },
        1024: {
          width: 1024,
          slidesPerView: 4.5,
          slidesPerGroup: 4,
        },
        768: {
          width: 768,
          slidesPerView: 3.5,
          slidesPerGroup: 3,
        },
        424: {
          width: 424,
          slidesPerView: 2.5,
          slidesPerGroup: 3,
        },
        320: {
          width: 320,
          slidesPerView: 2.5,
          slidesPerGroup: 3,
        },
      }}
    >
      <div className="swiper-button-prev">
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div className="swiper-button-next">
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
      {
        props.listItem.item.map((items, index) => (
          <SwiperSlide key={items.id} virtualIndex={index}>
            <div className={!props.detailList ? home.popularItem : ''} data-idx={index + 1}>
              <Image
                src={items.poster_path === 'https://image.tmdb.org/t/p/w500/null' ? '/images/none_poster.png' : items.poster_path}
                alt={items.title}
                width={props.width}
                height={props.height}
              />
            </div>
            <Link href={`/detail/${encodeURIComponent(items.id)}`}>
              <ul className={props.detailList ? detail.cover : home.cover}>
                <li><FontAwesomeIcon icon={faCircleInfo} /></li>
                <li>{items.title}</li>
                <li><span>평점</span> {items.vote_average?.toFixed(1)} / 10</li>
                <li>{items.overview}</li>
              </ul>
            </Link>
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}

export default MovieList
