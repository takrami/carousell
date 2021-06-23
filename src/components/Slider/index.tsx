import React, { useState, useEffect, useRef, useCallback } from "react";

import { useWidth } from "../../hooks";
import { getConfig } from "../../utils";
import { SliderProps } from "../../types";

import {
  Container,
  List,
  NextButton,
  PrevButton,
  DotsContainer,
  Dot,
} from "./style";

const Slider: React.FC<SliderProps> = ({ children, ...passedConfig }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeNextArrow, setActiveNextArrow] = useState<boolean>(true);
  const [activePrevArrow, setActivePrevArrow] = useState<boolean>(true);
  const [dragStart, setDragStart] = useState<number>(0);
  const [dragEnd, setDragEnd] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const width: number = useWidth(sliderContainerRef);
  const config = getConfig(passedConfig);
  const slidesToShow = config.slidesToShow || 1;
  const itemsCount: number = Array.isArray(children) ? children.length : 1;
  const slidesCount: number = Math.ceil(itemsCount / slidesToShow);

  const nextSlide = useCallback((): void => {
    if (activeNextArrow) {
      if (currentIndex === slidesCount - 1) {
        if (config.loop) {
          setCurrentIndex(0);
        }
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }
  }, [currentIndex, slidesCount]);

  const prevSlide = useCallback((): void => {
    if (activePrevArrow) {
      if (currentIndex === 0) {
        if (config.loop) {
          setCurrentIndex(slidesCount - 1);
        }
      } else {
        setCurrentIndex(currentIndex - 1);
      }
    }
  }, [currentIndex, slidesCount]);

  useEffect(() => {
    if (!config.loop) {
      if (currentIndex !== 0 && currentIndex !== slidesCount - 1) {
        setActiveNextArrow(true);
        setActivePrevArrow(true);
      }
      if (currentIndex === slidesCount - 1) {
        setActiveNextArrow(false);
        config.onSlideEnd(currentIndex);
      }
      if (currentIndex === 0) {
        setActivePrevArrow(false);
        config.onSlideStart(currentIndex);
      }
    }
  }, [config.loop, slidesCount, currentIndex]);

  useEffect(() => {
    config.onSlideChange(currentIndex);
  }, [config.onSlideChange, currentIndex]);

  const onDrag = (): void => {
    if (dragStart < dragEnd) {
      prevSlide();
    } else {
      nextSlide();
    }
  };

  // When autoplay is true and it is not hovered slides go automatically. When slide is hovered it pauses the slideshow.
  useEffect(() => {
    if (config.autoPlay && !isHovered) {
      const timeout = setTimeout(() => {
        nextSlide();
      }, config.delay);
      return () => clearTimeout(timeout);
    }
    return;
  }, [config.autoPlay, config.delay, isHovered, nextSlide]);

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
        sliderContainerWidth={width * itemsCount}
        currentIndex={currentIndex}
        slideWidth={width}
        slidesToShow={slidesToShow}
        itemsCount={itemsCount}
        animationType={config.animationType}
      >
        {children}
      </List>
      {config.showArrows && (
        <>
          <NextButton
            aria-label="Next Slide"
            disabled={!activeNextArrow}
            onClick={nextSlide}
          >
            <config.nextArrow />
          </NextButton>
          <PrevButton
            aria-label="Previous Slide"
            disabled={!activePrevArrow}
            onClick={prevSlide}
          >
            <config.prevArrow />
          </PrevButton>
        </>
      )}
      {config.dots && itemsCount > 0 && (
        <DotsContainer>
          {Array.from(Array(slidesCount).keys()).map((index: number) => {
            return (
              <Dot
                aria-label={`Slide ${currentIndex}`}
                key={index}
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
