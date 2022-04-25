// AUTH TYPES
// ------------------------------------------------
export type UserLoginType = {
  username: string;
  password: string;
};

export type UserSignupType = {
  email: string;
  username: string;
  password1: string;
  password2: string;
};

// Boards Types
// ------------------------------------------------
export type CreateBoardType = {
  title: string;
  description?: string;
};

export type BoardType = {
  created_date: string;
  description?: string;
  id: number;
  modified_date: string;
  title: string;
};

export type BoardResponseType = {
  count: number;
  next: null | string;
  previous: null | string;
  results: BoardType[];
};

// Status Types
// ------------------------------------------------
export type CreateStatusType = {
  title: string;
  description?: string;
};

export type StatusType = {
  created_date: string;
  description?: string;
  id: number;
  modified_date: string;
  title: string;
};

export type StatusResponseType = {
  count: number;
  next: null | string;
  previous: null | string;
  results: StatusType[];
};

// Task Types
// ------------------------------------------------

export type CreateTaskType = {
  board_object: BoardType;
  status_object: StatusType;
  status: number;
  title: string;
  description: string;
  board?: number;
};
