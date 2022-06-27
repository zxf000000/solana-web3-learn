import React from "react";
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps, useMatch, useResolvedPath
} from 'react-router-dom';
import {ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme} from "@mui/material";

interface ListItemLinkProps {
    icon?: React.ReactElement,
    primary: string,
    to: string,
    sx?: object,
}

function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to, sx } = props;
    const theme = useTheme();
    const renderLink = React.useMemo(() =>
        React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(function Link(
        itemProps,
        ref,
    ) {
            const resolved = useResolvedPath(to);
            const match = useMatch({path: resolved.pathname, end: true});
        return <RouterLink
            style={{
                color: match ? theme.palette.primary.light: '',
                background: match ? 'rgba(0,0,0,0.1)' : '',
            }}
            to={to} ref={ref} {...itemProps} role={undefined}></RouterLink>
    }), [to],);
    return (
        <div>
            <ListItemButton component={renderLink} sx={sx}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary}></ListItemText>
            </ListItemButton>
        </div>
    )
}


export default ListItemLink;
