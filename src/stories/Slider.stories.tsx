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
    {Array.from(Array(15).keys()).map((index) => {
      return (
        <SliderItem key={index}>
          <div
            style={{
              backgroundColor: "black",
              height: "500px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontSize: "36px",
            }}
          >
            <div>{index}</div>
          </div>
        </SliderItem>
      );
    })}
  </Slider>
);

export const Basic = Template.bind({});
Basic.args = { ...defaultConfig };
