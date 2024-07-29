import styled from "@emotion/styled";

const StyledLoaderContainer = styled("div")`
  & {
    .box {
      perspective: 120px;
    }

    .plane {
      border-radius: 5px;
      width: 1.8em;
      height: 1.8em;
      background-color: var(--color-secondary-500);
      transform: rotate(0);
      animation: flip 1s infinite;
    }

    @keyframes flip {
      50% {
        transform: rotateY(180deg);
      }
      100% {
        transform: rotateY(180deg) rotateX(180deg);
      }
    }
  }
`;

export function Loader() {
  return (
    <StyledLoaderContainer>
      <div className="box">
        <div className="plane"></div>
      </div>
    </StyledLoaderContainer>
  );
}
