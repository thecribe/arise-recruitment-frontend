/**
 * -----------------------------------------------------------------------------
 * Simulates API latency.
 * -----------------------------------------------------------------------------
 */

export async function delay(ms = 400): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
