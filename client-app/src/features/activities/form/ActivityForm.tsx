import { Button, Paper, Stack, TextField, createTheme } from "@mui/material";
import { Activity } from "../../../app/models/Activity";
import { ChangeEvent, useEffect, useState } from "react";
import { DateTimeField, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LoadingButton } from "@mui/lab";

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  submitting: boolean
}

export default function ActivityForm({ activity: selectedActivity,
  closeForm,
  createOrEdit,
  submitting
}: Props) {
  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  }

  const [activity, setActivity] = useState(initialState);

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (activity.date) {
      const initialDate = dayjs(activity.date);
      setSelectedDate(initialDate);
    }
  }, [activity.date]);

  function handleSubmit() {
    activity.date = selectedDate!.toISOString();
    createOrEdit(activity);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value })
  }

  function handleDateChange(date: Dayjs | null) {
    setSelectedDate(date);
  }

  return (
    <Paper sx={{ p: "12px", borderRadius: "10px" }}>
      <form autoComplete="off" >
        <Stack spacing={1}>
          <TextField
            value={activity.title}
            name="title"
            label="Title"
            variant="outlined"
            size="small"
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            value={activity.description}
            name="description"
            multiline
            variant="outlined"
            size="medium"
            onChange={handleInputChange}
          />
          <TextField
            value={activity.category}
            name="category"
            label="Category"
            multiline
            variant="outlined"
            size="small"
            onChange={handleInputChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimeField
              name="date"
              label="Date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          <TextField
            value={activity.city}
            name="city"
            label="City"
            multiline
            variant="outlined"
            size="small"
            onChange={handleInputChange}
          />
          <TextField
            value={activity.venue}
            name="venue"
            label="Venue"
            multiline
            variant="outlined"
            size="small"
            onChange={handleInputChange}
          />

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button variant="contained" onClick={closeForm}>
              Cancel
            </Button>
            <LoadingButton loading={submitting} variant="contained" onClick={handleSubmit}>
              Submit
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </Paper>
  )
}