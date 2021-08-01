import { Spinner } from "react-bootstrap";
import { useDropzone } from 'react-dropzone';
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { uploadImage } from '../apis';

const Dropzone = styled.div`
    border:1px dashed #ced4d9;
    border-radius:5px;
    color:#6c757d;
    display:flex;
    align-items:center;
    justify-content:center;
    height:142px;
    img{
        height:140px;
    }
`;


function ImageDropZone({ value, onChange }) {
    const [loading, setLoading] = useState(false);
    const onDrop = useCallback((accepedFiles) => {
        console.log(accepedFiles);
        setLoading(true);
        uploadImage(accepedFiles[0]).then((json) => onChange(json.url)).finally(() => setLoading(false));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: 'image/*'
    });
    return (
        <Dropzone {...getRootProps()}>
        <input {...getInputProps()} />
        {
                value ?
                    (<img src={value} />): loading ?(<Spinner variant="standard" animation="border" role="status"></Spinner>) : (<span>Drag & drop file here, or click to</span>)
                        
        }
      </Dropzone>
    )
}

export default ImageDropZone;