import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    navigate("/searched/" + input);
  };
  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch></FaSearch>
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
        />
      </div>
    </FormStyle>
  );
}
const FormStyle = styled.form`
  display: flex;
  justify-content: center;
  margin: 2rem 0;

  div {
    position: relative;
    width: 700px; /* Fixed width like the first image */
  }

  input {
    border: none;
    background: #5a5a5a; /* Solid gray background like first image */
    font-size: 1rem;
    color: white;
    padding: 0.8rem 1rem 0.8rem 2.5rem;
    border-radius: 2rem;
    outline: none;
    width: 100%;
    height: 48px; /* Fixed height for proper proportions */
    box-sizing: border-box;

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }

    &:focus {
      background: #4a4a4a;
    }
  }

  svg {
    position: absolute;
    top: 50%;
    left: 0.8rem;
    transform: translateY(-50%);
    color: white;
    font-size: 1rem;
    pointer-events: none;
  }
`;

export default Search;
