import styled from "styled-components";
import { AnimationType, DotsConfig } from "../../types";

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
  animationType: AnimationType;
}>`
  padding: 0;
  list-style-type: none;
  display: flex;
  width: ${({ sliderContainerWidth }) => `${sliderContainerWidth}px`};
  transform: ${({ slideWidth, currentIndex }) =>
    `translate3d(-${currentIndex * slideWidth}px, 0px, 0px)`};
  ${({ animationType, currentIndex }) => {
    switch (animationType) {
      case "lazy":
        return `
          transition: transform 1s ease;
        `;
      case "fade":
        return `
          &>li {
            opacity: 0;
          }
        
          &>li:nth-child(${currentIndex + 1}) {
            transition: opacity 2s ease;
            opacity: 1;
          }
        `;
      case "none":
      default:
        return "";
    }
  }};
`;

const Button = styled.button`
  position: absolute;
  transform: translateY(-100%);
  bottom: 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: transparent;
  border: none;
  @media only screen and (min-width: 768px) {
    transform: translateY(-50%);
    top: 50%;
    &:hover {
      transform: translateY(-50%) scale(1.2);
    }
  }
`;

const NextButton = styled(Button)`
  right: 16px;
`;

const PrevButton = styled(Button)`
  left: 16px;
`;

const DotsContainer = styled.ol`
  position: absolute;
  display: flex;
  gap: 12px;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  padding: 0;
`;

const Dot = styled.li<Omit<DotsConfig, "dots"> & { isActive: boolean }>`
  display: block;
  width: ${({ dotsSize }) => dotsSize};
  height: ${({ dotsSize }) => dotsSize};
  border-radius: 50%;
  background-color: ${({ isActive, dotsDefaultColor, dotsActiveColor }) =>
    isActive ? dotsActiveColor : dotsDefaultColor};
  &:hover {
    background-color: ${({ dotsHoverColor }) => dotsHoverColor};
    transform: scale(1.2);
  }
`;

export { Container, List, NextButton, PrevButton, DotsContainer, Dot };
