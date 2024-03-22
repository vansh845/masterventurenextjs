export interface Nominee {
  title: string;
  photoUrL: string;
  id: string;
}

export interface AwardCategory {
  id: string;
  items: Nominee[];
  title: string;
}

export interface AwardData {
  items: AwardCategory[];
}
