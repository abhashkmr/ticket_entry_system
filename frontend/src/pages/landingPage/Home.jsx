import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Typography, Grid, Paper } from "@mui/material";

export const Home = () => (
  <Container>
    <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Support Portal
      </Typography>
      <Typography variant="body1" paragraph>
        Streamline your support operations with our Support Portal. Quickly
        create support agents, submit tickets, and view the status of all
        tickets in one place.
      </Typography>
    </Paper>

    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} style={{ padding: "20px", height: "100%" }}>
          <Typography variant="h5" gutterBottom>
            Create Support Agent
          </Typography>
          <Typography variant="body2" paragraph>
            Need a new support agent? Click below to create one.
          </Typography>
          <Link to="/create-agent">
            <Button variant="contained" color="primary">
              Create Support Agent
            </Button>
          </Link>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} style={{ padding: "20px", height: "100%" }}>
          <Typography variant="h5" gutterBottom>
            Create Support Ticket
          </Typography>
          <Typography variant="body2" paragraph>
            Got an issue? Submit a support ticket and get assistance.
          </Typography>
          <Link to="/create-ticket">
            <Button variant="contained" color="primary">
              Create Support Ticket
            </Button>
          </Link>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} style={{ padding: "20px", height: "100%" }}>
          <Typography variant="h5" gutterBottom>
            View All Tickets
          </Typography>
          <Typography variant="body2" paragraph>
            Check the status of all submitted tickets.
          </Typography>
          <Link to="/tickets">
            <Button variant="contained" color="primary">
              View All Tickets
            </Button>
          </Link>
        </Paper>
      </Grid>
    </Grid>
  </Container>
);
