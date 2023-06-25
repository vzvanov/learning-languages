export const getAllLanguages = async () => {
  const response = await fetch("/api/languages");
  if (response.ok) return response.json();

  throw new Error("Unable to fetch languages.");

};
