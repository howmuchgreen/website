export interface HowMuch {
  kg: 83;
}

export interface Thing {
  name: string;
  co2eq: HowMuch;
  sources: string[];
}

export interface HowMuchResult extends Thing {}
