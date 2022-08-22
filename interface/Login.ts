export type LoginInput = {
  username: string;
  password: string;
};
export type LoginOutput = {
  accessToken: string;
};

export type LoginHeader = {
  Authorization: string;
};
