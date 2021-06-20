import styled from "styled-components";

const Arrow = styled.div`
  width: 30px;
  height: 30px;
  border-right: 4px solid #ccc;
  border-bottom: 4px solid #ccc;

  &:hover {
    border-color: #fff;
  }
`;

const NextArrow = styled(Arrow)`
  transform: rotateZ(-45deg) skew(-10deg, -10deg);
`;

const PrevArrow = styled(Arrow)`
  transform: rotateZ(135deg) skew(-10deg, -10deg);
`;

export { NextArrow, PrevArrow };
