import { Button, Grid, Stack, Typography } from "@mui/material";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import { useEffect, useState } from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import { LoadingButton } from "@mui/lab";

interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

export default function PhotoUploadWidget({ loading, uploadPhoto }: Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>()

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    return (
        <Grid container spacing={1} sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
            <Grid item xs={4}>
                <Typography variant="body1">Step 1 - Add Photo</Typography>
                <PhotoWidgetDropzone setFiles={setFiles} />
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body1">Step 2 - Resize image</Typography>
                {
                    files && files.length > 0 && (
                        <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                    )
                }
            </Grid>
            <Grid item xs={4} >
                <Typography variant="body1">Step 3 - Preview & Upload</Typography>
                {
                    files && files.length > 0 &&
                    <>
                        <div className='img-preview' style={{ minHeight: 200, overflow: 'hidden' }} />
                        <Stack direction="row" spacing={1}>
                            <LoadingButton loading={loading} onClick={onCrop} variant="contained" color="success">Yes</LoadingButton>
                            <Button disabled={loading} onClick={() => setFiles([])} variant="outlined">Cancel</Button>
                        </Stack>
                    </>
                }

            </Grid>
        </Grid>
    )
}