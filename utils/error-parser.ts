export default function errorParser(error: any) {
  return {
    status: error.status || 500,
    message: error.message,
    errors: error.data,
  };
}
