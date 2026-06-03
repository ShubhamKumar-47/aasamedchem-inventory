export function convertToBaseUnit(
  quantity: number,
  unit: string
) {
  switch (unit) {
    case "KG":
      return quantity * 1000;

    case "G":
      return quantity;

    case "L":
      return quantity * 1000;

    case "ML":
      return quantity;

    case "ITEM":
      return quantity;

    default:
      return quantity;
  }
}