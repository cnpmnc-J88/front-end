"use server";

export async function submitAnswers(formData: FormData) {
  try {
    // Extract the basic fields
    const id = formData.get("id") as string;
    const shortAssessment = formData.get("shortAssessment") as string;
    const point = parseFloat(formData.get("point") as string);

    // Parse the detailAssessment JSON string
    const detailAssessmentStr = formData.get("detailAssessment") as string;
    const detailAssessment = JSON.parse(detailAssessmentStr) as DetailAssessmentByCriteria[];

    // Construct the complete assessment object
    const assessment: Assessment = {
      id,
      shortAssessment,
      point,
      detailAssessment
    };

    console.log("Processed assessment:", assessment);

    // TODO Here you would typically save to a database
    // For example: await db.assessments.create({ data: assessment });

    // Return success
    return { success: true, data: assessment };
  } catch (error) {
    console.error("Error processing assessment:", error);
    return { success: false, error: "Failed to process assessment" };
  }
}
