import { useState, useEffect } from "react";

export function useFieldCollection() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [fields, setFields] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://zero1.local/wp-json/zero/v1/field'
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
