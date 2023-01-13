import axios from 'axios';
import Layout from './components/Layout';

export const getStaticProps = async () => {
  const res = await fetch(
    'https://api.themoviedb.org/3/search/movie?api_key=78d6a790042411afdd8c3fe79c46fe94&query=a'
  );
  const data = await res.json();

  return { props: { movies: data.results } };
};

export default function Home({ movies }) {
  return (
    <>
      <Layout title="Home-page">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="card flex flex-col items-center justify-between border-solid border-2 border-black rounded-md"
            >
              <h1 className="text-center">{movie.original_title}</h1>
              <img src={movie.backdrop_path} />
              <button className="p-2 bg-blue-200 rounded-md m-2 hover:bg-blue-300">
                <div>Add to Cart</div>
              </button>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}
