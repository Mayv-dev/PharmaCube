// This modified file was originally taken from the video used to implement sqlite in our project https://www.youtube.com/watch?v=tixvx5nsJO8&t=1130s

import React, { useState } from "react";
import { IonAlert } from "@ionic/react";

const useConfirmationAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState<() => void>();

  const showConfirmationAlert = (
    message: React.SetStateAction<string>,
    onConfirm: () => void
  ) => {
    setAlertMessage(message);
    setConfirmAction(() => onConfirm);
    setShowAlert(true);
  };

  const handleConfirm = () => {
    confirmAction && confirmAction();
    setShowAlert(false);
  };

  const handleCancel = () => {
    setShowAlert(false);
  };

  return {
    showConfirmationAlert,
    ConfirmationAlert: (
      <IonAlert
        isOpen={showAlert}
        message={alertMessage}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: handleCancel,
          },
          {
            text: "Confirm",
            handler: handleConfirm,
          },
        ]}
      />
    ),
  };
};

export default useConfirmationAlert;
