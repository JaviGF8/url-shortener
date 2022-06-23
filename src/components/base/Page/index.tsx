import classNames from 'classnames';
import { FC } from 'react';

import { PageProps } from './types.d';

import './index.scss';

const Page: FC<PageProps> = ({ className, children, fullpage, id }) => (
  <div className={classNames('custom-page', className, { fullpage })} id={id}>
    {children}
  </div>
);

export default Page;
