import { useState, useEffect, useContext } from "react";
import { DomainContext } from '../contexts';

export function useFieldGroupCollection() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [fieldGroups, setFieldGroups] = useState(null);
  const domain = useContext(DomainContext);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${domain.api}/f3/v1/field-group`
        );
        const data = await response.json();
        setFieldGroups(data.field_groups);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, []);

  return { fieldGroups, isLoaded };

}
