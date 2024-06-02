import { useCallback, useEffect, useState } from "react";
import { AxiosResponse } from "axios";

const useFetch = <T,>(
  fetchFunction: () => Promise<AxiosResponse<T>>,
  existingData: T | null
) => {
  const [data, setData] = useState<T | null>(existingData);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    if (
      (Array.isArray(existingData) && existingData.length > 0) ||
      (!Array.isArray(existingData) && existingData)
    ) {
      return;
    } else {
      try {
        const response = await fetchFunction();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const invalidate = () => {
    fetchData();
  };

  return {
    isLoading,
    data,
    error,
    invalidate,
  };
};

export default useFetch;
