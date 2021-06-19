import { SliderItemInterface } from "../../types";

import {
  Container,
  Image,
  Caption,
  CaptionTitle,
  CaptionDescription,
} from "./style";

const SliderItem: React.FC<{
  sliderItem: SliderItemInterface;
}> = ({ sliderItem }) => {
  return (
    <Container>
      <Image src={sliderItem.image} alt={sliderItem.title} />
      <Caption>
        <CaptionTitle>{sliderItem.title}</CaptionTitle>
        <CaptionDescription>{sliderItem.description}</CaptionDescription>
      </Caption>
    </Container>
  );
};

export { SliderItem };
