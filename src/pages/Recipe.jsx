import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import React from "react";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  useEffect(() => {
  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  fetchDetails();
}, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <RecipeTitle>{details.title}</RecipeTitle>
        <RecipeImage src={details.image} alt={details.title} />
      </div>

      <Info>
        <ButtonContainer>
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>
        </ButtonContainer>

        {activeTab === "instructions" && (
          <RecipeInstructions>
            <h2>Summary</h2>
            <RecipeInfo dangerouslySetInnerHTML={{ __html: details.summary }} />

            {/* Using RecipeDescription to remove warning */}
            <RecipeDescription>
              {details.summary?.replace(/<[^>]+>/g, "")}
            </RecipeDescription>

            <h2>Instructions</h2>
            <div dangerouslySetInnerHTML={{ __html: details.instructions }} />
          </RecipeInstructions>
        )}

        {activeTab === "ingredients" && (
          <div>
            <h2>Ingredients</h2>
            <ul>
              {details?.extendedIngredients?.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
        )}
      </Info>
    </DetailWrapper>
  );
}

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  color: #313131;
  background: white;
  border: 2px solid #313131;
  margin-right: 1rem;
  font-weight: 600;
  cursor: pointer;

  &.active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
`;

const Info = styled.div`
  flex: 1;
  padding-left: 2rem;
`;

const DetailWrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  h2 {
    margin-bottom: 1rem;
  }

  li {
    font-size: 1.1rem;
    line-height: 2rem;
  }

  ul {
    margin-top: 1rem;
  }
`;

const RecipeImage = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const RecipeTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #313131;
`;

const RecipeDescription = styled.p`
  line-height: 1.6;
  color: #555;
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const RecipeInstructions = styled.div`
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #313131;
  }

  ul {
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  strong {
    font-weight: bold;
  }
`;

const RecipeInfo = styled.div`
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: #555;
  font-size: 1rem;
`;

export default Recipe;