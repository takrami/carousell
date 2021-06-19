import { SliderItemInterface } from "../../types";

export interface SliderProps {
  slides: SliderItemInterface[];
  autoPlay?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
}
