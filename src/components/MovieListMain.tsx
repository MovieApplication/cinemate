import {MovieListItems} from "@/utils/interface"
import Image from "next/image"

interface MovieListProps {
  popularList: MovieListItems[];
}

const MovieListMain = (props: MovieListProps) => {
  return (
    <>
      {
        props.popularList.map((items) => (
          <Image src={items.poster_path} alt={items.title} key={items.id} width={150} height={210} />
        ))
      }
    </>
  )
}

export default MovieListMain
