import axios from 'axios';
import { useContext, useReducer } from 'react';
import Layout from './components/Layout';
import { Store } from './utils/store';

export const getStaticProps = async () => {
  const res = await fetch(
    'https://api.themoviedb.org/3/search/movie?api_key=78d6a790042411afdd8c3fe79c46fe94&query=a'
  );
  const data = await res.json();

  return { props: { movies: data.results } };
};

export default function Home({ movies }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  // const product = movies.find((x) => x.id === id);

  const addToCartHandler = async (movie) => {
    const existItem = state.cart.cartItems.find((x) => x.id === movie.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...movie.original_title, quantity },
    });
  };

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
              <h2>Price: {movie.id} BATH</h2>
              <button className="p-2 bg-blue-200 rounded-md m-2 hover:bg-blue-300">
                <div onClick={addToCartHandler}>Add to Cart</div>
              </button>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}
