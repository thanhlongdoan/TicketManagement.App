import { Dispatch, SetStateAction } from "react";

export type FormTicketModel = {
  ticketId: number,
  issueType: string;
  summary: string;
  description: string;
  attachment: string;
  assignee: string;
  plannedStart: string
  dueDate: string
  originalEstimate: string
  remainingEstimate: string
  status: string;
};

export type FormTicketProps = {
  setToggleUpdate: Dispatch<SetStateAction<boolean>>;
};