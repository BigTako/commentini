"use client";
import { styled } from "@mui/material";
import { useScreenSize } from "~/hooks/useScreenSize";

interface IPostPageContainerProps {
  $width: string | number;
}

const StyledMainContainer = styled("main")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPostPageContainer = styled("div")<IPostPageContainerProps>`
  width: ${(props) => {
    if (typeof props.$width === "string") {
      return props.$width;
    } else {
      return `${props.$width}px`;
    }
  }};
`;

function PostPageLayout({ children }: { children: React.ReactNode }) {
  const { isDesktop, isTablet } = useScreenSize();

  let width;

  if (isDesktop) {
    width = "800px";
  } else if (isTablet) {
    width = "500px";
  } else {
    width = "95%";
  }

  return (
    <StyledMainContainer>
      <StyledPostPageContainer $width={width}>
        {children}
      </StyledPostPageContainer>
    </StyledMainContainer>
  );
}

export default PostPageLayout;
