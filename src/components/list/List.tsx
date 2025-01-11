import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function BoxList({ ...props }) {
  const listData = props.listData;
  return (
    <div className="container mx-auto my-20 px-10 lg:px-40">
      <Box
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          border: '1px solid #ddd',
          borderRadius: 2,
        }}
      >
        <List
          component="nav"
          aria-label="secondary mailbox folder"
          sx={{ m: 0, p: 0 }}
        >
          {listData.map((item: any) => (
            <ListItemButton
              key={item.slug}
              component="a"
              href={item.slug}
              sx={{ borderBottom: '1px solid #ddd' }}
            >
              <ListItemText primary={item.headline} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </div>
  );
}
