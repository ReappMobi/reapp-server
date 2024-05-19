export type Institution = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password: string;
  name: string;
  phone: string;
  cnpj: string;
  displayName: string;
  avatar: string;
  url: string;
  uri: string;
  following_count: number;
  followers_count: number;
  donations: number;
};

export type InstitutionResponse = {
  id: number;
  email: string;
  name: string;
  phone: string;
  displayName: string;
  avatar: string;
  url: string;
  uri: string;
  following_count: number;
  followers_count: number;
  donations: number;
};
