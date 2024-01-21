import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const API_URL = process.env.REACT_APP_API_URL;

console.log(API_URL, "logging api url");

const ViewTicket = () => {
  const [ticketsData, setTicketsData] = useState(null);

  const [assignAgent, setAssignedAgent] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/support-ticket`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status !== 200) {
        setError(res.error);
      }

      const tickets = await res.json();

      const updatedTicketsData = await Promise.all(
        tickets.tickets.map(async (ticket) => {
          if (ticket.assignedTo) {
            const agentRes = await fetch(
              `${API_URL}/api/support-agent/${ticket.assignedTo}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            // if (!agentRes.ok) {
            //   throw new Error(`HTTP error! Status: ${agentRes.status}`);
            // }

            const agentData = await agentRes.json();

            const agentName = agentData.name; // Adjust this based on your actual API response structure

            return {
              ...ticket,
              assignedTo: agentName,
            };
          } else return ticket;
        })
      );
      setTicketsData(updatedTicketsData);
    };

    fetchData();
  }, [assignAgent]);

  const handleAssignAgent = async (ticketId) => {
    try {
      // Call the API to get an available agent ID
      const assignAgentRes = await fetch(`${API_URL}/api/assign-agent`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (assignAgentRes.status === 404) {
        setError("No agents available");
      }

      const assignAgentData = await assignAgentRes.json();
      const agentId = assignAgentData.supportAgentId;

      // setAssignedAgent(agentId);

      // If an agent is available, update the ticket's assignedTo field
      if (agentId) {
        const ticketIdToUpdate = ticketId; // Replace with the actual ticket ID
        await fetch(`${API_URL}/api/support-ticket/${ticketIdToUpdate}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ assignedTo: agentId }),
        });

        // if (!updateTicketRes.ok) {
        //   throw new Error(`Error updating ticket! Status: ${updateTicketRes.status}`);
        // }

        setAssignedAgent(agentId);

        console.log(
          `Ticket updated successfully. Assigned to agent ID: ${agentId}`
        );
      } else {
        console.log("No available agent.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error if necessary
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Tickets
      </Typography>
      {ticketsData !== null &&
        ticketsData.map((ticket) => (
          <Paper
            key={ticket._id}
            elevation={3}
            style={{ padding: "20px", marginBottom: "20px" }}
          >
            <Typography variant="h6" gutterBottom>
              Ticket #{ticket._id}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  <strong>Topic:</strong> {ticket.topic}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  <strong>Date Created:</strong>{" "}
                  {new Date(ticket.dateCreated).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  <strong>Severity:</strong> {ticket.severity}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  <strong>Type:</strong> {ticket.type}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  <strong>Assigned To:</strong> {ticket.assignedTo}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">
                  <strong>Status:</strong> {ticket.status}
                </Typography>
              </Grid>
              {ticket.status === "Resolved" && (
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    <strong>Resolved On:</strong> {ticket.resolvedOn}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Description:</strong> {ticket.description}
                </Typography>
              </Grid>

              {!ticket.assignedTo && (
                <Grid item xs={12}>
                  <Button
                    onClick={() => {
                      handleAssignAgent(ticket._id);
                    }}
                    variant="contained"
                    color="success"
                    style={{ marginTop: "20px" }}
                  >
                    Assign to agent
                  </Button>
                </Grid>
              )}
            </Grid>
          </Paper>
        ))}
      <Typography variant="h4" component="h2" gutterBottom>
        {error}
      </Typography>
    </Container>
  );
};

export default ViewTicket;
