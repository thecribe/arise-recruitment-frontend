// phases/index.ts

import { compliancePhase } from "./compliance.phase";
import { declarationPhase } from "./declaration.phase";
import { personalPhase } from "./personal.phase";
import { professionalPhase } from "./professional.phase";

export const applicationPhases = [
  personalPhase,
  professionalPhase,
  compliancePhase,
  declarationPhase,
].sort((a, b) => a.order - b.order);
