export interface event {
  event_id: string;
  event_name: string;
  category: boolean;
  type: string;
  start: string;
  serie?: string[];
  org_user_id: string;
  weapon: string;
  gender: 'M' | 'F' | '';
  age: string;
  status: string;
  is_international: boolean;
}

export interface displayEvent {
  id: string;
  name: string;
  region: string;
  gender: string;
  weapon: string;
  age: string;
  type: string;
  rawDate: Date;
  displayDate: string;
}



