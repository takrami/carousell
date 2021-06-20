interface DotsConfig {
  dots: boolean;
  dotsSize: string;
  dotsDefaultColor: string;
  dotsHoverColor: string;
  dotsActiveColor: string;
}

interface ArrowsConfig {
  nextArrow: any;
  prevArrow: any;
}

interface GlobalConfig {
  autoPlay: boolean;
  maxWidth: string;
  showArrows: boolean;
  animationType: AnimationType;
  delay: number;
  loop: boolean;
  onSlideChange: (index: number) => void;
  onSlideStart: (index: number) => void;
  onSlideEnd: (index: number) => void;
}

interface ChildrenProp {
  children:
    | React.ReactElement<SliderItemProps>
    | React.ReactElement<SliderItemProps>[];
}

type AnimationType = "lazy" | "fade" | "none";
type SliderConfig = GlobalConfig & DotsConfig & ArrowsConfig;
type SliderProps = Partial<SliderConfig> & ChildrenProp;

interface SliderItemProps {
  children: any;
}

export type {
  SliderConfig,
  SliderProps,
  SliderItemProps,
  DotsConfig,
  AnimationType,
};
