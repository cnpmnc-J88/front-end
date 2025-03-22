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
  criterias: string[],
}
