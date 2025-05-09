import { User } from './user';

export type Post = {
  id: number;
  title: string;
  description: string;
  author: User;

  appliedByCurrentUser: boolean;
  currentPersonCount: number;
  createdAt: string;
  donationDate: string;
  participants: User[];
  myApplicationStatus?: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  location: string;
  capacity: number;
  maxamount: number;
  currentDonationAmount: number;
};

export type PostPayload = {
  title: string;
  category: string;
  capacity: number;
  isDonationOpen: boolean;
  maxAmount: number; //최대 후원 금액
  description: string;
  donationDate: string;
  location: string;
};

export type PostItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  createdAt: string;
  status: 'RECRUITING' | 'FULL' | 'CLOSED';
};
