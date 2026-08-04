import axios from "axios";

interface ValidationError {
  path?: string;
  message?: string;
}

export const getErrorMessage = (e: unknown): string => {
  if (axios.isAxiosError(e)) {
    const data = e.response?.data;
    if (typeof data === "string") {
      return data.replace("Something went wrong. Error: ", "");
    }
    const errors = data?.error as ValidationError[] | undefined;
    if (Array.isArray(errors) && errors.length > 0) {
      return errors
        .map((err) =>
          [err.path, err.message].filter(Boolean).join(" ").trim(),
        )
        .join(", ");
    }
    if (typeof data?.error === "string") {
      return data.error;
    }
    return "Unrecognized axios error";
  }
  console.error("Unknown error", e);
  return "Unknown error";
};
