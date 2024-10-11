import { useEffect, useState } from 'react';
import { dequal as deepEqual } from 'dequal';

export const useCache = <T>(dep: T) => {
  const [cached, updateCache] = useState(dep);

  useEffect(() => {
    updateCache((cache) => {
      if (deepEqual(dep, cache)) {
        return cache;
      } else {
        return dep;
      }
    });
  }, [dep]);

  return cached;
};
