import type { ComplianceCertificate } from "../types/compliance.types";

export type ExpiryStatus =
  | "missing"
  | "expired"
  | "expiring_soon"
  | "valid"
  | "no_expiry";

export const getCertificateExpiryStatus = (
  certificate: ComplianceCertificate | null,
  today = new Date(),
): ExpiryStatus => {
  if (!certificate) {
    return "missing";
  }

  if (!certificate.expiryDate) {
    return "no_expiry";
  }

  const expiry = new Date(`${certificate.expiryDate}T00:00:00`);
  const current = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  if (Number.isNaN(expiry.getTime())) {
    return "no_expiry";
  }

  if (expiry < current) {
    return "expired";
  }

  const daysRemaining = Math.floor(
    (expiry.getTime() - current.getTime()) / 86_400_000,
  );

  if (daysRemaining <= 30) {
    return "expiring_soon";
  }

  return "valid";
};
