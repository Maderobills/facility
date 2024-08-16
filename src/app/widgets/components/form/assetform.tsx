import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface AssetFormProps {
  onSubmit?: (formData: { [key: string]: string }) => void;
}

const AssetFormWidget: React.FC<AssetFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState<{ [key: string]: string }>({
    itemName: '',
    brandName: '',
    location: '', // Update this to match the ID in the input
    modelNo: '',
    serialNo: '',
    tagName: '',
    condition: 'Good', // Set a default value for the dropdown
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { id, name, value } = event.target as HTMLInputElement;
    const key = name || id; // Use name for select elements, id for others
    setFormData((prevData) => ({
      ...prevData,
      [key]: value as string, // Ensure value is correctly set as a string
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
        <TextField
          id="itemName"
          label="Item Name"
          variant="outlined"
          value={formData.itemName}
          onChange={handleChange}
          sx={{ mx: 1 }} // Horizontal margin set here
        />
        <TextField
          id="brandName"
          label="Brand Name"
          variant="outlined"
          value={formData.brandName}
          onChange={handleChange}
          sx={{ mx: 1 }} // Horizontal margin set here
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <TextField
          id="location" // Update the ID here to match the state key
          label="Location"
          variant="outlined"
          value={formData.location} // Match this with the updated state key
          onChange={handleChange}
          sx={{ mx: 1 }}
        />
        <TextField
          id="modelNo"
          label="Model No."
          variant="outlined"
          value={formData.modelNo}
          onChange={handleChange}
          sx={{ mx: 1 }} 
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <TextField
          id="serialNo"
          label="Serial No."
          variant="outlined"
          value={formData.serialNo}
          onChange={handleChange}
          sx={{ mx: 1 }} // Horizontal margin set here
        />
        <TextField
          id="tagName"
          label="Tag Name"
          variant="outlined"
          value={formData.tagName}
          onChange={handleChange}
          sx={{ mx: 1 }} // Horizontal margin set here
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <TextField
          id="condition"
          name="condition" // Add the name attribute for the select field
          label="Condition"
          variant="outlined"
          select
          value={formData.condition}
          onChange={handleChange}
          sx={{ mx: 1 }}
        >
          <MenuItem value="Good">Good</MenuItem>
          <MenuItem value="Repair">Repair</MenuItem>
          <MenuItem value="Bad">Bad</MenuItem>
        </TextField>
      </Box>
      <Box sx={{ m: 1 }}>
        <button type="submit">Submit</button>
      </Box>
    </Box>
  );
};

export default AssetFormWidget;
