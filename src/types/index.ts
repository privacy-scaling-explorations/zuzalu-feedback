export type Feedback = {
  id?: number;
  message: string;
  session_id: string;
  created_at: number;
  nullifier: string;
};

export type Session = {
  id: number;
  name: string;
  startDate: string;
  startTime: string;
  description: string;
  duration: string;
};
