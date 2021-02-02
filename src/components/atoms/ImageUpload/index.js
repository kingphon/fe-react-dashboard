import React, { useState } from "react";
import { withStyles } from '@material-ui/core/styles'
import Button from "../Button"
import { CloudUploadOutlined, CloseOutlined, EditOutlined } from "@material-ui/icons";
import { LinearProgress } from "@material-ui/core";
import ErrorLine from "../ErrorLine";

const ImageUpload = ({
    source = "",
    name = 'image',
    width = "320px",
    height = "240px",
    objectFit = "cover",
    circle = false,
    config = {
        width: 480,
        quality: 0.8
    },
    onChange,
    error,
    ...rest
}) => {
    const [loadingProgress, setLoadingProgress] = useState(0)

    const onAdd = e => {
        if (!e.currentTarget.files[0]) {
            return false
        }
        const file = e.currentTarget.files[0]
        e.currentTarget.value = ""
        readFile(file, config, image => {
            onChange('', { name, value: image })
            setLoadingProgressUp(90, 100, setLoadingProgress)
            setTimeout(function () {
                setLoadingProgress(0)
            }, 500)
        }, setLoadingProgress)
    }
    const onRemove = () => {
        setLoadingProgress(0)
        onChange('', { name, value: '' })
    }
    return (
        <div style={{
            width,
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <div style={{
                    width,
                    height,
                    backgroundColor: source ? '#fff' : '#ccc',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '5px',
                    boxShadow: '#aeaeae 3px 3px 5px 1px',
                    borderRadius: circle ? '50%' : '0'
                }}
            >
                {source ? 
                    <img style={{ width: '100%', height: '100%', objectFit, borderRadius: circle ? '50%' : '0' }} src={source} alt="post" /> :
                    <span style={{ fontSize: '32px', alignSelf: 'center', display: 'flex' }}>
                        <span>{width.replace('px', '')}</span>
                        <span style={{ alignSelf: 'center', fontSize: '14px', padding: '8px' }}>x</span>
                        <span>{height.replace('px', '')}</span>
                    </span>}
            </div>
            {error && <ErrorLine message={error} />}
            {loadingProgress > 0 && <ColorLinearProgress
                style={{ width: '100%', height: 8, marginTop: '8px' }}
                variant="determinate"
                value={loadingProgress}
            />}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', marginTop: '16px' }}>
                <div>
                    <label style={{
                        display: 'flex',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        padding: '6px 16px',
                        fontSize: '0.875rem',
                        minWidth: '64px',
                        boxSizing: 'border-box',
                        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                        fontWeight: '500',
                        lineHeight: 1.75,
                        borderRadius: '4px',
                        letterSpacing: '0.02857em',
                        textTransform: 'uppercase',
                        color: '#fff',
                        backgroundColor: source ? '#f44336' : '#3f51b5',
                        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
                    }} for="file-upload" class="custom-file-upload">
                        {source ? <EditOutlined /> : <CloudUploadOutlined />}
                    </label>
                    <input style={{ display: 'none' }} id="file-upload" type="file" onChange={onAdd} />
                </div>
                {source && <Button 
                    color="secondary"
                    onClick={onRemove}
                >
                    <CloseOutlined />
                </Button>
                }
            </div>
        </div>
    )
};

const readFile = (file, config, callback, setLoadingProgress) => {
    const reader = new FileReader();
    setLoadingProgressUp(0, 10, setLoadingProgress)
    reader.readAsDataURL(file);
    reader.onload = event => {
        const img = new Image();
        img.src = event.target.result;
        setLoadingProgressUp(10, 30, setLoadingProgress)
        img.onload = () => {
            setLoadingProgressUp(30, 80, setLoadingProgress)
            const elem = document.createElement("canvas");
            const scaleFactor = config.width / img.width;
            elem.width = config.width;
            elem.height = img.height * scaleFactor;
            const ctx = elem.getContext("2d");
            ctx.drawImage(img, 0, 0, config.width, img.height * scaleFactor);
            setLoadingProgressUp(80, 90, setLoadingProgress)
            callback(elem.toDataURL("image/jpeg", config.quality));
        }
    };
};

const setLoadingProgressUp = (start, end, setLoadingProgress) => {
    for (let i = start; i <= end; i++) {
        setLoadingProgress(i)
    }
}

const ColorLinearProgress = withStyles({
    colorPrimary: {
        backgroundColor: '#b2dfdb',
    },
    barColorPrimary: {
        backgroundColor: '#4CAF50',
    },
})(LinearProgress);

export default ImageUpload
