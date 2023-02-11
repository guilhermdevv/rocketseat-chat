import { readableTimestamp } from "readable-timestamp-js";

export const translate = (timestamp) => readableTimestamp(timestamp, "h:m");
