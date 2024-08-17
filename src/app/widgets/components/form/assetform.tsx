import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { db } from "../../../firebase/sync";
import { collection, query, getDocs, addDoc, updateDoc, increment, doc, where } from "firebase/firestore";
import LinearLoader from "../loader/linear";
import Alert from "@mui/material/Alert";

interface AssetFormProps {
  onSubmit?: (formData: { [key: string]: any }) => void;
}

const CustomTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: "#212A31",
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
});

const AssetFormWidget: React.FC<AssetFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({
    item: "",
    brand: "",
    location: "",
    model: "",
    serial: "",
    tag: "",
    condition: "Good",
    assets: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [alert, setAlert] = useState<{
    message: string;
    severity: "success" | "error" | "info" | "warning";
  } | null>(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, "Space Layouts"));
        const querySnapshot = await getDocs(q);
        const fetchedSpaces: Set<string> = new Set();

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.space) {
            fetchedSpaces.add(data.space);
          }
        });

        setLocations(Array.from(fetchedSpaces));
      } catch (error) {
        console.error("Error fetching spaces: ", error);
        setAlert({ message: `Error fetching spaces`, severity: "error" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
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
    if (!formData.item) newErrors.item = "Item Name is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.tag) newErrors.tag = "Tag Name is required";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setAlert({ message: "Fill out required fields", severity: "info" });
      return;
    }
  
    setIsLoading(true);
    try {
      const docRef = await addDoc(collection(db, "Assets"), formData);
      console.log("Document written with ID: ", docRef.id);
  
      const q = query(collection(db, "Space Layouts"), where("space", "==", formData.location));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const spaceDoc = querySnapshot.docs[0];
        const spaceDocRef = doc(db, "Space Layouts", spaceDoc.id);
  
        await updateDoc(spaceDocRef, {
          assets: increment(1),
        });
  
        setAlert({
          message: "Asset item has successfully been added",
          severity: "success",
        });
  
        setFormData({
          item: "",
          brand: "",
          location: "",
          model: "",
          serial: "",
          tag: "",
          condition: "Good",
          assets: 0,
        });
  
        setErrors({});
      } else {
        console.error("No matching space document found");
        setAlert({ message: "No matching space document found", severity: "error" });
      }
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
          id="item"
          label="Item Name"
          variant="outlined"
          value={formData.item}
          onChange={handleChange}
          required
          error={!!errors.item}
          helperText={errors.item}
          sx={{ flex: 1 }}
        />
        <CustomTextField
          id="brand"
          label="Brand Name"
          variant="outlined"
          value={formData.brand}
          onChange={handleChange}
          sx={{ flex: 1 }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <CustomTextField
          id="location"
          name="location"
          label="Location"
          variant="outlined"
          value={formData.location}
          onChange={handleChange}
          required
          error={!!errors.location}
          helperText={errors.location}
          select
          sx={{ flex: 1 }}
        >
          {locations.map((loc) => (
            <MenuItem key={loc} value={loc}>
              {loc}
            </MenuItem>
          ))}
        </CustomTextField>

        <CustomTextField
          id="model"
          label="Model No."
          variant="outlined"
          value={formData.model}
          onChange={handleChange}
          sx={{ flex: 1 }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <CustomTextField
          id="serial"
          label="Serial No."
          variant="outlined"
          value={formData.serial}
          onChange={handleChange}
          sx={{ flex: 1 }}
        />
        <CustomTextField
          id="tag"
          label="Tag Name"
          variant="outlined"
          value={formData.tag}
          onChange={handleChange}
          required
          error={!!errors.tag}
          helperText={errors.tag}
          sx={{ flex: 1 }}
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
          sx={{ flex: 1 }}
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
