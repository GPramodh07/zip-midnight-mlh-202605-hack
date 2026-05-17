import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum DisclosureLevel { Minimal = 0, Restricted = 1 }

export enum Status { Unverified = 0, Verified = 1 }

export type DisclosureResult = { verifiedHuman: Status; level: DisclosureLevel
                               };

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  registerProof(context: __compactRuntime.CircuitContext<PS>,
                identityCommitment_0: Uint8Array,
                timestamp_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  verifyHuman(context: __compactRuntime.CircuitContext<PS>,
              identityCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  discloseHumanity(context: __compactRuntime.CircuitContext<PS>,
                   identityCommitment_0: Uint8Array,
                   level_0: DisclosureLevel): __compactRuntime.CircuitResults<PS, DisclosureResult>;
}

export type ProvableCircuits<PS> = {
  registerProof(context: __compactRuntime.CircuitContext<PS>,
                identityCommitment_0: Uint8Array,
                timestamp_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  verifyHuman(context: __compactRuntime.CircuitContext<PS>,
              identityCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  discloseHumanity(context: __compactRuntime.CircuitContext<PS>,
                   identityCommitment_0: Uint8Array,
                   level_0: DisclosureLevel): __compactRuntime.CircuitResults<PS, DisclosureResult>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  registerProof(context: __compactRuntime.CircuitContext<PS>,
                identityCommitment_0: Uint8Array,
                timestamp_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  verifyHuman(context: __compactRuntime.CircuitContext<PS>,
              identityCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  discloseHumanity(context: __compactRuntime.CircuitContext<PS>,
                   identityCommitment_0: Uint8Array,
                   level_0: DisclosureLevel): __compactRuntime.CircuitResults<PS, DisclosureResult>;
}

export type Ledger = {
  verificationStatus: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Status;
    [Symbol.iterator](): Iterator<[Uint8Array, Status]>
  };
  timestamps: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): bigint;
    [Symbol.iterator](): Iterator<[Uint8Array, bigint]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
