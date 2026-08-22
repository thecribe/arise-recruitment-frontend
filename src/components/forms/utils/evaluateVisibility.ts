import type { VisibilityCondition, VisibilityRule } from "../types/visibility";
import { getNestedValue } from "./getNestedValue";

function evaluateRule(
  rule: VisibilityRule,
  values: Record<string, unknown>,
): boolean {
  const actualValue = getNestedValue(values, rule.field);

  switch (rule.operator) {
    case "equals":
      return actualValue === rule.value;

    case "notEquals":
      return actualValue !== rule.value;

    case "contains":
      if (Array.isArray(actualValue)) {
        return actualValue.includes(rule.value);
      }

      if (typeof actualValue === "string") {
        return actualValue.includes(String(rule.value));
      }

      return false;

    case "notContains":
      if (Array.isArray(actualValue)) {
        return !actualValue.includes(rule.value);
      }

      if (typeof actualValue === "string") {
        return !actualValue.includes(String(rule.value));
      }

      return true;

    case "greaterThan":
      return Number(actualValue) > Number(rule.value);

    case "lessThan":
      return Number(actualValue) < Number(rule.value);

    case "isEmpty":
      return (
        actualValue === undefined ||
        actualValue === null ||
        actualValue === "" ||
        (Array.isArray(actualValue) && actualValue.length === 0)
      );

    case "isNotEmpty":
      return !evaluateRule(
        {
          ...rule,
          operator: "isEmpty",
        },
        values,
      );

    case "in":
      return Array.isArray(rule.value) && rule.value.includes(actualValue);

    case "notIn":
      return Array.isArray(rule.value) && !rule.value.includes(actualValue);

    default:
      return false;
  }
}

export function evaluateVisibility(
  condition: VisibilityCondition | undefined,
  values: Record<string, unknown>,
): boolean {
  if (!condition) {
    return true;
  }

  const results = condition.rules.map((rule) => evaluateRule(rule, values));

  if (condition.operator === "OR") {
    return results.some(Boolean);
  }

  return results.every(Boolean);
}
