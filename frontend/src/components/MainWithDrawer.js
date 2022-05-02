import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Main from './Main'
import SearchErrorButton from './SearchErrorButton'
import UploadCodeImage from './UploadCodeImage'

const drawerWidth = 240;

export default function MainWithDrawer(props) {
  const { window, setLanguage, language, error, setCode } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const listItems = [
    { title: "C", value: "c" },
    { title: "C++", value: "cpp" },
    { title: "Golang", value: "golang" },
    { title: "Java", value: "java" },
    { title: "Javascript", value: "javascript" },
    { title: "Python 2", value: "python2" },
    { title: "Python 3", value: "python3" },
    { title: "Typescript", value: "typescript" },
  ]

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {
          listItems.map((item, index) => (
            <ListItemButton
              key={index}
              onClick={() => setLanguage(item.value)}
              selected={language === item.value}
              sx={{
                borderEndEndRadius: 10,
                borderStartEndRadius: 10,
                '&.Mui-selected': {
                  backgroundColor: '#66b2ff'
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#66b2ff'
                }
              }}>
              {/* <ListItemIcon> */}
              {/*   <InboxIcon /> */}
              {/* </ListItemIcon> */}
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))
        }
      </List>
      <Divider />
      <List>
        {/* <ListItemButton > */}
        {/*   <ListItemIcon> */}
        {/*     <UploadFileRounded /> */}
        {/*   </ListItemIcon> */}
        {/*   <ListItemText primary={"Upload Code Image"} /> */}
        {/* </ListItemButton> */}
        <UploadCodeImage setCode={setCode} />
      </List>
      <Divider />
      <List
        sx={{ display: error && error.length !== 0 ? 'block' : 'none' }}
      >
        <SearchErrorButton error={error} />
      </List>

    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            DotSlash
          </Typography>
          {/* <Box sx={{ flexGrow: 1 }} /> */}
          {/* <Box border={"1px grey"}> */}
          {/*   <Typography> */}
          {/*     Search Error on */}
          {/*   </Typography> */}
          {/* </Box> */}
        </Toolbar>
      </AppBar>
      <Box
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="div"
        display={"flex"}
        sx={{ flexGrow: 1, p: 0, pt: 10, width: { md: `calc(100% - ${drawerWidth}px)` }, height: "100vh", alignItems: 'stretch' }}
      >
        <Toolbar />
        <Main {...props} />
      </Box>
    </Box>
  );
}

