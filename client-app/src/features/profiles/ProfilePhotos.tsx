import { observer } from "mobx-react-lite";
import { Photo, Profile } from "../../app/models/Profile";
import { Box, Button, Card, CardActions, CardMedia, Grid, Typography } from "@mui/material";
import { useStore } from "../../app/stores/store";
import { SyntheticEvent, useState } from "react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { LoadingButton } from "@mui/lab";

interface Props {
    profile: Profile;
}

export default observer(function ProfilePhotos({ profile }: Props) {
    const { profileStore: { isCurrentUserProfileOwner, uploadPhoto,
        uploading, loading, setMainPhoto, deletePhoto } } = useStore();

    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState("");

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }

    return (
        <Grid>
            <Grid container direction="row" justifyContent="flex-end">
                <Grid item xs={isCurrentUserProfileOwner ? 10 : 12}>
                    <Typography variant="h5">Photos</Typography>
                </Grid>
                {isCurrentUserProfileOwner &&
                    <Grid item xs={2} sx={{ display: "flex", justifyContent: "flex-end" }} >
                        <Button
                            variant="outlined"
                            onClick={() => setAddPhotoMode(!addPhotoMode)}>
                            {addPhotoMode ? "Cancel" : "Add Photo"}
                        </Button>
                    </Grid>
                }
            </Grid>
            <Grid item xs={12}>
                {addPhotoMode ? (
                    <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                ) : (
                    <Box sx={{ display: "flex", gap: 2, py: 2 }}>
                        {profile.photos?.map(photo => (
                            <Card key={photo.id} sx={{ width: "240px" }}>
                                <CardMedia
                                    component="img"
                                    image={photo.url}
                                    sx={{
                                        height: "240px"
                                    }} />
                                {
                                    isCurrentUserProfileOwner && (
                                        <CardActions sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <LoadingButton
                                                variant="contained"
                                                disabled={photo.isMain}
                                                size="small"
                                                name={'setMain' + photo.id}
                                                loading={target === 'setMain' + photo.id && loading}
                                                onClick={e => handleSetMainPhoto(photo, e)}
                                            >
                                                Set main
                                            </LoadingButton>
                                            <LoadingButton
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                name={photo.id}
                                                loading={target === photo.id && loading}
                                                onClick={e => handleDeletePhoto(photo, e)}
                                                disabled={photo.isMain}
                                            >
                                                Remove
                                            </LoadingButton>
                                        </CardActions>
                                    )
                                }
                            </Card>
                        ))}
                    </Box>
                )}
            </Grid>
        </Grid >
    );
})