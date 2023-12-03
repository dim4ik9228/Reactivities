import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import TextInput from "../../app/common/form/TextInput";
import { LoadingButton } from "@mui/lab";
interface Props {
    setEditMode: (editMode: boolean) => void;
}
export default observer(function ProfileEditForm({ setEditMode }: Props) {
    const { profileStore: { profile, updateProfile } } = useStore();
    return (
        <Formik
            initialValues={{
                displayName: profile?.displayName, bio:
                    profile?.bio
            }}
            onSubmit={values => {
                updateProfile(values).then(() => {
                    setEditMode(false);
                })
            }}
            validationSchema={Yup.object({
                displayName: Yup.string().required()
            })}
        >
            {({ isSubmitting, isValid, dirty }) => (
                <Form className='ui form'>
                    <TextInput placeholder='Display Name'
                        name='displayName' />
                    <TextInput ml placeholder='Add your bio'
                        name='bio' />
                    <LoadingButton
                        variant="contained"
                        type='submit'
                        loading={isSubmitting}
                        disabled={!isValid || !dirty}
                        sx={{ mt: 1 }}
                    >
                        Update Profile
                    </LoadingButton>
                </Form>
            )}
        </Formik>
    )
})