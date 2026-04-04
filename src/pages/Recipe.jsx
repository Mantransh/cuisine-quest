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
      <LeftSection>
        <RecipeTitle>{details.title}</RecipeTitle>
        <RecipeImage src={details.image} alt={details.title} />
      </LeftSection>

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

const DetailWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column; /* ✅ mobile first */
  gap: 2rem;
  padding: 0 1rem;

  @media (min-width: 768px) {
    flex-direction: row; /* ✅ desktop layout */
    align-items: flex-start;
    padding: 0;
  }

  h2 {
    margin-bottom: 1rem;
  }

  li {
    font-size: 0.95rem;
    line-height: 1.6rem;

    @media (min-width: 768px) {
      font-size: 1.1rem;
      line-height: 2rem;
    }
  }

  ul {
    margin-top: 1rem;
  }
`;

const LeftSection = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 40%;
  }
`;

const RecipeImage = styled.img`
  width: 100%; /* ✅ responsive */
  height: auto;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;

  @media (min-width: 768px) {
    height: 200px;
  }
`;

const Info = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    flex: 1;
    padding-left: 2rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* ✅ prevents overflow */
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  padding: 0.6rem 1rem;
  color: #313131;
  background: white;
  border: 2px solid #313131;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }

  &.active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
`;

const RecipeTitle = styled.h1`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #313131;

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const RecipeDescription = styled.p`
  line-height: 1.6;
  color: #555;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const RecipeInstructions = styled.div`
  h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }

  ul {
    padding-left: 1.2rem;
  }
`;

const RecipeInfo = styled.div`
  background: #f8f8f8;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #555;
  font-size: 0.9rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
    font-size: 1rem;
  }
`;

export default Recipe;