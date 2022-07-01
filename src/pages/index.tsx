import type { NextPage } from "next";
import { useState } from "react";
import { Layout } from "../components/Layout";

const Home: NextPage = ({ book }) => {
  const [reviews, setReviews] = useState(null);

  const handleGetReviews = () => {
    // Client-side request are mocked by `mocks/browser.js`.
    fetch("/reviews")
      .then((res) => res.json())
      .then(setReviews);
  };

  return (
    <div>
      <button onClick={handleGetReviews}>Load reviews</button>
      <img src={book.imageUrl} alt={book.title} width="250" />
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      {reviews && (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.text}</p>
              <p>{review.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  // Server-side requests are mocked by `mocks/server.js`.
  const res = await fetch("https://my.backend/book");
  const book = await res.json();

  return {
    props: {
      book,
    },
  };
}
