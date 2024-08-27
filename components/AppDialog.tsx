"use client";

import { Modal, Stack } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import AppButton from "./AppButton";

interface AppDialogProps extends LaunchAppDialogProps {
  opened: boolean;
  handleClose?: () => void;
}
const AppDialog = ({
  opened,
  handleClose,
  title,
  notDismissable,
  children,
}: AppDialogProps) => {
  return (
    <Modal
      opened={opened}
      onClose={
        handleClose ??
        (() => {
          console.log("closed");
        })
      }
      title={title}
      withCloseButton={false}
      closeOnClickOutside={!notDismissable}
      centered
      styles={{
        header: {
          justifyContent: "center",
        },
        title: {
          fontSize: 18,
        },
        root: {
          zIndex: 10,
        },
      }}
    >
      <Stack align="center">{children}</Stack>
    </Modal>
  );
};

type LaunchAppDialogProps = {
  id?: string;
  title?: string;
  notDismissable?: boolean;
  children?: any;
  fullScreen?: boolean;
  withCloseButton?: boolean;
  modalBackground?: any;
};

const openAppDialog = ({
  id,
  children,
  notDismissable,
  title,
  fullScreen,
  withCloseButton,
  modalBackground,
}: LaunchAppDialogProps) => {
  openModal({
    modalId: id,
    title,
    withCloseButton: !!withCloseButton,
    centered: true,
    fullScreen,
    closeOnClickOutside: !notDismissable,
    children: <Stack className="text-center">{children}</Stack>,
    styles: {
      inner: {
        paddingTop: 0,
        paddingBottom: 0,
      },
      header: {
        justifyContent: "center",
      },
      title: {
        fontSize: 18,
      },
      modal: {
        background: modalBackground,
      },
    },
  });
};

const openSingleActionDialog = ({
  id,
  title,
  buttonLabel,
  children,
  onActionClick,
}: {
  id: string;
  title?: string;
  buttonLabel?: string;
  children: any;
  onActionClick?: () => void;
}) => {
  openAppDialog({
    id,
    title,
    children: (
      <>
        {children}

        <AppButton
          onClick={() => {
            if (onActionClick) onActionClick();
            closeModal(id);
          }}
        >
          {buttonLabel ?? "Got it"}
        </AppButton>
      </>
    ),
  });
};

export default AppDialog;
export { type AppDialogProps, openAppDialog, openSingleActionDialog };
