// Payloads
export type WithToken<Payload = {}> = Payload & {
  token: string;
};

// Errors
