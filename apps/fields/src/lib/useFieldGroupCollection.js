import { useState, useEffect } from "react";

export function useFieldGroupCollection() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [fieldGroups, setFieldGroups] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://zero1.local/wp-json/zero/v1/field-group'
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
