import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Category() {
  return (
    <List>
      <SLink to={"cuisine/Italian"}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </SLink>

      <SLink to={"cuisine/American"}>
        <FaHamburger />
        <h4>American</h4>
      </SLink>

      <SLink to={"cuisine/Thai"}>
        <GiNoodles />
        <h4>Thai</h4>
      </SLink>

      <SLink to={"cuisine/Japanese"}>
        <GiChopsticks />
        <h4>Japanese</h4>
      </SLink>
    </List>
  );
}

const List = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* ✅ important */
  gap: 1rem; /* ✅ better spacing */
  margin: 2rem 0rem;
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  text-decoration: none;

  background: linear-gradient(35deg, #494949, #313131);

  /* ✅ responsive size */
  width: 4.5rem;
  height: 4.5rem;

  cursor: pointer;
  transform: scale(0.9);
  transition: all 0.2s ease;

  @media (min-width: 640px) {
    width: 5.5rem;
    height: 5.5rem;
  }

  @media (min-width: 1024px) {
    width: 6rem;
    height: 6rem;
  }

  h4 {
    color: white;
    font-size: 0.7rem;
    margin-top: 0.2rem;

    @media (min-width: 768px) {
      font-size: 0.8rem;
    }
  }

  svg {
    color: white;
    font-size: 1.2rem;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }

  &.active {
    background: linear-gradient(to right, #f27121, #e94057);
  }

  &:hover {
    transform: scale(1);
  }
`;

export default Category;