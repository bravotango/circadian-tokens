import { Condition } from "./condition";

export type Current = {
  id: number;
  condition: Condition;
  description: string;
  icon: string;
  temperature: number;
};
