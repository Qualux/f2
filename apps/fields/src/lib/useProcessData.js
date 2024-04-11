import { useState } from 'react';
import { useFetch } from '../../lib/useFetch';

export function useProcessData() {
  const [complete, setComplete] = useState(false);
  const [processResponse, setProcessResponse] = useState(null);
  const { postData } = useFetch();

  const process = (url, data) => {
    return postData(url, data).then((response) => {
      setComplete(true);
      setProcessResponse(response);
    });
  };

  const resetProcess = () => {
    setComplete(false);
    setProcessResponse(null);
  };

  return { process, complete, processResponse, resetProcess };
}
