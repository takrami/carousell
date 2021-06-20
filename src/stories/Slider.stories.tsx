import { Story, Meta } from "@storybook/react";

import { Slider, SliderItem } from "../";
import { SliderProps } from "../types";
import { defaultConfig } from "../constants";

export default {
  title: "Slider",
  component: Slider,
} as Meta;

const Template: Story<SliderProps> = (args) => (
  <Slider {...args}>
    <SliderItem key={0}>
      <div style={{ backgroundColor: "red", height: "500px" }}>1</div>
    </SliderItem>
    <SliderItem key={1}>
      <div style={{ backgroundColor: "blue", height: "500px" }}>2</div>
    </SliderItem>
    <SliderItem key={2}>
      <div style={{ backgroundColor: "green", height: "500px" }}>3</div>
    </SliderItem>
  </Slider>
);

export const Basic = Template.bind({});
Basic.args = { ...defaultConfig };
