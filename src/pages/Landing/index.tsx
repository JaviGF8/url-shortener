import { ArrowRight } from '@mui/icons-material';
import { Alert, Link } from '@mui/material';
import config from 'config';
import { FC, useState } from 'react';

import Page from 'components/base/Page';

import Form from 'components/Form';

import useShortenUrl from 'hooks/useShortenUrl';

import './index.scss';

const LandingPage: FC = () => {
  const [url, setUrl] = useState<string>();
  const { data, error, loading } = useShortenUrl(url);

  const submit = (newUrl: string) => {
    setUrl(newUrl);
  };

  const clear = () => {
    setUrl(undefined);
  };

  return (
    <Page className="landing">
      <h1>Url Shortener</h1>
      <p>Enter a valid url and we will shorten it for you</p>
      <Form loading={loading} onClear={clear} onSubmit={submit} />
      {data && !loading && !error && (
        <Alert severity="success">
          {url} <ArrowRight />{' '}
          <Link href={data.short} onClick={() => config.database.addCount(data.id)} target="_blank">
            {data.short}
          </Link>
        </Alert>
      )}
      {!loading && error?.message && !data && url && (
        <Alert severity="error">{error.message}</Alert>
      )}
    </Page>
  );
};

export default LandingPage;
