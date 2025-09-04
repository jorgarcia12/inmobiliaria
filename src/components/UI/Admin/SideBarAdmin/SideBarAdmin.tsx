import styles from "./SideBarAdmin.module.css";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

export const SideBarAdmin = () => {
  const navigate = useNavigate();
  const handleNavFeatured = () => {
    navigate("/admin/feat-properties");
  };

  const handleNavReports = () => {
    navigate("/admin/reports");
  };

  const handleGoUsers = () => {
    navigate("/admin/users");
  };

  const handleGoAddUsers = () => {
    navigate("/admin/users/add-user");
  };
  const handleGoRolesAndPermissions = () => {
    navigate("/admin/roles-and-permissions");
  };
  return (
    <div className={styles.sideBarContainer}>
      <div className={styles.menuSection}>
        <Accordion disableGutters>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              bgcolor: "#003a33",
              color: "white",
              minHeight: "48px",
              "& .MuiAccordionSummary-content": {
                margin: 0,
              },
            }}
          >
            <Typography component="span">Propiedades</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: "#004d40", color: "white" }}>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", mb: 2, borderBottom: "1px solid" }}
              className={styles.buttonAction}
            >
              Listar
            </Typography>

            <Typography
              variant="body2"
              sx={{ cursor: "pointer", mb: 2, borderBottom: "1px solid" }}
              className={styles.buttonAction}
              onClick={handleNavFeatured}
            >
              Destacadas
            </Typography>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", borderBottom: "1px solid" }}
              className={styles.buttonAction}
            >
              Categorías
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className={styles.menuSection}>
        <Accordion disableGutters>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              bgcolor: "#003a33",
              color: "white",
              minHeight: "48px",
              "& .MuiAccordionSummary-content": {
                margin: 0,
              },
            }}
          >
            <Typography component="span">Usuarios</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: "#004d40", color: "white" }}>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", mb: 2, borderBottom: "1px solid" }}
              className={styles.buttonAction}
              onClick={handleGoUsers}
            >
              Listar
            </Typography>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", mb: 2, borderBottom: "1px solid" }}
              className={styles.buttonAction}
              onClick={handleGoAddUsers}
            >
              Agregar
            </Typography>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", mb: 2, borderBottom: "1px solid" }}
              className={styles.buttonAction}
              onClick={handleGoRolesAndPermissions}
            >
              Roles y Permisos
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className={styles.reportSection} onClick={handleNavReports}>
        Reportes
      </div>
    </div>
  );
};
