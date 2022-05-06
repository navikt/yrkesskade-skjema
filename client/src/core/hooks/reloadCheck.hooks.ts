import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { selectOrganisasjon } from "../reducers/app.reducer";
import { useAppSelector } from "./state.hooks";


export const useCheckIfReloaded = () => {
  const valgtOrganisasjon =  useAppSelector((state) => selectOrganisasjon(state));
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {

    if (valgtOrganisasjon) {
      return;
    }

    navigate('/yrkesskade/skjema')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
};
