import styled from "styled-components";

const Container = styled.div<{
  maxWidth: string;
}>`
  position: relative;
  width: ${({ maxWidth }) => maxWidth};
  overflow: hidden;
  border-radius: 4px;
  cursor: grab;
`;

const List = styled.ol<{
  sliderContainerWidth: number;
  currentIndex: number;
  slideWidth: number;
}>`
  padding: 0;
  list-style-type: none;
  display: flex;
  transition: transform 1s ease;
  width: ${({ sliderContainerWidth }) => `${sliderContainerWidth}px`};
  transform: ${({ currentIndex, slideWidth }) =>
    `translate3d(-${currentIndex * slideWidth}px, 0px, 0px)`};
`;

const Button = styled.button`
  color: var(--secondaryColor);
  position: absolute;
  bottom: 0%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  @media only screen and (min-width: 768px) {
    bottom: 50%;
    font-size: 3rem;
    &:hover {
      color: var(--primaryColor);
      transform: scale(1.2);
    }
  }
`;

const NextButton = styled(Button)`
  right: 1%;
`;

const PrevButton = styled(Button)`
  left: 1%;
`;

const DotsContainer = styled.ol`
  position: absolute;
  display: flex;
  gap: 8px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  padding: calc(var(--spacing) * 4);
`;

const Dot = styled.li<{ isActive: boolean }>`
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ isActive }) =>
    isActive ? "var(--primaryColor)" : "var(--secondaryColor)"};
  &:hover {
    color: var(--primaryColor);
    transform: scale(1.2);
  }
`;

export { Container, List, NextButton, PrevButton, DotsContainer, Dot };
