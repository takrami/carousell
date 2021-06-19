import React from "react";
import { Story, Meta } from "@storybook/react";

import { Slider, SliderItem } from "../";
import { SliderProps } from "../types";

export default {
  title: "Slider",
  component: Slider,
} as Meta;

const Template: Story<SliderProps> = (args) => (
  <Slider {...args}>
    <SliderItem>ati</SliderItem>
    <SliderItem>
      <div style={{ height: "500px" }}>atefeh</div>
    </SliderItem>
    <SliderItem>x</SliderItem>
  </Slider>
);

const CustomNext = () => <span>{">>>"}</span>;

export const Basic = Template.bind({});
Basic.args = {
  nextArrow: CustomNext,
};

/* const Template: Story<SliderProps> = (args) => <Slider {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  slides: items,
};

export const Wrapped = Template.bind({});
Wrapped.args = {
  slides: items,
  maxWidth: "600px",
};
 */
