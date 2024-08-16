import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AssetFormWidget from '../form/assetform';

const modalStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  backgroundColor: '#d6d9d4',
  borderRadius: '5px',
  boxShadow: '24px 24px 48px rgba(0, 0, 0, 0.1)',
  padding: '16px',
};

interface ModalWidgetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const ModalWidget: React.FC<ModalWidgetProps> = ({ open, onClose, title, description }) => {
  function handleFormSubmit(formData: { [key: string]: string; }): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <AssetFormWidget onSubmit={handleFormSubmit} />
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default ModalWidget;
