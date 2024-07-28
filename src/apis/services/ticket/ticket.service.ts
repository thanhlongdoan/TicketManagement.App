import { axiosClient } from "../../AxiosClient";
import { URL_TICKET_SERVICE } from "../../../constants/urls";

// API ticket service
const ticketApisService = {
  getAllTicket: () => axiosClient.get(`${URL_TICKET_SERVICE}`),
  getTicket: (ticketId: number) => axiosClient.get(`${URL_TICKET_SERVICE}/${ticketId}`),
  createTicket: (payload: any) => axiosClient.post(`${URL_TICKET_SERVICE}/`, payload),
  updateTicket: (ticketId: number, payload: any) => axiosClient.put(`${URL_TICKET_SERVICE}/${ticketId}`, payload),
  deleteTicket: (ticketId: number) => axiosClient.delete(`${URL_TICKET_SERVICE}/${ticketId}`)
};

export default ticketApisService;