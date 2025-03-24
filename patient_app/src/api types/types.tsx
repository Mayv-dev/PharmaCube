export type ScheduleData = {
    id: number;
    day: number;
    hour: number;
    minute: number;
    time_period: number;
    taken?: boolean;
    missingDoseHandling?: string;
    medications?: Medication[]; 
};

export type Medication = {
    id: number;
    name: string;
    amount: string; 
    image?: string;
  };