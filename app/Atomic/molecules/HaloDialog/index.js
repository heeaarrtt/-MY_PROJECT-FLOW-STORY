import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import Draggable from 'react-draggable';

import DialogTitle from './DialogTitle';
import AtomDialog from '../../atoms/Dialog';
import AtomHaloDialogContent from '../../atoms/DialogContent/HaloDialogContent';
import AtomHaloDialogActions from '../../atoms/DialogActions/HaloDialogActions';
import AtomTypography from '../../atoms/Typography';
import AtomBox from '../../atoms/Box';
import AtomPaper from '../../atoms/Paper';

const useStyles = makeStyles(theme => ({
  paperRounded: {
    '&:not(.MuiDialog-paperFullScreen)': {
      borderRadius: theme.spacing(1),
    },
  },
}));

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <AtomPaper {...props} />
    </Draggable>
  );
}

/* Customized dialogs MUI */
export default function HaloDialog({
  open,
  onClose,
  dialogProps,
  dialogTitleProps,
  dialogContentProps,
  dialogActionsProps,
  title,
  titleProps,
  titleCenter,
  content,
  contentCustomize,
  actions,
  fullScreenMobile,
  DialogTitleComponent,
  draggable,
  disableCloseButton,
  disableDialogTitle,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const hasFullScreen = fullScreenMobile && matches;

  return (
    <AtomDialog
      onClose={onClose}
      open={open}
      aria-labelledby="customized-dialog-title"
      fullScreen={hasFullScreen}
      fullWidth
      PaperComponent={draggable && !matches ? PaperComponent : undefined}
      classes={{
        paper: !matches ? classes.paperRounded : undefined,
      }}
      {...dialogProps}
    >
      {!disableDialogTitle && (
        <>
          {DialogTitleComponent ||
            ((title || onClose) && (
              <DialogTitle
                style={draggable ? { cursor: 'move' } : undefined}
                id="draggable-dialog-title"
                onClose={!disableCloseButton && onClose}
                titleProps={{ ...titleProps }}
                {...dialogTitleProps}
              >
                {title}
              </DialogTitle>
            ))}
        </>
      )}

      {titleCenter && (
        <AtomBox
          pt={!title && !onClose ? 3 : undefined}
          px={3}
          textAlign="center"
        >
          <AtomTypography variant="h5" component="div" {...titleProps}>
            <b>{titleCenter}</b>
          </AtomTypography>
        </AtomBox>
      )}
      {content && (
        <AtomHaloDialogContent {...dialogContentProps}>
          {content}
        </AtomHaloDialogContent>
      )}
      {actions && (
        <AtomHaloDialogActions {...dialogActionsProps}>
          {actions}
        </AtomHaloDialogActions>
      )}
      {contentCustomize}
    </AtomDialog>
  );
}
HaloDialog.propTypes = {
  open: PropTypes.bool, // ????ng m??? dialog
  onClose: PropTypes.func, // handle n??t ????ng dialog
  title: PropTypes.any, // ti??u ????? tr??n
  titleCenter: PropTypes.any, // ti??u ????? gi???a
  titleProps: PropTypes.object, // customize ti??u ?????
  content: PropTypes.any, // n???i dung
  contentCustomize: PropTypes.any, // n???i dung t??y ch???nh
  actions: PropTypes.any, // h??nh ?????ng
  fullScreenMobile: PropTypes.bool, // to??n m??n h??nh ??? tablet tr??? xu???ng
  // t??y ch???nh dialog
  dialogProps: PropTypes.object,
  dialogTitleProps: PropTypes.object,
  dialogContentProps: PropTypes.object,
  dialogActionsProps: PropTypes.object,
  DialogTitleComponent: PropTypes.any, // t??y ch???nh title
  draggable: PropTypes.any, // cho ph??p di chuy???n dialog
  disableCloseButton: PropTypes.bool, // t???t n??t close
  disableDialogTitle: PropTypes.bool, // t???t dialog title,
};
HaloDialog.defaultProps = {
  draggable: true,
};
