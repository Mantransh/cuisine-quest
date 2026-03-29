import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import { Link } from "react-router-dom";

function Searched() {
  const [searchedRecipes, SetSearchedRecipes] = useState([]);
  let params = useParams();


  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );
    const recipes = await data.json();
    SetSearchedRecipes(recipes.results);
  };

  useEffect(() => {
   getSearched(params.search);

  }, [params.search]);

  return (
        <Grid>
  {searchedRecipes.map((item) => {
    return (
      <Card key={item.id}>
        <Link to={'/recipe/'+item.id}>
        <img src={item.image} alt="" />
        <h4>{item.title}</h4>
        </Link>
      </Card>
    );
  })}
</Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;


const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
