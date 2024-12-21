type Candidate = {
  confidence: number;
  matches_template: number;
  plate: string;
};

type Coordinate = { x: number; y: number };

export type Metadata = {
  candidates: Candidate[];
  region: string;
  coordinates: Coordinate[];
};
