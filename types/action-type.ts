export const ActionType = {
  register: 0,
  update: 1,
  refer: 2,
  delete: 3,
} as const;

export type ActionType = (typeof ActionType)[keyof typeof ActionType];
