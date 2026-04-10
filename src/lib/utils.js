export const formatValue = (value) => Math.round(value);

export const cn = (...inputs) => inputs.filter(Boolean).join(" ");

export const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
