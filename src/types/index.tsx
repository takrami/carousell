interface DotsConfig {
  dots: boolean;
  dotsSize: string;
  dotsDefaultColor: string;
  dotsHoverColor: string;
  dotsActiveColor: string;
  isActive: boolean;
}

interface ArrowsConfig {
  nextArrow: any;
  prevArrow: any;
}

interface GlobalConfig {
  autoPlay: boolean;
  maxWidth: string;
  showArrows: boolean;
}

type SliderConfig = GlobalConfig & Omit<DotsConfig, "isActive"> & ArrowsConfig;

interface SliderProps extends SliderConfig {
  children:
    | React.ReactElement<SliderItemProps>
    | React.ReactElement<SliderItemProps>[];
}

interface SliderItemProps {
  children: any;
}

export type { SliderConfig, SliderProps, SliderItemProps, DotsConfig };
