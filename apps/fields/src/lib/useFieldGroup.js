import { useState, useEffect, useContext } from "react";
import { DomainContext } from '../contexts';

export function useFieldGroup( id, post_id ) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [fieldGroup, setFieldGroup] = useState(null);
    const domain = useContext(DomainContext);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${domain.api}/zero/v1/field-group/${id}?post_id=${post_id}`
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
        `${domain.api}/zero/v1/field-group/${id}`,
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
