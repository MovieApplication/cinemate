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
  listItem: { title: string; item: MovieListItems[]; page: number };
  fnChangePage($page: number, $title?: string): void;
  perView: number;
  perGroup: number;
  width: number;
  height: number;
}

const MovieList = (props: MovieListProps) => {
  return (
    <Swiper
      modules={[Virtual, Navigation]}
      slidesPerView={props.perView}
      slidesPerGroup={props.perGroup}
      virtual
      navigation={{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      }}
      onReachEnd={() => props.fnChangePage(props.listItem.page + 1, props.listItem.title)}
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
            <div className={!props.detailList ? home.popularItem : ''} >
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
