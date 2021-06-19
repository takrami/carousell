import React, { useState, useEffect, useRef, useCallback } from "react";

import { useWidth } from "../../hooks/utils";
import { SliderProps, SliderConfig } from "../../types";

import {
  Container,
  List,
  NextButton,
  PrevButton,
  DotsContainer,
  Dot,
} from "./style";

const DefaultNextButton = () => <span>next</span>;
const DefaultPrevButton = () => <span>Prev</span>;

const initialConfig: SliderConfig = {
  autoPlay: false,
  showArrows: true,
  maxWidth: "100%",
  dots: true,
  dotsSize: "red",
  dotsDefaultColor: "red",
  dotsHoverColor: "blue",
  dotsActiveColor: "black",
  nextArrow: DefaultNextButton,
  prevArrow: DefaultPrevButton,
};

const Slider: React.FC<SliderProps> = ({ children, ...passedConfig }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [dragStart, setDragStart] = useState<number>(0);
  const [dragEnd, setDragEnd] = useState<number>(0);
  const [delay, setDelay] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const width: number = useWidth(sliderContainerRef);

  const config = { ...initialConfig, ...(passedConfig || {}) };

  console.log(config);

  const slidesLength: number = Array.isArray(children) ? children.length : 1;

  const nextSlide = useCallback((): void => {
    setCurrentIndex(currentIndex === slidesLength - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, slidesLength]);

  const prevSlide = useCallback((): void => {
    setCurrentIndex(currentIndex === 0 ? slidesLength - 1 : currentIndex - 1);
  }, [currentIndex, slidesLength]);

  const onDrag = (): void => {
    if (dragStart < dragEnd) {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  // It gets delay from data file
  useEffect(() => {
    setDelay(200);
  }, [currentIndex]);

  // When autoplay is true and it is not hovered slides go automatically. When slide is hovered it pauses the slideshow.
  useEffect(() => {
    if (config.autoPlay && !isHovered) {
      const timeout = setTimeout(() => {
        nextSlide();
      }, delay);
      return () => clearTimeout(timeout);
    }
    return;
  }, [config.autoPlay, delay, isHovered, nextSlide]);

  useEffect(() => {
    const handleKeyNavigation = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          prevSlide();
          break;
        case "ArrowRight":
          nextSlide();
          break;
        default:
          return;
      }
    };
    document.addEventListener("keydown", handleKeyNavigation);

    return () => document.removeEventListener("keydown", handleKeyNavigation);
  }, [nextSlide, prevSlide]);

  return (
    <Container
      maxWidth={config.maxWidth}
      aria-label="Minimal Images"
      ref={sliderContainerRef}
      onDragStart={(e) => {
        setDragStart(e.clientX);
      }}
      onDragLeave={(e) => {
        setDragEnd(e.clientX);
      }}
      onDragEnd={() => {
        onDrag();
      }}
      onTouchStart={(e) => {
        setDragStart(e.changedTouches[0].clientX);
      }}
      onTouchEnd={(e) => {
        setDragEnd(e.changedTouches[0].clientX);
        onDrag();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <List
        sliderContainerWidth={width * slidesLength}
        currentIndex={currentIndex}
        slideWidth={width}
      >
        {children}
      </List>
      {config.showArrows && (
        <>
          <NextButton aria-label="Next Slide" onClick={nextSlide}>
            <config.nextArrow />
          </NextButton>
          <PrevButton aria-label="Previous Slide" onClick={prevSlide}>
            <config.prevArrow />
          </PrevButton>
        </>
      )}
      {config.dots && Array.isArray(children) && (
        <DotsContainer>
          {children.map((slide: any, index: number) => {
            return (
              <Dot
                aria-label={`Slide ${currentIndex}`}
                key={slide.id}
                isActive={index === currentIndex}
                onClick={() => {
                  setCurrentIndex(index);
                }}
                dotsDefaultColor={config.dotsDefaultColor}
                dotsActiveColor={config.dotsActiveColor}
                dotsHoverColor={config.dotsHoverColor}
                dotsSize={config.dotsSize}
              />
            );
          })}
        </DotsContainer>
      )}
    </Container>
  );
};

export { Slider };
