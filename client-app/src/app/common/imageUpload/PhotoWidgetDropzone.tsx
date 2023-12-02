import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Typography } from '@mui/material';

interface Props {
    setFiles: (files: any) => void;
}

export default function PhotoWidgetDropzone({ setFiles }: Props) {
    const dropzoneStyles = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '30px',
        textAlign: 'center' as 'center',
        height: 200
    }

    const dropzoneActive = {
        borderColor: 'green'
    }

    const onDrop = useCallback((acceptedFiles: any[]) => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    }, [setFiles]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={isDragActive ? { ...dropzoneStyles, ...dropzoneActive } : dropzoneStyles}>
            <input {...getInputProps()} />
            <DriveFolderUploadIcon />
            <Typography variant="h5">Drop image here</Typography>
        </div>
    )
}