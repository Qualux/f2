import { useState, useEffect } from "react";

export function useFieldGroup(id) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [fieldGroup, setFieldGroup] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://zero1.local/wp-json/zero/v1/field-group/${id}`
        );
        const data = await response.json();
        setFieldGroup(data.field_group);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, [id]);

  const deleteFieldGroup = async () => {
    try {
      const response = await fetch(
        `http://zero1.local/wp-json/zero/v1/field/${id}`,
        {
          method: 'DELETE'
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error deleting field group:", error);
    }
  }

  return { fieldGroup, isLoaded, deleteFieldGroup };

}
