import axios from "axios";
import {useEffect, useState } from 'react';
import SingleContent from '../../components/SingleContent/SingleContent';
import useGenre from '../../hooks/useGenre';
import Genres from '../../components/Genres/Genres';


const Series = () => {

const [genres, setGenres] = useState([]);
const [page, setPage] = useState(1);
const [content, setContent] = useState([]);
const [selectedGenres, setSelectedGenres] = useState([]);
const genreforURL = useGenre(selectedGenres);


  const fetchSeries = async () => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
        console.log(data);
    setContent(data.results);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSeries();
    // eslint-disable-next-line
  }, [page, genreforURL]);

  return (
    <div>
    <span className="pageTitle">TV Series</span>
    <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
    <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}

    </div>
</div>
  )
}

export default Series;