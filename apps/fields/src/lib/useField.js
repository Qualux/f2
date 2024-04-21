import { useState, useEffect, useContext } from "react";
import { DomainContext } from '../contexts';

export function useField(id) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [field, setField] = useState(null);
  const domain = useContext(DomainContext);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${domain.api}/zero/v1/field/${id}`
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
          `${domain.api}/zero/v1/field/${id}`,
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
