export type board = {
  id: string;
  name: string;
  pic?: string;
  code: string;
  gridType?: string;
  gridTypeId?: number;
  size: Array<number>;
};

export type piece = {
  id: string;
  name: string;
  pic?: string;
  code: string;
};
