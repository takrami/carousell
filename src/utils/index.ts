import { SliderConfig } from "../types";
import { defaultConfig } from "../constants";

const getConfig = (passedConfig: Partial<SliderConfig>): SliderConfig => {
  const config: SliderConfig = {
    ...defaultConfig,
    ...(passedConfig || {}),
  };
  return config;
};

export { getConfig };
