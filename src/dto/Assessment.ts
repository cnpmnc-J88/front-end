interface DetailAssessmentByCriteria {
  id: string,
  criteria: string,
  details: string,
}
interface Assessment {
  id: string,
  shortAssessment: string,
  point: number,
  detailAssessment: DetailAssessmentByCriteria[],
}
interface AssessmentForm {
  id: string,
  formName: string,
  criterias: Array<{
    id: string;
    label_name: string;
  }>;
}
