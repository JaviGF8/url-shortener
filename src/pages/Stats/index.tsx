import { Delete, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import config from 'config';
import { FC, Fragment, useEffect, useState } from 'react';

import { formatDate } from 'utils/dateManager';

import LinkModel from 'model/types/Link';

import Page from 'components/base/Page';

import './index.scss';

const StatsPage: FC = () => {
  const [links, setLinks] = useState<LinkModel[]>([]);
  const [open, setOpen] = useState<LinkModel>();

  const clickLink = (link: LinkModel) => {
    config.database.addCount(link.id);
    setLinks(config.database.getAllLinks());
  };

  const deleteLink = (link: LinkModel) => {
    config.database.removeLink(link.id);
    setLinks(config.database.getAllLinks());
  };

  const onOpen = (link: LinkModel) => {
    if (open?.id === link.id) {
      setOpen(undefined);
    } else {
      setOpen(link);
    }
  };

  useEffect(() => {
    setLinks(config.database.getAllLinks());
  }, []);

  return (
    <Page className="stats">
      <h2>Stats</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Link</TableCell>
            <TableCell>Short url</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.map((link) => (
            <Fragment key={link.id}>
              <TableRow>
                <TableCell>
                  <IconButton size="small" onClick={() => onOpen(link)}>
                    {open?.id === link.id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {link.link}
                </TableCell>
                <TableCell>
                  <Link href={link.short} onClick={() => clickLink(link)} target="_blank">
                    {link.short}
                  </Link>
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => deleteLink(link)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                  <Collapse in={!!open && open.id === link.id} timeout="auto" unmountOnExit>
                    <Box className="collapsed" sx={{ margin: 1 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Count</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {link?.clicks?.length > 0 &&
                            link.clicks.map((clicks) => (
                              <TableRow key={clicks.date.toString()}>
                                <TableCell component="th" scope="row">
                                  {formatDate(new Date(clicks.date))}
                                </TableCell>
                                <TableCell>{clicks.count}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </Page>
  );
};

export default StatsPage;
