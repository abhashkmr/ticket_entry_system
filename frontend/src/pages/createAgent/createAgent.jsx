import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const API_URL = process.env.REACT_APP_API_URL;

const CreateAgent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (phone) => {
    const mobileRegex = /^[0]?[789]\d{9}$/;
    return mobileRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(false);
    setError(false);

    if (validateForm()) {
      try {
        const response = await fetch(`${API_URL}/api/support-agent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 201) {
          setSuccess(true);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    if (!validateMobile(formData.phone)) {
      newErrors.phone = "Invalid mobile number";
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

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Create Support Agent
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={Boolean(errors.name)}
          helperText={errors.name || " "}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          label="Mobile Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={Boolean(errors.phone)}
          helperText={errors.phone}
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Submit
        </Button>
      </form>
      {success && (
        <Typography variant="h4" component="h2" gutterBottom>
          Agent created successfully
        </Typography>
      )}
      {error && (
        <Typography variant="h4" component="h2" gutterBottom>
          Something went wrong
        </Typography>
      )}
    </Container>
  );
};

export default CreateAgent;
