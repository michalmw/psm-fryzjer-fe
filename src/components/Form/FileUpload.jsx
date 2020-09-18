import * as React from 'react';

import { faFileDownload, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@material-ui/core';
import "./FieldUpload.scss"
import { uploadFileAlert } from './Alerts';

const Thumb = ({ file, onDelete, name }) => {
    const [loading, setLoading] = React.useState(false);
    const [thumb, setThumb] = React.useState(undefined);

    React.useEffect(() => {
        if (file && typeof file !== 'string') {
            const reader = new FileReader();
            setLoading(true);
            reader.onloadend = ({target}) => {
                setLoading(false);
                setThumb(target.result);
            };
            reader.readAsDataURL(file);
        } 
        if (file && typeof file === 'string') {
            setThumb(file);
        }
    }, [file]);
  
      return !file && null 
        || loading && <p>loading...</p>
        || (
            <div className="thumb">
                <img src={thumb}
                    alt={file.name}
                    className="img-thumbnail"
                    height={200}
                    width={200}
                />
                <p>{file.name || name}</p>
                <a href={thumb} target="_blank" rel="noopener noreferrer" download>
                    <IconButton><FontAwesomeIcon icon={ faFileDownload } /></IconButton>
                </a>
                <IconButton onClick={onDelete}><FontAwesomeIcon icon={ faTrash } /></IconButton>
            </div>
        )
}

const FileUpload  = ({ value, onDelete, label, setImage, id, name }) => {
    const [errorAlert, setAlert] = React.useState(false);

    React.useEffect(() => {
        const file = value;
        if (file && file.size > 2097152) { // 2mb
            setAlert(true);
            onDelete();
        };
    }, [value]);

    return value ?
     <Thumb onDelete={onDelete} file={value} name={name} /> 
    : <div>
        {errorAlert ? uploadFileAlert({onClose: () => setAlert(false)}) : ''}
        <input
            onChange={(event) => {
                setImage(event.currentTarget.files[0]);
            }} 
            accept="image/*" 
            className="file-upload" 
            type="file"
            id={id}
        />
        <label htmlFor={id} className="upload-button">
            <IconButton aria-label="upload picture" component="span">
                <FontAwesomeIcon icon={ faPlus } />
            </IconButton>
            {label}
        </label>
    </div>
}

FileUpload.propTypes = {
};

export default FileUpload;