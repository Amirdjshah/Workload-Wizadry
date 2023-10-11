export function formatErrorMessage(error: any) {
  if (error && error.errors && error.errors.length > 0) {
    return error.errors[0];
  } else if (error && error.message) {
    return error.message;
  } else {
    return "Some Error occurred";
  }
}
