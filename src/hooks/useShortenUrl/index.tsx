import axios from 'axios';
import config from 'config';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { validateUrl } from 'utils/validator';

import Link from 'model/types/Link';

import { UseShortenUrlProps } from './types.d';

const useShortenUrl = (url?: string): UseShortenUrlProps => {
  const [data, setData] = useState<Link>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  const call = async () => {
    if (url && validateUrl(url)) {
      setLoading(true);
      setData(undefined);
      setError(undefined);
      try {
        const res = await axios(`https://api.shrtco.de/v2/shorten?url=${url}`);
        if (res.data?.ok && res.data.result) {
          const link = {
            id: uuidv4(),
            link: url,
            short: res.data.result.full_short_link,
            clicks: [
              {
                count: 0,
                date: new Date(),
              },
            ],
          };
          setData(link);
          config.database.addLink(link);
        } else {
          throw new Error('Error while transforming url');
        }
      } catch (err: unknown) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    } else {
      setError(new Error('Wrong url'));
    }
  };

  useEffect(() => {
    call();
  }, [url]);

  return { data, error, loading };
};

export default useShortenUrl;
