import styles from '../styles/MovieCard.module.css'

const MovieCard = ({Movie}) => {

  const imgUrl = `https://image.tmdb.org/t/p/w1280`
  return (
    <div className={styles.movie}>
      <img src={`${imgUrl}${Movie.poster_path}`} alt="" className='img-fluid w-100'/>
    </div>
  )
}

export default MovieCard