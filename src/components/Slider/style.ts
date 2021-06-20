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
  slidesToShow: number;
  itemsCount: number;
  animationType: AnimationType;
}>`
  padding: 0;
  list-style-type: none;
  display: flex;
  width: ${({ sliderContainerWidth, slidesToShow }) =>
    `${(sliderContainerWidth / slidesToShow).toFixed(2)}px`};

  transform: ${({
    slideWidth,
    currentIndex,
    itemsCount,
    slidesToShow,
    sliderContainerWidth,
  }) => {
    const mod: number = itemsCount % slidesToShow;
    const itemWidth: number = sliderContainerWidth / slidesToShow / itemsCount;
    let translateX: number;

    if (itemsCount - mod === currentIndex * slidesToShow) {
      translateX = currentIndex * slideWidth - itemWidth * mod;
    } else {
      translateX = currentIndex * slideWidth;
    }

    return `translate3d(-${translateX}px, 0px, 0px)`;
  }};

  & > li {
    width: ${({ sliderContainerWidth, slidesToShow, itemsCount }) =>
      `${(sliderContainerWidth / slidesToShow / itemsCount).toFixed(2)}px`};
  }

  ${({ animationType, currentIndex, slidesToShow }) => {
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

          ${Array.from(Array(slidesToShow).keys()).map((index) => {
            return `&>li:nth-child(${index + slidesToShow * currentIndex + 1}) {
              transition: opacity 1s ease;
              opacity: 1;
            }`;
          })}
        
          
        `;
      case "none":
      default:
        return "";
    }
  }};
`;

const Button = styled.button<{
  disabled: boolean;
}>`
  position: absolute;
  transform: translateY(-100%);
  bottom: 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: transparent;
  border: none;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};

  @media only screen and (min-width: 768px) {
    transform: translateY(-50%);
    top: 50%;
    &:hover {
      ${({ disabled }) =>
        disabled ? "" : "transform: translateY(-50%) scale(1.2)"};
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
