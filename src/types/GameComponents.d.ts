export type board = {
  id: string;
  name: string;
  description: string;
  pic?: string;
  grid_type_id: number;
  size: Array<number>;
  board_shape: string;
  rotation: string;
};

export type piece = {
  id: string;
  name: string;
  pic?: string;
  code: string;
};
