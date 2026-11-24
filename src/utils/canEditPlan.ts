export const canEditPlan = (createdAt: number): boolean => {

  const dateNow: number = Date.now()

  return dateNow - createdAt <=  (24 * 60 * 60 * 1000 )    
}