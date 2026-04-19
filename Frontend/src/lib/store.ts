import { create } from "zustand";
import { Complaint, Message, User, TicketStatus, Priority, Category } from "./types";
import { mockComplaints, mockMessages, mockUsers } from "./mock-data";

interface AppState {
  currentUser: User | null;
  complaints: Complaint[];
  messages: Message[];
  users: User[];

  login: (email: string, password: string) => boolean;
  /** Only succeeds for users with role `admin`. */
  loginAdmin: (email: string, password: string) => boolean;
  logout: () => void;
  registerUser: (name: string, email: string) => boolean;

  addComplaint: (data: {
    title: string;
    description: string;
    category: Category;
    isAnonymous: boolean;
    attachmentName?: string;
  }) => string;

  updateComplaintStatus: (id: string, status: TicketStatus) => void;
  updateComplaintPriority: (id: string, priority: Priority) => void;
  updateComplaintCategory: (id: string, category: Category) => void;
  addMessage: (complaintId: string, content: string) => void;
  getComplaintMessages: (complaintId: string) => Message[];
}

let ticketCounter = 6;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  complaints: mockComplaints,
  messages: mockMessages,
  users: mockUsers,

  login: (email, _password) => {
    const key = normalizeEmail(email);
    const user = get().users.find((u) => normalizeEmail(u.email) === key);
    if (user && user.role === "user") {
      set({ currentUser: user });
      return true;
    }
    return false;
  },

  loginAdmin: (email, _password) => {
    const key = normalizeEmail(email);
    const user = get().users.find((u) => normalizeEmail(u.email) === key);
    if (user && user.role === "admin") {
      set({ currentUser: user });
      return true;
    }
    return false;
  },

  logout: () => set({ currentUser: null }),

  registerUser: (name, email) => {
    const key = normalizeEmail(email);
    const exists = get().users.find((u) => normalizeEmail(u.email) === key);
    if (exists) return false;
    const newUser: User = { id: `u${Date.now()}`, name, email, role: "user" };
    set((s) => ({ users: [...s.users, newUser], currentUser: newUser }));
    return true;
  },

  addComplaint: (data) => {
    const user = get().currentUser;
    if (!user) return "";
    const ticketId = `GRV-2026-${String(ticketCounter++).padStart(4, "0")}`;
    const now = new Date().toISOString();
    const complaint: Complaint = {
      id: `c${Date.now()}`,
      ticketId,
      title: data.title,
      description: data.description,
      category: data.category,
      priority: "medium",
      status: "pending",
      userId: user.id,
      userName: data.isAnonymous ? "Anonymous" : user.name,
      isAnonymous: data.isAnonymous,
      attachmentName: data.attachmentName,
      createdAt: now,
      updatedAt: now,
    };
    set((s) => ({ complaints: [complaint, ...s.complaints] }));
    return ticketId;
  },

  updateComplaintStatus: (id, status) =>
    set((s) => ({
      complaints: s.complaints.map((c) =>
        c.id === id ? { ...c, status, updatedAt: new Date().toISOString() } : c
      ),
    })),

  updateComplaintPriority: (id, priority) =>
    set((s) => ({
      complaints: s.complaints.map((c) =>
        c.id === id ? { ...c, priority, updatedAt: new Date().toISOString() } : c
      ),
    })),

  updateComplaintCategory: (id, category) =>
    set((s) => ({
      complaints: s.complaints.map((c) =>
        c.id === id ? { ...c, category, updatedAt: new Date().toISOString() } : c
      ),
    })),

  addMessage: (complaintId, content) => {
    const user = get().currentUser;
    if (!user) return;
    const msg: Message = {
      id: `m${Date.now()}`,
      complaintId,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      content,
      createdAt: new Date().toISOString(),
    };
    set((s) => ({ messages: [...s.messages, msg] }));
  },

  getComplaintMessages: (complaintId) =>
    get().messages.filter((m) => m.complaintId === complaintId),
}));
