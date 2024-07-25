export type Institution = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password: string;
  name: string;
  phone: string;
  cnpj: string;
  category: string;
  state: string;
  city: string;
  avatar: string;
  url: string;
  uri: string;
  following_count: number;
  followers_count: number;
  donations: number;
  facebook: string;
  instagram: string;
};

export type InstitutionResponse = {
  id: number;
  email: string;
  name: string;
  phone: string;
  avatar: string;
  state: string;
  city: string;
  url: string;
  uri: string;
  category: string;
  following_count: number;
  followers_count: number;
  donations: number;
  facebook: string;
  instagram: string;
};
