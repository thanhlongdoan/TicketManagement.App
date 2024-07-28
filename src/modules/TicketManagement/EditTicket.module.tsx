import React, { FC, useEffect, useState } from "react";
import ticketApisService from "../../apis/services/ticket/ticket.service";
import { ITicketPayload } from "../../apis/services/ticket/ticket.type";
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select, styled, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { FormTicketModel } from "./FormTicket.config";
import { ResponseAxios } from "type/AxiosType";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type TicketProps = {
  id: number;
  isEdit?: boolean;
  onClose: () => void;
  onSubmited: () => void;
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const EditTicket: FC<TicketProps> = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITicketPayload>();

  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
  const [dueDate, setDueDate] = React.useState<Dayjs | null>(dayjs());
  const [ticket, setTicket] = useState<FormTicketModel>();
  const [selectedFile, setSelectedFile] = React.useState('');

  useEffect(() => {
    if (props.id) {
      getTicketById(props.id);
    }
  }, [props.id]);

  const getTicketById: (id: number) => Promise<void> = async (id) => {
    try {
      const response: ResponseAxios | any = await ticketApisService.getTicket(id);
      if (response?.data) {
        console.log(response?.data);
        setTicket(response.data as FormTicketModel);
        setStartDate(dayjs(new Date(response.data?.plannedStart)));
        setDueDate(dayjs(new Date(response.data?.dueDate)));
      }
    } catch (error: any) {
      console.log(error?.message || error);
    }
  };

  const handleClose = () => {
    props.onClose();
  };

  const onFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <React.Fragment>
      <Dialog
        open={true}
        maxWidth="md"
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            formData.append("attachment", selectedFile);
            formData.append("plannedStart", startDate?.add(1, 'day') as any);
            formData.append("dueDate", dueDate?.add(1, 'day') as any);
            try {
              await ticketApisService.updateTicket(props.id, formData);
              console.log("You just created successfully a new ticket !");
              props.onSubmited();
            } catch (error: any) {
              console.log(error?.message || error);
            }
            handleClose();
          }
        }}
      >
        <DialogTitle>{props.id ? "Ticket Detail" : "Add Ticket"}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth
            sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              required
              value={ticket?.issueType || ''}
              {...register("issueType")}
              disabled={!props.isEdit}
            >
              <MenuItem value={"Bug"}>Bug</MenuItem>
              <MenuItem value={"Dev Task"}>Dev Task</MenuItem>
              <MenuItem value={"QC Task"}>QC Task</MenuItem>
            </Select>
          </FormControl>
          <TextField
            className="input-field"
            label="Summary"
            fullWidth
            value={ticket?.summary || ''}
            sx={{ mt: 3 }}
            required
            disabled={!props.isEdit}
            {...register("summary")}
            onChange={(e) => setTicket({ ...ticket as FormTicketModel, summary: e.target.value || '' })}
          />
          {errors.summary && (
            <p className="error-msg">{errors.summary.message}</p>
          )}
          <TextField
            className="input-field"
            label="Description"
            fullWidth
            value={ticket?.description || ''}
            variant="outlined"
            sx={{ mt: 3 }}
            multiline
            rows={10}
            disabled={!props.isEdit}
            {...register("description")}
            onChange={(e) => setTicket({ ...ticket as FormTicketModel, description: e.target.value || '' })}
          />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            sx={{ mt: 3 }}
            disabled={!props.isEdit}
            onChange={onFileChange}
            startIcon={<CloudUploadIcon />}
          >
            Attach file
            <VisuallyHiddenInput type="file" />
          </Button>
          <Typography>{(selectedFile as any).name || ''}</Typography>
          <img
            src={ticket?.attachment || ''}
            loading="lazy"
            width={'800px'}
          />
          <TextField
            className="input-field"
            label="Assignee"
            fullWidth
            value={ticket?.assignee || ''}
            sx={{ mt: 3 }}
            disabled={!props.isEdit}
            {...register("assignee")}
            onChange={(e) => setTicket({ ...ticket as FormTicketModel, assignee: e.target.value || '' })}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateField']} sx={{ mt: 2, width: '100%' }}>
              <DatePicker label="Plan Start"
                value={startDate}
                disabled={!props.isEdit}
                sx={{ width: '100%' }}
                onChange={(newValue) => setStartDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateField']} sx={{ mt: 2, width: '100%' }}>
              <DatePicker label="Due date"
                value={dueDate}
                disabled={!props.isEdit}
                sx={{ width: '100%' }}
                onChange={(newValue) => setDueDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            className="input-field"
            label="Original Estimate(h)"
            fullWidth
            value={ticket?.originalEstimate || ''}
            sx={{ mt: 3 }}
            disabled={!props.isEdit}
            {...register("originalEstimate")}
            onChange={(e) => setTicket({ ...ticket as FormTicketModel, originalEstimate: e.target.value || '' })}
          />
          <TextField
            className="input-field"
            label="Remaining Estimate(h)"
            fullWidth
            value={ticket?.remainingEstimate || ''}
            sx={{ mt: 3 }}
            disabled={!props.isEdit}
            {...register("remainingEstimate")}
            onChange={(e) => setTicket({ ...ticket as FormTicketModel, remainingEstimate: e.target.value || '' })}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }} >
          <Button onClick={handleClose}>Cancel</Button>
          <Button style={{ display: props.isEdit ? "block" : "none" }} type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
};