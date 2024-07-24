import Image from "next/image";
import { TextOverflow } from "../text-overflow.component";
import styled from "@emotion/styled";

const StyledHeaderProfileInfoContainer = styled("div")`
  display: flex;
  gap: 20px;
  color: inherit;

  & > .header-profile-username {
    align-self: center;
    font-weight: normal;
  }

  & > .header-profile-img {
    border-radius: 20px;
    cursor: pointer;
  }
`;

export function HeaderProfileInfo({
  username,
  profileImage,
  onClick,
}: {
  username: string;
  profileImage: string;
  onClick?: () => void;
}) {
  return (
    <StyledHeaderProfileInfoContainer>
      <h4 className="header-profile-username">
        <TextOverflow maxWidth="150px">{username}</TextOverflow>
      </h4>

      <Image
        className="header-profile-img"
        onClick={onClick}
        src={profileImage}
        width={40}
        height={40}
        alt="Picture of the author"
      />
    </StyledHeaderProfileInfoContainer>
  );
}
