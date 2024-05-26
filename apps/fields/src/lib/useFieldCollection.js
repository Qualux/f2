import { useState, useEffect } from "react";

export function useFieldCollection() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [fields, setFields] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${window.wpApiSettings.root}/f3/v1/field`
        );
        const data = await response.json();
        setFields(data.records);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, []);

  return { fields, isLoaded };

}
