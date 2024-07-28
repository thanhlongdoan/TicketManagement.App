export interface ITicketPayload {
  issueType: string;
  summary: string;
  description: string;
  attachment: File;
  assignee: string;
  plannedStart: any;
  dueDate: any;
  originalEstimate: any;
  remainingEstimate: any;
  status: string;
}
