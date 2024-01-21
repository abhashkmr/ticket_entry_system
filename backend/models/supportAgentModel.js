import mongoose from "mongoose";

const supportAgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const supportTicketSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  severity: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  status: {
    type: String,
    enum: ["New", "Assigned", "Resolved"],
    default: "New",
  },
  resolvedOn: {
    type: Date,
  },
});

const supportAgentAssignmentSchema = new mongoose.Schema({
  supportAgentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ["free", "assigned"],
    default: "free",
  },
});

const supportAgentAssignedSchema = new mongoose.Schema({
  supportAgentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: ["free", "assigned"],
    default: "assigned",
  },
});

export const SupportAgent = mongoose.model("SupportAgent", supportAgentSchema);

export const SupportTicket = mongoose.model(
  "SupportTicket",
  supportTicketSchema
);
export const SupportAgentAssignment = mongoose.model(
  "SupportAgentAssignment",
  supportAgentAssignmentSchema
);

export const SupportAgentAssigned = mongoose.model(
  "SupportAgentAssigned",
  supportAgentAssignedSchema
);
