import React, { FC } from "react";
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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

type TicketProps = {
  onSubmited: () => void;
};

export const AddTicket: FC<TicketProps> = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITicketPayload>();

  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs());
  const [dueDate, setDueDate] = React.useState<Dayjs | null>(dayjs());
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    setSelectedFile('');
  };

  const onFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <React.Fragment>
      <Button sx={{ color: '#fff' }} variant="outlined" onClick={handleClickOpen}>
        Add Ticket
      </Button>
      <Dialog
        open={open}
        maxWidth="md"
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            formData.append("attachment", selectedFile);
            formData.append("plannedStart", startDate as any);
            formData.append("dueDate", dueDate as any);
            try {
              await ticketApisService.createTicket(formData);
              console.log("You just created successfully a new ticket !");
              reset();
              props.onSubmited();
              handleClose();
            } catch (error: any) {
              console.log(error?.message || error);
            }
            handleClose();
          }
        }}
      >
        <DialogTitle>Add Ticket</DialogTitle>
        <DialogContent>
          <FormControl fullWidth
            sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Type"
              required
              {...register("issueType")}
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
            required
            sx={{ mt: 3 }}
            {...register("summary")}
          />
          {errors.summary && (
            <p className="error-msg">{errors.summary.message}</p>
          )}
          <TextField
            className="input-field"
            label="Description"
            fullWidth
            variant="outlined"
            sx={{ mt: 3 }}
            multiline
            rows={10}
            {...register("description")}
          />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            sx={{ mt: 3 }}
            onChange={onFileChange}
            startIcon={<CloudUploadIcon />}
          >
            Attach file
            <VisuallyHiddenInput type="file" />
          </Button>
          <Typography>{(selectedFile as any).name || ''}</Typography>
          <TextField
            className="input-field"
            label="Assignee"
            fullWidth
            sx={{ mt: 3 }}
            {...register("assignee")}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateField']} sx={{ mt: 2, width: '100%' }}>
              <DatePicker label="Plan Start"
                value={startDate}
                sx={{ width: '100%' }}
                onChange={(newValue) => setStartDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateField']} sx={{ mt: 2, width: '100%' }}>
              <DatePicker label="Due Date"
                value={dueDate}
                sx={{ width: '100%' }}
                onChange={(newValue) => setDueDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            className="input-field"
            label="Original Estimate(h)"
            fullWidth
            sx={{ mt: 3 }}
            {...register("originalEstimate")}
          />
          <TextField
            className="input-field"
            label="Remaining Estimate(h)"
            fullWidth
            sx={{ mt: 3 }}
            {...register("remainingEstimate")}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }} >
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
};