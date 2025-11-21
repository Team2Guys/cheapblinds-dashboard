export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;

  if (typeof error === "object" && error !== null) {
    if ("response" in error) {
      const maybeResponse = error.response;
      if (typeof maybeResponse === "object" && maybeResponse !== null && "data" in maybeResponse) {
        const maybeData = maybeResponse.data;
        if (typeof maybeData === "object" && maybeData !== null && "message" in maybeData) {
          const maybeMessage = maybeData.message;
          if (typeof maybeMessage === "string") {
            return maybeMessage;
          }
        }
      }
    }
  }

  return "Unknown error";
};
