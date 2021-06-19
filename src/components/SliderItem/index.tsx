import React from "react";

import { SliderItemProps } from "../../types";
import { Container } from "./style";

const SliderItem: React.FC<SliderItemProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export { SliderItem };
