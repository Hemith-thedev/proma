import { Schema, model } from "mongoose";

export const LogSchema = Schema(
  {
    heading: { type: String, trim: true },
    body: { type: String, trim: true },
    done_by: { type: [{ type: string }] },
    checked: { type: boolean, default: false },
    verified: { type: boolean, default: false },
    seen_by_admin: { type: boolean, default: false },
  },
  { timestamps: true },
);

export const Log = model("Log", LogSchema);
