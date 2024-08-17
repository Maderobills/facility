import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AssetFormWidget from '../form/assetform';
import SpaceFormWidget from '../form/spaceform';

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
  function handleFormSubmit(formData: { [key: string]: string }): void {
    // Implement form submission logic
    console.log('Form data:', formData);
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
        
        {/* Conditional Rendering Based on Title */}
        {title === "Add Assets" ? (
          <AssetFormWidget onSubmit={handleFormSubmit} />
        ) : title === "Add Space Layout" ? (
          <SpaceFormWidget onSubmit={handleFormSubmit} />
        ) : (
          <Typography sx={{ mt: 2 }}>No form available for this title.</Typography>
        )}
        
        <Button sx={{ mt: 2 }} onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default ModalWidget;
