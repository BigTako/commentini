"use client";
import styled from "styled-components";

const StyledMainContainer = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostsContainer = styled.div`
  width: 800px;
`;

const posts = [
  {
    id: "cc29443f-c5da-49a3-9a55-c8d721aad373",
    email: "3@gmail.com",
    username: "alex",
    text: "You can ",
    createdAt: "2024-07-01T06:32:31.220Z",
  },
  {
    id: "4d2ddf88-584a-4efb-9ff2-a5e53990d77c",
    email: "2@gmail.com",
    username: "alex",
    text: "You can also sort by properties of a relation. For example, the following query sorts all posts by the author's email address:",
    createdAt: "2024-07-01T06:32:22.633Z",
  },
  {
    id: "787158a9-3ccb-444f-999f-5ec76bfae91a",
    email: "2@gmail.com",
    username: "alex",
    text: "You can also sort by properties of a relation. For example, the following query sorts all posts by the author's email address:",
    createdAt: "2024-07-01T06:32:18.792Z",
  },
];

export default function Page(): JSX.Element {
  // const { data } = useQuery({
  //   queryKey: ["get-hello"],
  //   queryFn: () => getHello(),
  // });

  return (
    <StyledMainContainer>
      <PostsContainer>sheesh</PostsContainer>
    </StyledMainContainer>
  );
}
