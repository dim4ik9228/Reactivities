import { Button, Paper, Stack, TextField, createTheme } from "@mui/material";
import { Activity } from "../../../app/models/Activity";
import { ChangeEvent, useState } from "react";

const cancelTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#bdbdbd", // Customize the cancel button's background color for the main state
          "&:hover": {
            backgroundColor: "#757575", // Customize the cancel button's background color for the hover state
          },
          "&:active": {
            backgroundColor: "#424242", // Customize the cancel button's background color for the active state
          },
        },
      },
    },
  },
});

const submitTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#4CAF50", // Customize the submit button's background color for the main state
          "&:hover": {
            backgroundColor: "#45A049", // Customize the submit button's background color for the hover state
          },
          "&:active": {
            backgroundColor: "#388E3C", // Customize the submit button's background color for the active state
          },
        },
      },
    },
  },
});

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({ activity: selectedActivity,
  closeForm,
  createOrEdit }: Props) {
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

  function handleSubmit() {
    createOrEdit(activity);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value })
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
          <TextField
            value={activity.date}
            name="date"
            label="Date"
            multiline
            variant="outlined"
            size="small"
            onChange={handleInputChange}
          />
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
            <Button variant="contained" onClick={closeForm} //theme={cancelTheme}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}//theme={submitTheme}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  )
}