import React, { memo } from "react";
import { FC } from "react";
import { ListView } from "../modules/TicketManagement/ListView.module";
import { AddTicket } from "modules/TicketManagement/AddTicket.module";
import { AppBar, Box, Button, CssBaseline, Toolbar, Typography } from "@mui/material";

const TicketManagementPage: FC = () => {
  const [needReloadList, setNeedReloadList] = React.useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 0, mr: 5, display: { xs: 'none', sm: 'block' } }}
          >
            Ticket Management
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button href="/" sx={{ color: '#fff' }}> Todo List </Button>
            <AddTicket onSubmited={() => setNeedReloadList(true)}/>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <ListView isReloadList={needReloadList}/>
      </Box>
    </Box>
  )
};

export default memo(TicketManagementPage);