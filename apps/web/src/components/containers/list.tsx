import { List, ListItem, styled } from "@mui/material";

const StyledList = styled(List)`
  width: 100%;
`;

export function ListContainer<T>({
  id,
  items,
  renderItem,
}: {
  id: string;
  items: T[];
  renderItem: (_item: T) => JSX.Element;
}) {
  return (
    <StyledList>
      {items.map((item, i) => (
        <ListItem key={`${id}-${i}`}>{renderItem(item)}</ListItem>
      ))}
    </StyledList>
  );
}
