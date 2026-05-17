export interface HumanProof {
  verifiedHuman: boolean;
  uniqueHuman: boolean;
  proofId: string;
  issuedAt: string;
  disclosureLevel: 'minimal' | 'custom';
}

export interface ZipVault {
  alias: string;
  vaultId: string;
  createdAt: string;
  proofsGenerated: number;
  lastConfidenceScore?: number;
  lastRiskLevel?: "low" | "medium" | "high";
}

/**
 * Generates a secure local identity vault.
 * In production, this generates a deterministic ZK seed and encrypts it locally.
 */
export async function createZipVault(alias: string): Promise<ZipVault> {
  // Simulate cryptographic latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const vaultId = `ZIP-${alias.toUpperCase().substring(0, 4)}-${randomSuffix}`;

  const vault: ZipVault = {
    alias,
    vaultId,
    createdAt: new Date().toISOString(),
    proofsGenerated: 0,
  };

  // Mock saving to secure local storage
  localStorage.setItem('zip_vault', JSON.stringify(vault));
  return vault;
}

/**
 * Retrieves the current local vault if it exists.
 */
export function getZipVault(): ZipVault | null {
  const data = localStorage.getItem('zip_vault');
  if (data) {
    try {
      return JSON.parse(data) as ZipVault;
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Generates a Zero-Knowledge Proof of Humanity.
 * In production, this compiles the Compact contract and invokes the
 * Midnight Compact Runtime to output an indexable ledger state transaction.
 */
export async function generateZKProof(
  vault: ZipVault, 
  disclosure: 'minimal' | 'custom' = 'minimal',
  confidenceScore?: number,
  riskLevel?: "low" | "medium" | "high"
): Promise<HumanProof> {
  // Simulate the cryptographic latency to maintain an immersive experience
  // (e.g., circuit witness generation, proof synthesis)
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  
  // Update vault stat
  const updatedVault: ZipVault = { 
    ...vault, 
    proofsGenerated: vault.proofsGenerated + 1,
    lastConfidenceScore: confidenceScore !== undefined ? confidenceScore : vault.lastConfidenceScore,
    lastRiskLevel: riskLevel !== undefined ? riskLevel : vault.lastRiskLevel
  };
  localStorage.setItem('zip_vault', JSON.stringify(updatedVault));

  return {
    verifiedHuman: true,
    uniqueHuman: true,
    proofId: `ZKSH-${randomSuffix}`,
    issuedAt: new Date().toISOString(),
    disclosureLevel: disclosure,
  };
}

/**
 * Clears the local vault (useful for demo resets).
 */
export function clearZipVault(): void {
  localStorage.removeItem('zip_vault');
}
