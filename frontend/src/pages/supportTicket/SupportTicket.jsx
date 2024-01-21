import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const SupportTicketForm = () => {
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    severity: "",
    type: "",
    assignedTo: "",
    dateCreated:""
  });

  const [errors, setErrors] = useState({
    topic: "",
    severity: "",
    type: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.topic.trim()) {
      newErrors.topic = "Topic is required";
      valid = false;
    }

    if (!formData.severity.trim()) {
      newErrors.severity = "Severity is required";
      valid = false;
    }

    if (!formData.type.trim()) {
      newErrors.type = "Type is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData)

    if (validateForm()) {
      const response = await fetch("http://localhost:8000/api/support-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(response)

      if(response.status===201){
        <div>Support Agent Created</div>
      }
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Create Support Ticket
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Topic"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={Boolean(errors.topic)}
          helperText={errors.topic || " "}
          required
        />
        <TextField
          id="date"
          name="dateCreated"
          label="Created On"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
          required
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Severity</InputLabel>
          <Select
            label="Severity"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            error={Boolean(errors.severity)}
          >
            <MenuItem value="" disabled>
              Select Severity
            </MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={Boolean(errors.type)}
          helperText={errors.type || " "}
          required
        />

        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />

        {/* <TextField
          label="Assigned To"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        /> */}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default SupportTicketForm;
