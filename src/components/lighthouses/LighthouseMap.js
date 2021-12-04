import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Info from './Info';
import Pins from './Pins';
import React, { useState } from 'react';
import ReactMapGl from 'react-map-gl';
import styled from 'styled-components';
import { mapboxToken } from '../../pages/Lighthouses';
import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Container = styled.div`
    overflow: hidden;
    position: absolute;
    width: 100%;
`;

const LighthouseMap = (props) => {
    const { lighthouses } = props;

    const [popupInfo, setPopupInfo] = useState(null);
    const [viewport, setViewport] = useState({
        height: 'calc(100vh - 110px)',
        latitude: 44.912879,
        longitude: -84.7586996,
        width: 'fit',
        zoom: 6
    });
    const [state, setState] = React.useState({
        right: false
    });

    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 480,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536
            }
        }
    });
    const matches = useMediaQuery(theme.breakpoints.up('xs'));
    const drawerWidth = matches ? 525 : 300;
    const padding = matches ? 5 : 1;

    const useStyles = makeStyles({
        paper: {
            background: 'white',
            width: drawerWidth
        }
    });
    const classes = useStyles();

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && ((event).key === 'Tab' || (event).key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <Container>
            <ReactMapGl scrollZoom={false} mapboxApiAccessToken={mapboxToken} mapStyle="mapbox://styles/mapbox/dark-v10" {...viewport} onViewportChange={nextViewport => setViewport({ ...nextViewport, width: 'fit' })}>
                <Pins data={lighthouses} onClick={setPopupInfo} />
            </ReactMapGl>
            <Drawer
                anchor="right"
                open={!!popupInfo}
                onClose={() => { toggleDrawer('right', false); setPopupInfo(); }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', padding: padding }
                }}
            >
                <Box className={classes.paper}>
                    <IconButton aria-label="Close" onClick={() => setPopupInfo(null)}>
                        <CloseIcon />
                    </IconButton>
                    {popupInfo && <Info info={popupInfo} />}
                </Box>
            </Drawer>
        </Container>
    );
};

export default LighthouseMap;
