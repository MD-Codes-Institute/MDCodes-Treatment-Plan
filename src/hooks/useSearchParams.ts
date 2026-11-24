import { useMemo, useCallback } from "react";
import { useLocation, useHistory } from "react-router";

export type Params = {
  patientId: string;
  idPlan: string;
}

export const useSearchParams = () => {
  const history = useHistory()
  const location = useLocation()

  const queryParams: URLSearchParams = useMemo(() => {
    return new URLSearchParams(location.search)
  }, [location.search])

  const setSearchParams = useCallback((params: Params) => {
    const search = new URLSearchParams(location.search);
    Object.entries(params).forEach(([key, value]) => {
      search.append(key, value)
    })
    history.replace(`edit-plan?${search.toString()}`)
  }, [history, location.search])

  return { queryParams, setSearchParams }
}
