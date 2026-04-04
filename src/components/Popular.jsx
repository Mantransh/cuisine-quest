import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );
      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };

  return (
    <Wrapper>
      <h3>Popular Picks</h3>

      <Grid>
        {popular.map((recipe) => (
          <Card key={recipe.id}>
            <Link to={"/recipe/" + recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
              <Gradient />
              <p>{recipe.title}</p>
            </Link>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  @media (min-width: 768px) {
    margin: 4rem auto;

    h3 {
      font-size: 2rem;
    }
  }
`;

const Grid = styled.div`
  display: grid;

  /* ✅ Show multiple dishes */
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  height: 8rem;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  background: #f0f0f0;
  transition: transform 0.2s ease-in-out;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;

    font-size: 0.75rem;
    font-weight: 600;
    color: white;

    padding: 0.5rem;
    z-index: 3;

    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
  }

  &:hover {
    transform: scale(1.05);
  }

  a {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
  }
`;

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8),
    transparent
  );

  z-index: 2;
`;

export default Popular;