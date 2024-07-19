export function filterObj({
  obj,
  filterFields,
}: {
  obj: { [key: string]: unknown };
  filterFields: string[];
}) {
  const objCopy = { ...obj };
  for (const field of filterFields) {
    delete objCopy[field];
  }
  return objCopy;
}
