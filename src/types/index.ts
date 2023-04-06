export type Feedback = {
  id?: number;
  message: string;
  session_id: string;
  created_at: number;
  nullifier: string;
};

export type Session = {
  id: number;
  created_at: string;
  name: string;
  start_date: string;
  start_time: string;
  description: string;
  duration: string;
};
