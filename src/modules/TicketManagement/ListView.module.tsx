import { FC, useEffect, useState } from "react";
import { ResponseAxios } from "../../type/AxiosType";
import { FormTicketModel } from "./FormTicket.config";
import ticketApisService from "../../apis/services/ticket/ticket.service";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import { EditTicket } from "./EditTicket.module";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const ListView = ({ isReloadList = false }) => {
  const isTicketDetailValues = {
    isOpen: false,
    id: -1,
    allowEdit: false
  };
  const [tickets, setTikcets] = useState<FormTicketModel[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isTicketDetail, setIsTicketDetail] = useState(isTicketDetailValues);

  // Fetch list ticket in system
  const fetchListTicket: () => Promise<void> = async () => {
    try {
      const response: ResponseAxios | any = await ticketApisService.getAllTicket();
      if (response?.data) {
        console.log(response?.data);
        setTikcets(response.data);
      }
    } catch (error: any) {
      console.error(error?.message || error);
    }
  };

  // Delete list ticket in system
  const deleteTicket: (id: number) => Promise<void> = async (id) => {
    try {
      const response: ResponseAxios | any = await ticketApisService.deleteTicket(id);
      console.log(response?.data);
      console.log("You just deleted ticket successfully!");
      fetchListTicket();
    } catch (error: any) {
      console.error(error?.message || error);
    }
  };

  useEffect(() => {
    fetchListTicket();
  }, []);

  useEffect(() => {
    if (isReloadList) {
      fetchListTicket();
    }
  }, [isReloadList, isReloadList]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ width: '1850px' }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <StyledTableCell>Ticket ID</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Summary</StyledTableCell>
              <StyledTableCell>Assignee</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {tickets.length == 0 ? "No data" : tickets.map((row) =>
            (
              <StyledTableRow key={row.ticketId}>
                <StyledTableCell component="th" scope="row">
                  {row.ticketId}
                </StyledTableCell>
                <StyledTableCell>{row.issueType}</StyledTableCell>
                <StyledTableCell>{row.summary}</StyledTableCell>
                <StyledTableCell>{row.assignee}</StyledTableCell>
                <StyledTableCell>{row.status}</StyledTableCell>
                <StyledTableCell sx={{ width: 12 }}>
                  <IconButton aria-label="edit" size="large" onClick={() => setIsTicketDetail({ isOpen: true, id: row.ticketId, allowEdit: false })}>
                    <VisibilityIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell sx={{ width: 12 }}>
                  <IconButton aria-label="edit" size="large" onClick={() => setIsTicketDetail({ isOpen: true, id: row.ticketId, allowEdit: true })}>
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell sx={{ width: 12 }}>
                  <IconButton aria-label="delete" size="large" onClick={() => deleteTicket(row.ticketId)}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isTicketDetail.isOpen && <EditTicket
        id={isTicketDetail.id} isEdit={isTicketDetail.allowEdit}
        onClose={() => setIsTicketDetail({ isOpen: false, id: -1, allowEdit: false })}
        onSubmited={() => fetchListTicket()} />}
    </>
  )
}