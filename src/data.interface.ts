export interface Band {
  members: Members;
}

export interface Members {
  current: Player[];
  past: Player[];
}

export interface AllMembers extends Members {
  all: string[];
}

export interface Player {
  name: string;
  age: number;
  plays: string[];
}

export interface Plays {
  vocals: string[];
  synth: string[];
  guitar: string[];
  bass: string[];
  drums: string[];
}

export interface Expected {
  members: AllMembers;
  plays: Plays;
}
