import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { LoadingButton } from "@mui/lab";
import { Paper, Stack, Button, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ActivityFormValues } from "../../../app/models/Activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import TextInput from "../../../app/common/form/TextInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import { v4 as uuid } from 'uuid'

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { createActivity, updateActivity,
    loadActivity, loadingInitial } = activityStore;

  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues())

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required('The activity description is required'),
    category: Yup.string().required('The activity category is required'),
    date: Yup.string().required('The activity date is required'),
    venue: Yup.string().required('The activity venue is required'),
    city: Yup.string().required('The activity city is required'),
  })

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)));
  }, [id, loadActivity])


  function handleFormSubmit(activity: ActivityFormValues) {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }
    else {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }
  }

  if (loadingInitial) return <LoadingComponent />

  return (
    <Paper sx={{ p: "12px", borderRadius: "10px" }}>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={values => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form onSubmit={handleSubmit} autoComplete="off" >
            <Stack spacing={1}>
              <Typography variant="h6">Activity Details</Typography>
              <TextInput name="title" placeholder="Title" />
              <TextInput ml name="description" placeholder="Description" />
              <SelectInput options={categoryOptions} name="category" placeholder="Category" />
              <DateInput name="date" placeholder="Date" />
              <Typography variant="h6">Location Details</Typography>
              <TextInput name="city" placeholder="City" />
              <TextInput name="venue" placeholder="Venue" />

              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button variant="contained" component={Link} to={`/activities/${activity.id}`}>
                  Cancel
                </Button>
                <LoadingButton
                  disabled={isSubmitting || !dirty || !isValid}
                  loading={isSubmitting} variant="contained" type="submit">
                  Submit
                </LoadingButton>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Paper>
  )
})