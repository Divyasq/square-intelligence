import React, { useState } from 'react';
import { Alert } from '../ui/Alert';
import { Button } from '../ui/Button';

export function AlertDemo() {
  const [showAlert, setShowAlert] = useState(true);

  if (!showAlert) {
    return (
      <div className="p-4">
        <Button onClick={() => setShowAlert(true)}>
          Show Alert Demo
        </Button>
      </div>
    );
  }

  return (
    <Alert
      variant="info"
      dismissable
      onDismiss={() => setShowAlert(false)}
      action={
        <button
          onClick={() => console.log('Import library clicked')}
          className="text-blue-600 hover:text-blue-700 font-medium underline"
        >
          Import library
        </button>
      }
    >
      <b className="font-semibold">Already have items?</b> Upload an existing item catalog to get started.
    </Alert>
  );
}