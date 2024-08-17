import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { db } from "../../../firebase/sync";
import { collection, addDoc } from "firebase/firestore";
import LinearLoader from "../loader/linear";
import Alert from "@mui/material/Alert";

interface SpaceFormProps {
  onSubmit?: (formData: { [key: string]: string }) => void;
}

const CustomTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: "#212A31",
    backgroundColor: "none",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#748D92",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#748D92",
    },
    "&:hover fieldset": {
      borderColor: "#124E66",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#212A31",
    },
  },
  "& .MuiOutlinedInput-root input": {
    backgroundColor: "transparent",
  },
});

const SpaceFormWidget: React.FC<SpaceFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState<{ [key: string]: any }>({
    room: "",
    space: "",
    floor: "",
    dimension: "",
    assets: 0,
    condition: "Good",
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [alert, setAlert] = React.useState<{
    message: string;
    severity: "success" | "error" | "info" | "warning";
  } | null>(null);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | { name?: string; value: unknown }
    >
  ) => {
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
    if (!formData.room) newErrors.room = "Room is required";
    if (!formData.floor) newErrors.floor = "Floor is required";
    

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setAlert({ message: "Fill out required fields", severity: "info" });
      return;
    }

    setIsLoading(true);
    try {
      const docRef = await addDoc(collection(db, "Space Layouts"), formData);
      console.log("Document written with ID: ", docRef.id);
      setAlert({
        message: "Space layout has successfully been added",
        severity: "success",
      });
      setFormData({
        room: "",
        space: "",
        floor: "",
        dimension: "",
        assets: 0,
        condition: "Good",
      });
      setErrors({});
    } catch (error) {
      console.error("Error adding document: ", error);
      setAlert({ message: `Error adding document`, severity: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, p: 2, width: "100%" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {isLoading && (
        <Box sx={{ width: "100%", mb: 2 }}>
          <LinearLoader />
        </Box>
      )}

      {alert && (
        <Alert severity={alert.severity} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <CustomTextField
          id="room"
          label="Room"
          variant="outlined"
          value={formData.room}
          onChange={handleChange}
          required
          error={!!errors.room}
          helperText={errors.room}
        />
        <CustomTextField
          id="space"
          label="Space"
          variant="outlined"
          value={formData.space}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <CustomTextField
          id="floor"
          label="Floor"
          variant="outlined"
          value={formData.floor}
          onChange={handleChange}
          required
          error={!!errors.floor}
          helperText={errors.floor}
        />
        <CustomTextField
          id="dimension"
          label="Dimension"
          variant="outlined"
          value={formData.dimension}
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
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

export default SpaceFormWidget;
