import type { FieldCondition, VisibilityCondition } from "../types/condition";

function evaluateCondition(
  condition: FieldCondition,
  values: Record<string, unknown>,
): boolean {
  const currentValue = values[condition.field];

  switch (condition.operator) {
    case "equals":
      return currentValue === condition.value;

    case "notEquals":
      return currentValue !== condition.value;

    case "greaterThan":
      return Number(currentValue) > Number(condition.value);

    case "lessThan":
      return Number(currentValue) < Number(condition.value);

    case "contains":
      return Array.isArray(currentValue)
        ? currentValue.includes(condition.value)
        : String(currentValue).includes(String(condition.value));

    case "notContains":
      return Array.isArray(currentValue)
        ? !currentValue.includes(condition.value)
        : !String(currentValue).includes(String(condition.value));

    case "isEmpty":
      return (
        currentValue === undefined ||
        currentValue === null ||
        currentValue === ""
      );

    case "isNotEmpty":
      return !(
        currentValue === undefined ||
        currentValue === null ||
        currentValue === ""
      );

    case "in":
      return Array.isArray(condition.value)
        ? condition.value.includes(currentValue)
        : false;

    case "notIn":
      return Array.isArray(condition.value)
        ? !condition.value.includes(currentValue)
        : true;

    default:
      return true;
  }
}

export function evaluateVisibility(
  visibility: VisibilityCondition | undefined,
  values: Record<string, unknown>,
): boolean {
  if (!visibility) return true;

  const results = visibility.conditions.map((condition) =>
    evaluateCondition(condition, values),
  );

  return visibility.logic === "OR"
    ? results.some(Boolean)
    : results.every(Boolean);
}
