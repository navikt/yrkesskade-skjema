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

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const handleUnload = (e: any) => {
    const message = "o/";
    (e || window.event).returnValue = message; //Gecko + IE
    return message;
  };
};
