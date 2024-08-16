import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

interface AssetFormProps {
  onSubmit?: (formData: { [key: string]: string }) => void;
}

// Custom styled TextField
const CustomTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    color: '#212A31',
    backgroundColor: 'none', 
    
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#748D92', 
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#748D92',
    },
    '&:hover fieldset': {
      borderColor: '#124E66',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#212A31',
    },
  },
  '& .MuiOutlinedInput-root input': {
    backgroundColor: 'transparent',
  },
});

const AssetFormWidget: React.FC<AssetFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState<{ [key: string]: string }>({
    itemName: '',
    brandName: '',
    location: '',
    modelNo: '',
    serialNo: '',
    tagName: '',
    condition: 'Good',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { id, name, value } = event.target as HTMLInputElement;
    const key = name || id;
    setFormData((prevData) => ({
      ...prevData,
      [key]: value as string,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, p: 2, width: '100%' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <CustomTextField
          id="itemName"
          label="Item Name"
          variant="outlined"
          value={formData.itemName}
          onChange={handleChange}
        />
        <CustomTextField
          id="brandName"
          label="Brand Name"
          variant="outlined"
          value={formData.brandName}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <CustomTextField
          id="location"
          label="Location"
          variant="outlined"
          value={formData.location}
          onChange={handleChange}
        />
        <CustomTextField
          id="modelNo"
          label="Model No."
          variant="outlined"
          value={formData.modelNo}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <CustomTextField
          id="serialNo"
          label="Serial No."
          variant="outlined"
          value={formData.serialNo}
          onChange={handleChange}
        />
        <CustomTextField
          id="tagName"
          label="Tag Name"
          variant="outlined"
          value={formData.tagName}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ display: 'block', justifyContent: 'space-between', gap: 2 }}>
        <CustomTextField
          id="condition"
          name="condition"
          label="Condition"
          variant="outlined"
          select
          value={formData.condition}
          onChange={handleChange}
        >
          <MenuItem value="Good">Good</MenuItem>
          <MenuItem value="Repair">Repair</MenuItem>
          <MenuItem value="Bad">Bad</MenuItem>
        </CustomTextField>
      </Box>
      <Box sx={{ m: 1 }}>
        <button type="submit">Submit</button>
      </Box>
    </Box>
  );
};

export default AssetFormWidget;
