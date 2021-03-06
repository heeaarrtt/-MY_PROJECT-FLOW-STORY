import React from 'react';
import PropTypes from 'prop-types';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { lightBlue } from '@material-ui/core/colors';
// cus
import AtomList from '../../atoms/List';
import AtomListItem from '../../atoms/ListItem';
import AtomListItemText from '../../atoms/ListItemText';
import AtomListItemIconSmall from '../../atoms/ListItemIcon/AtomListItemIconSmall';
import AtomRouterLink from '../../atoms/RouterLink';
import AtomListSubheader from '../../atoms/ListSubheader';
import AtomCollapse from '../../atoms/Collapse';
import ArrowDownIcon from '../../../icons/ArrowDownIcon';
import ArrowRightIcon from '../../../icons/ArrowRightIcon';
import AtomLink from '../../atoms/Link';
import AtomIconBackground from '../../atoms/IconBackground';
import AtomBox from '../../atoms/Box';
// import history from '../../../utils/history';

const routerMenuStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  },
  menuHeader: {
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.primary.main,
    lineHeight: `${theme.spacing(3)}px`,
    borderRadius: theme.spacing(0.5),
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.background.paper
  },
  menuItem: {
    // borderRadius: theme.spacing(0.5),
  },
  menuItemActive: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.primary.main,
    backgroundColor:
      theme.palette.type === 'light'
        ? lightBlue[50]
        : theme.palette.background.default,
    '& svg': {
      color: theme.palette.primary.main
    }
  },
  menuItemIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

function RouterMenuItem({
  dataIndex,
  route,
  subRoutes,
  isSubmenu,
  listProps,
  listItemProps,
  enabledIconBackground
}) {
  const classes = routerMenuStyles();

  // trang hi???n t???i
  const isCurrentPage = location.pathname === route.path;

  // ki???m tra subRoutes c?? ch???a menu active ko
  const hasCurrentPageInSubRoutes =
    subRoutes &&
    subRoutes.filter(item => item.path === location.pathname).length > 0;

  // ????ng/m??? submenu
  const [open, setOpen] = React.useState(hasCurrentPageInSubRoutes);
  const handleClick = () => {
    setOpen(!open);
  };

  const linkProps = {
    component:
      (route.path && AtomRouterLink) || (route.href && AtomLink) || undefined,
    to: route.path || undefined,
    href: route.href || undefined,
    color: 'inherit',
    target: route.target || undefined
  };

  return (
    <React.Fragment>
      <AtomListItem
        button
        // selected={isCurrentPage}
        className={clsx(
          classes.menuItem,
          isSubmenu ? classes.nested : undefined,
          isCurrentPage ? classes.menuItemActive : undefined
        )}
        onClick={subRoutes ? handleClick : undefined}
        {...linkProps}
        {...listItemProps}
      >
        <AtomListItemIconSmall>
          <AtomBox
            className={classes.menuItemIcon}
            component={enabledIconBackground ? AtomIconBackground : 'span'}
          >
            {route.icon ? (
              <route.icon />
            ) : (
              <FiberManualRecordOutlinedIcon
                fontSize="small"
                color={!isSubmenu ? 'primary' : undefined}
              />
            )}
          </AtomBox>
        </AtomListItemIconSmall>
        <AtomListItemText
          primary={route.label || 'Ch??a c?? label'}
          primaryTypographyProps={{ variant: 'inherit' }}
        />

        {/* m??i t??n menu */}
        {subRoutes && (
          <React.Fragment>
            {open ? (
              <ArrowDownIcon fontSize="small" color="action" />
            ) : (
              <ArrowRightIcon fontSize="small" color="action" />
            )}
          </React.Fragment>
        )}
      </AtomListItem>
      {/* sub menu */}
      {subRoutes && (
        <AtomCollapse in={open} timeout="auto" unmountOnExit>
          {/* isSubmenu ???????c g???n v??o khi c?? subRoutes ????? check style v?? icon */}
          <RouterMenu
            dataIndex={dataIndex}
            routes={subRoutes}
            isSubmenu
            listProps={listProps}
            listItemProps={listItemProps}
          />
        </AtomCollapse>
      )}
    </React.Fragment>
  );
}
RouterMenuItem.propTypes = {
  dataIndex: PropTypes.any,
  route: PropTypes.object, // pass nested route object
  subRoutes: PropTypes.any, // c??c menu con
  isSubmenu: PropTypes.bool, // l?? sub-menu
  listProps: PropTypes.object,
  listItemProps: PropTypes.object,
  enabledIconBackground: PropTypes.bool
};

/* menu c?? route link, h??? tr??? sub-routes */
function RouterMenu(props) {
  const {
    dataIndex,
    routes,
    menuHeader,
    isSubmenu,
    listProps,
    listItemProps,
    enabledIconBackground
  } = props;

  const classes = routerMenuStyles();
  // const locationPath = history.location.pathname;

  return (
    <AtomList
      component="nav"
      disablePadding
      subheader={
        menuHeader && (
          <AtomListSubheader
            component="div"
            id="menu-header"
            className={classes.menuHeader}
          >
            {menuHeader}
          </AtomListSubheader>
        )
      }
      {...listProps}
    >
      {routes.map((route, index) => {
        const subRoutes = route.routes; // menu con
        const routeIndex = index;

        return (
          <React.Fragment key={routeIndex}>
            {!route.hide && route.hide !== true && (
              <RouterMenuItem
                dataIndex={dataIndex}
                route={route}
                subRoutes={subRoutes}
                isSubmenu={isSubmenu}
                listProps={listProps}
                listItemProps={listItemProps}
                enabledIconBackground={enabledIconBackground}
              />
            )}
          </React.Fragment>
        );
      })}
    </AtomList>
  );
}
RouterMenu.propTypes = {
  dataIndex: PropTypes.any,
  routes: PropTypes.array, // c??c route con
  menuHeader: PropTypes.any, // t??n menu
  isSubmenu: PropTypes.bool, // l?? sub-menu
  listProps: PropTypes.object, // c??c prop c???a List
  listItemProps: PropTypes.object, // c??c prop c???a ListItem
  enabledIconBackground: PropTypes.bool // b???t icon background tr??n
};
export default RouterMenu;
