import { useState, useEffect } from "react";

export function useField(id) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [field, setField] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://zero1.local/wp-json/zero/v1/field/${id}`
        );
        const data = await response.json();
        setField(data.field);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, [id]);

  const deleteField = async () => {
    try {
      const response = await fetch(
        `http://zero1.local/wp-json/zero/v1/field/${id}`,
        {
          method: 'DELETE'
        }
      );
      const data = await response.json();
    } catch (error) {
      console.error("Error deleting field:", error);
    }
  }

  return { field, isLoaded, deleteField };

}
