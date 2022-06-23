import { Alert } from '@mui/material';
import { FC } from 'react';

import Page from 'components/base/Page';

const NotFoundPage: FC = () => (
  <Page>
    <Alert severity="info">Page not found</Alert>
  </Page>
);

export default NotFoundPage;
