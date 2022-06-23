import { Menu } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import config from 'config';
import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { MenuItem } from './index.d';
import './index.scss';

const items: MenuItem[] = [
  { text: 'Url shortener', url: config.url.landing },
  { text: 'Stats', url: config.url.stats },
];

const Navbar: FC = () => {
  const [opened, setOpened] = useState(false);
  const location = useLocation();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpened(open);
  };
  return (
    <nav>
      <Button variant="contained" disableElevation onClick={toggleDrawer(true)}>
        <Menu />
      </Button>
      <Drawer anchor="left" className="navbar" open={opened} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {items.map((item) => (
              <Link key={item.text} to={item.url}>
                <ListItem disablePadding>
                  <ListItemButton selected={item.url === location.pathname}>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
