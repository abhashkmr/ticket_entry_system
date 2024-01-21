import Router from "@koa/router";
import {
  SupportAgent,
  SupportTicket,
  SupportAgentAssignment,
  SupportAgentAssigned,
} from "../models/supportAgentModel.js";

const router = new Router({ prefix: "/api" });

router.post("/support-agent", async (ctx) => {
  try {
    const { name, email, phone, description, active } = ctx.request.body;

    const dateCreated = new Date();

    const newSupportAgent = await SupportAgent.create({
      name,
      email,
      phone,
      description,
      active,
      dateCreated,
    });

    await SupportAgentAssignment.create({
      supportAgentId: newSupportAgent._id,
      status: "free",
    });

    ctx.status = 201;
    ctx.body = newSupportAgent;
  } catch (error) {
    ctx.body = error;
  }
});

router.get("/support-agent/:id", async (ctx) => {
  const supportAgentId = ctx.params.id;

  try {
    const supportAgent = await SupportAgent.findById(supportAgentId);

    if (!supportAgent) {
      return ctx.status(404).json({ error: "Support agent not found" });
    }

    ctx.status = 200;
    ctx.body = supportAgent;
  } catch (error) {
    console.error("Error fetching support agent:", error);
    ctx.status(500).json({ error: "Internal server error" });
  }
});

function convertToISODate(selectedDate) {
  const dateObject = new Date(selectedDate);

  const isoDateString = dateObject.toISOString();

  return isoDateString;
}

router.post("/support-ticket", async (ctx) => {
  try {
    const {
      topic,
      description,
      severity,
      type,
      status = "New",
      dateCreated,
    } = ctx.request.body;

    const dateCreatedISO = convertToISODate(dateCreated);

    const newSupportTicket = await SupportTicket.create({
      topic,
      description,
      severity,
      type,
      status,
      resolvedOn: "",
      dateCreated: dateCreatedISO,
    });
    ctx.status = 201;
    ctx.body = newSupportTicket;
  } catch (error) {
    ctx.body = error;
  }
});

router.get("/assign-agent", async (ctx) => {
  try {
    const freeAgentAssignment = await SupportAgentAssignment.findOne({
      status: "free",
    }).sort({ dateCreated: 1 });

    if (freeAgentAssignment) {
      ctx.body = { supportAgentId: freeAgentAssignment.supportAgentId };
    } else {
      ctx.status = 404;
      ctx.body = { error: "No free support agents available" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

router.put("/support-ticket/:id", async (ctx) => {
  try {
    const { assignedTo, resolvedOn = "" } = ctx.request.body;

    const ticketId = ctx.params.id;

    if (assignedTo) {
      const result = await SupportTicket.findByIdAndUpdate(ticketId, {
        assignedTo,
        status: "Assigned",
      });

      await SupportAgentAssigned.create({
        supportAgentId: assignedTo,
        status: "assigned",
      });

      await SupportAgentAssignment.findOneAndDelete({
        supportAgentId: assignedTo,
      });

      if (result) {
        ctx.status = 200;
        ctx.body = { message: `Ticket ${ticketId} updated successfully.` };
      } else {
        ctx.status = 404;
        ctx.body = { error: `Ticket ${ticketId} not found.` };
      }
    } else {
      ctx.status = 400;
      ctx.body = { error: "AssignedTo field is required." };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }
});

router.get("/support-ticket", async (ctx) => {
  try {
    const {
      status,
      assignedTo,
      severity,
      type,
      sortBy,
      sortOrder,
      page,
      pageSize,
    } = ctx.query;

    const filter = {};
    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (severity) filter.severity = severity;
    if (type) filter.type = type;

    const sort = {};
    if (sortBy) sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    const tickets = await SupportTicket.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    ctx.status = 200;
    ctx.body = { tickets };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }
});

export default router.routes();
