// backend/routes/api.js
import Router from "@koa/router";
import { SupportAgent, SupportTicket } from "../models/supportAgentModel.js";

const router = new Router({ prefix: "/api" });

router.post("/support-agent", async (ctx) => {
  try {
    const { name, email, phone, description, active } = ctx.request.body;

    // Add dateCreated from the code
    const dateCreated = new Date();

    // Create a new support agent with individual fields
    const newSupportAgent = await SupportAgent.create({
      name,
      email,
      phone,
      description,
      active,
      dateCreated,
    });
    ctx.status = 201;
    ctx.body = newSupportAgent;
  } catch (error) {
    ctx.body = error;
  }
});

router.post("/support-ticket", async (ctx) => {
  try {
    const { topic, description, severity, type, assignedTo, status = "New" } =
      ctx.request.body;

    // Add dateCreated from the code
    const dateCreated = new Date();

    // Create a new support agent with individual fields
    const newSupportTicket = await SupportTicket.create({
      topic,
      description,
      severity,
      type,
      assignedTo,
      status,
      resolvedOn:'',
      dateCreated
    });
    ctx.status = 201;
    ctx.body = newSupportTicket;
  } catch (error) {
    ctx.body = error;
  }
});

export default router.routes();
