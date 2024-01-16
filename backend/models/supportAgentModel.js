import mongoose from "mongoose";

const supportAgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});


const supportTicketSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  severity: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'SupportAgent',
    required: true
  },
  status: {
    type: String,
    enum: ['New', 'Assigned', 'Resolved'],
    default: 'New'
  },
  resolvedOn: {
    type: Date
  }
});

export const SupportAgent = mongoose.model('SupportAgent', supportAgentSchema);

export const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);





