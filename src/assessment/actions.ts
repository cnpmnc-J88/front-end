"use server";
export async function submitAnswers(formData: FormData) {
  // Process form data
  console.log(Object.fromEntries(formData));
  // Save to database, etc.
}
