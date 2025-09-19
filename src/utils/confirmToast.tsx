import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

type ConfirmOptions = {
  message?: string;
  onConfirm: () => Promise<void> | void;
};

export const confirmToast = ({
  message = "¿Estás seguro?",
  onConfirm,
}: ConfirmOptions) => {
  const toastId = toast.info(
    <div>
      <p>{message}</p>
      <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
        <Button
          variant="danger"
          size="sm"
          onClick={async () => {
            try {
              await onConfirm();
              toast.update(toastId, {
                render: "Acción realizada correctamente!",
                type: "success",
                autoClose: 3000,
                closeButton: true,
              });
            } catch {
              toast.update(toastId, {
                render: "Error al realizar la acción",
                type: "error",
                autoClose: 3000,
                closeButton: true,
              });
            }
          }}
        >
          Sí
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast.dismiss(toastId)}
        >
          No
        </Button>
      </div>
    </div>,
    {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    }
  );
};
