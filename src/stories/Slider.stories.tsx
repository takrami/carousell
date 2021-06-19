import React from "react";
import { Story, Meta } from "@storybook/react";

import { Slider } from "../components/Slider";
import { SliderProps } from "../components/Slider/types";

import items from "./data";

export default {
  title: "Slider",
  component: Slider,
} as Meta;

const Template: Story<SliderProps> = (args) => <Slider {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  slides: items,
};
