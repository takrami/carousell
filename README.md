# Other Slider

This is a npm package that can be used in React projects to handle the carousel part. Users of this application will be able to create their own carousel in their project with different setups.

Used technologies:

- React (as the main UI library)
- Typescript (typing)
- Styled-components (styling)
- Storybook (UI development and documentation)

## How to Run Storybook

Run:

```sh
yarn storybook
```

## How to use

`Slider` component can be used with the following parameters:
| parameter | type | default | description
| :------------ |:---------------|:----------|:---|
| autoPlay | boolean | false | Will enable auto play for the carousel.
| showArrows | boolean | true | Will hide or show next/previous arrows
| maxWidth | string | "100%" | Will change the slider wrapper width
| dots | boolean | true | Will hide or show slide bullets
| dotsSize | string | "10px" | Will change the bullets size
| dotsDefaultColor | string | "#bbb" | Will change the bullets color
| dotsHoverColor | string | "#ccc" | Will change the bullets hover color
| dotsActiveColor | string | "#fff" | Will change the bullets active color
| nextArrow | ReactNode| | Will change the next arrow
| prevArrow | ReactNode | | Will change the previous arrow
| animationType | string | "lazy" | Will change the type of animation. Can accept `lazy`, `fade`, `none`
| delay | number | 2000 | Will change the time of delay for each slide
| loop | boolean | true | Will change the finite or infinite slide's behaviour
| slidesToShow | number | 1 | Will change the number of items in each slide
| onSlideChange | function | | Triggers when current slide changes
| onSlideStart | function | | Triggers when current slide is the first slide
| onSlideEnd | function | | Triggers when current slide is the last slide

## See some live example here

https://compassionate-wing-b5af64.netlify.app/
