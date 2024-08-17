import React from 'react';
import Box from '@mui/material/Box';
import TextField from'@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { styled } from'@mui/material/styles';
import { db } from'../../../firebase/sync';
import { collection, addDoc } from'firebase/firestore';
import LinearLoader from '../loader/linear';
import Alert from '@mui/material/Alert';

interface AssetFormProps {
  onSubmit?: (formData: { [key: string]: string }) =>void;
}

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

  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [alert, setAlert] = React.useState<{ message: string; severity: 'success' | 'error' | 'info' | 'warning' } | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { id, name, value } = event.target as HTMLInputElement;
    const key = name || id;
    setFormData((prevData) => ({
      ...prevData,
      [key]: value as string,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.itemName) newErrors.itemName = 'Item Name is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.tagName) newErrors.tagName = 'Tag Name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setAlert({ message: 'Fill out required fields', severity: 'info' });
      return;
    }

    setIsLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'assets'), formData);
      console.log('Document written with ID: ', docRef.id);
      setAlert({ message: 'Asset item has successfully been added', severity: 'success' });
      setFormData({
        itemName: '',
        brandName: '',
        location: '',
        modelNo: '',
        serialNo: '',
        tagName: '',
        condition: 'Good',
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding document: ', error);
      setAlert({ message: `Error adding document`, severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" sx ={{
        '& > :not(style)': { m: 1, p: 2, width: '100%' },
      }}
      noValidate
      autoComplete="on"
      onSubmit={handleSubmit}
    >
      {isLoading && (
        <Box sx={{width: '100%', mb:2 }}><LinearLoader/></Box>
      )}
      
      {alert && (
        <Alert severity={alert.severity}sx={{mb:2 }}>
          {alert.message}
        </Alert>
      )}

      <Box sx={{display: 'flex', justifyContent: 'space-between', gap:2 }}>
        <CustomTextField
          id="itemName"
          label="Item Name"
          variant="outlined"
          value={formData.itemName}
          onChange={handleChange}
          required
          error={!!errors.itemName}
          helperText={errors.itemName}
        /><CustomTextField
          id="brandName"
          label="Brand Name"
          variant="outlined"
          value={formData.brandName}
          onChange={handleChange}
        /></Box><Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}><CustomTextField
          id="location"
          label="Location"
          variant="outlined"
          value={formData.location}
          onChange={handleChange}
          required
          error={!!errors.location}
          helperText={errors.location}
        /><CustomTextField
          id="modelNo"
          label="Model No."
          variant="outlined"
          value={formData.modelNo}
          onChange={handleChange}
        /></Box><Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}><CustomTextField
          id="serialNo"
          label="Serial No."
          variant="outlined"
          value={formData.serialNo}
          onChange={handleChange}
        /><CustomTextField
          id="tagName"
          label="Tag Name"
          variant="outlined"
          value={formData.tagName}
          onChange={handleChange}
          required
          error={!!errors.tagName}
          helperText={errors.tagName}
        /></Box><Box sx={{ display: 'block', justifyContent: 'space-between', gap: 2 }}><CustomTextField
          id="condition"
          name="condition"
          label="Condition"
          variant="outlined"
          select
          value={formData.condition}
          onChange={handleChange}
        ><MenuItem value="Good">Good</MenuItem><MenuItem value="Repair">Repair</MenuItem><MenuItem value="Bad">Bad</MenuItem></CustomTextField></Box><Box sx={{ m: 1 }}><button type="submit">Submit</button></Box></Box>
  );
};

export default AssetFormWidget;
