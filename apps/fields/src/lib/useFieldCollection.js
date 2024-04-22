import { useState, useEffect, useContext } from "react";
import { DomainContext } from '../contexts';

export function useFieldCollection() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [fields, setFields] = useState(null);
  const domain = useContext(DomainContext);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${domain.api}/zero/v1/field`
        );
        const data = await response.json();
        setFields(data.fields);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, []);

  return { fields, isLoaded };

}
