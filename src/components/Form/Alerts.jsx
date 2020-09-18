import * as React from 'react';
import { Alert } from '@material-ui/lab';

import labels from '../../assets/labels';
import './Alert.scss';

export const createAlertError = ({ onClose }) => <Alert className="custom-alert" severity="error" color="error" onClose={ onClose }>{ labels.createError }</Alert>;
export const createAlertSuccess = ({ onClose, label }) => <Alert className="custom-alert" severity="success" onClose={ onClose }>{ label || labels.createSuccess }</Alert>;

export const updateAlertError = ({ onClose }) => <Alert className="custom-alert" severity="error" color="error" onClose={ onClose }>{ labels.updateError }</Alert>;
export const updateAlertSuccess = ({ onClose }) => <Alert className="custom-alert" severity="success" onClose={ onClose }>{ labels.updateSuccess }</Alert>;

export const deleteAlertError = ({ onClose }) => <Alert className="custom-alert" severity="error" color="error" onClose={ onClose }>{ labels.deleteError }</Alert>;
export const deleteAlertSuccess = ({ onClose }) => <Alert sclassName="custom-alert" everity="success" onClose={ onClose }>{ labels.deleteSuccess }</Alert>;

export const uploadFileAlert = ({ onClose }) => <Alert sclassName="custom-alert" color="error" everity="error" onClose={ onClose }>{ labels.fileError }</Alert>;