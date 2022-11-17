// --- Imports --------------------------------------------

import { inputEmailFormatInvalide } from "../../utils/inputVerificationTools";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  successMessage,
  errorMessage,
} from "../../storeSlice/userMessageStateSlice";
import axios from "axios";
import { logout } from "../../storeSlice/logStateSlice";
import { ticketListout } from "../../storeSlice/TicketListSlice";
import { userSetFirstName, userSetLastName,userSetAdress,userSetPhoneNumber,userSetEnterpriseName,userSetWebsite,userSetEmail } from "../../storeSlice/UserConnectedSlice";

// --- Imports MUI ----------------------------------------

import LateralBar from "../../components/LateralBar/LateralBar";

import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Modal,
  Button,
  CardMedia,
  Avatar,
  Link,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Modal --------------------------------------------------

function UserProfile() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "80%", lg: "50%" },
    bgcolor: "background.paper",
    borderRadius: "25px",
    boxShadow: 24,
    p: 4,
  };

  const dispatch = useDispatch();
  const userQRCodeUrl = useSelector((state) => state.userConnected.userQRCodeUrl);
  const userLogo = useSelector((state) => state.userConnected.userLogo);
  const token = useSelector((state) => state.logState.token);
  const valueFirstName = useSelector((state) => state.userConnected.userFirstName)
  const valueLastName = useSelector((state) => state.userConnected.userLastName)
  const valueAddress = useSelector((state) => state.userConnected.userAdress)
  const valuePhoneNumber = useSelector((state) => state.userConnected.userPhoneNumber)
  const valueEnterpriseName = useSelector((state) => state.userConnected.userEntrepriseName)
  const valueWebsite = useSelector((state) => state.userConnected.userWebsite)
  const valueEmail = useSelector((state) => state.userConnected.userEmail)



  const [valuePassword, setPassword] = useState("");
  const [valuePasswordControl, setPasswordControl] = useState("");

  //error controler
  const [emailError, setEmailError] = useState(false);
  const [phonenumberError, setPhoneNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordControlError, setPasswordControlError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordControl, setShowPasswordControl] = useState(false);
  const apiUrl = useSelector((state) => state.url.apiUrl);

  const checkPhoneNumber = () => {
    if (
      !valuePhoneNumber.match(
        "^(?:(?:\\+|00)33[\\s.-]{0,3}(?:\\(0\\)[\\s.-]{0,3})?|0)[1-9](?:(?:[\\s.-]?\\d{2}){4}|\\d{2}(?:[\\s.-]?\\d{3}){2})$"
      )
    ) {
      setPhoneNumberError(true);
    } else {
      setPhoneNumberError(false);
    }
  };
  const checkPassword = () => {
    if (
      !valuePassword.match(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$"
      )
    ) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  const checkPasswordControl = () => {
    if (valuePassword === valuePasswordControl) {
      setPasswordControlError(false);
    } else {
      setPasswordControlError(true);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let optionsUserEdit = {
      method: "PATCH",
      url: `${apiUrl}/v1_0/users/edit`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({
        firstName: valueFirstName,
        lastName: valueLastName,
        address: valueAddress,
        phone_number: valuePhoneNumber,
        enterprise_name: valueEnterpriseName,
        email: valueEmail,
        websiteUrl: valueWebsite,
      }),
    };
    if (valuePassword !== "") {
      optionsUserEdit = {
        method: "PATCH",
        url: `${apiUrl}/v1_0/users/edit`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify({
          firstName: valueFirstName,
          lastName: valueLastName,
          address: valueAddress,
          phone_number: valuePhoneNumber,
          enterprise_name: valueEnterpriseName,
          email: valueEmail,
          websiteUrl: valueWebsite,
          password: valuePassword,
        }),
      };
    }
    if (
      emailError === true ||
      phonenumberError === true ||
      passwordError === true ||
      passwordControlError === true ||
      valueFirstName === "" ||
      valueLastName === "" ||
      valueAddress === "" ||
      valueEnterpriseName === ""
    ) {
    dispatch(errorMessage("Formulaire invalide ! merci de remplir tous les champs"));
    } else {
      axios
        .request(optionsUserEdit)
        .then(function (response) {
          dispatch(successMessage("Votre profil est bien modifier"));
          if (valuePassword !== "") {
            localStorage.removeItem("user")
            dispatch(logout());
            dispatch(ticketListout());
          }
        })
        .catch(function (error) {
          dispatch(errorMessage("Une erreur est survenue merci de réessayer plus tard. Si le problème persiste merci d'utiliser le formulaire de contact"));
        });
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <LateralBar />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            flexGrow: 1,
            p: 2,
          }}
        >
          <Card
            variant="outlined"
            sx={{
              width: { xs: "100%", md: "100%", lg: "70%" },
              maxHeight: "90vh",
              borderRadius: "25px",
              ml: { xs: "0", lg: "0.5rem" },
              mr: { xs: "0", lg: "0.5rem" },
            }}
          >
            <CardHeader
              title="Mon Profil"
              sx={{
                height: "4rem",
                backgroundColor: "#2d436d",
                color: "white",
              }}
            />
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    mb: 2.5,
                    ml: 2,
                    mr: 2,
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={"https://sav-ed.fr/images/logo/" + userLogo}
                    sx={{ width: 125, height: 125 }}
                  />
                  <Button
                    onClick={handleOpen}
                    sx={{
                      width: { xs: "60%", lg: "40%" },
                      height: "30%",
                      color: "white",
                      background:
                        "linear-gradient(45deg, #10b983 10%, #3a5792 40%)",
                      borderRadius: 6,
                    }}
                  >
                    Modifier mon profil
                  </Button>
                </Box>

                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    width: { xs: "100%" },
                    p: "1.5%",
                    mb: "2%",
                    mr: "1%",
                    ml: "1%",
                    borderRadius: { xs: 2, sm: "25px" },
                  }}
                >
                  <Typography variant="p" sx={{ fontWeight: "bold" }}>
                    Email :
                  </Typography>
                  <Typography variant="p">{valueEmail}</Typography>
                </Card>
                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    width: { xs: "100%" },
                    p: "1.5%",
                    mb: "2%",
                    mr: "1%",
                    ml: "1%",
                    borderRadius: { xs: 2, sm: "25px" },
                  }}
                >
                  <Typography variant="p" sx={{ fontWeight: "bold" }}>
                    Prénom :
                  </Typography>
                  <Typography variant="p">{valueFirstName}</Typography>
                </Card>
                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    width: { xs: "100%" },
                    p: "1.5%",
                    mb: "2%",
                    mr: "1%",
                    ml: "1%",
                    borderRadius: { xs: 2, sm: "25px" },
                  }}
                >
                  <Typography variant="p" sx={{ fontWeight: "bold" }}>
                    Nom :
                  </Typography>
                  <Typography variant="p">{valueLastName}</Typography>
                </Card>
                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    width: { xs: "100%" },
                    p: "1.5%",
                    mb: "2%",
                    mr: "1%",
                    ml: "1%",
                    borderRadius: { xs: 2, sm: "25px" },
                  }}
                >
                  <Typography variant="p" sx={{ fontWeight: "bold" }}>
                    Nom de l'entreprise :
                  </Typography>
                  <Typography variant="p">{valueEmail}</Typography>
                </Card>
                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    width: { xs: "100%" },
                    p: "1.5%",
                    mb: "2%",
                    mr: "1%",
                    ml: "1%",
                    borderRadius: { xs: 2, sm: "25px" },
                  }}
                >
                  <Typography variant="p" sx={{ fontWeight: "bold" }}>
                    Adresse :
                  </Typography>
                  <Typography variant="p">{valueAddress}</Typography>
                </Card>
                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    width: { xs: "100%" },
                    p: "1.5%",
                    mb: "2%",
                    mr: "1%",
                    ml: "1%",
                    borderRadius: { xs: 2, sm: "25px" },
                  }}
                >
                  <Typography variant="p" sx={{ fontWeight: "bold" }}>
                    Site Web :
                  </Typography>
                  <Typography variant="p">{valueWebsite}</Typography>
                </Card>
                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    width: { xs: "100%" },
                    p: "1.5%",
                    mb: "2%",
                    mr: "1%",
                    ml: "1%",
                    borderRadius: { xs: 2, sm: "25px" },
                  }}
                >
                  <Typography variant="p" sx={{ fontWeight: "bold" }}>
                    Numéro de téléphone :
                  </Typography>
                  <Typography variant="p">{valuePhoneNumber}</Typography>
                </Card>
              </Box>
            </CardContent>
          </Card>

          <Card
            variant="outlined"
            sx={{
              width: { xs: "100%", md: "100%", lg: "30%" },
              mt: { xs: "1rem", lg: "0" },
              minHeight: "85vh",
              borderRadius: "25px",
              ml: { xs: "0", lg: "0.5rem" },
            }}
          >
            <CardHeader
              title="Mon QR code"
              sx={{
                height: "4rem",
                backgroundColor: "#2d436d",
                color: "white",
              }}
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardMedia
                component="img"
                image={
                  "https://sav-ed.fr/images/qrCode/" + userQRCodeUrl
                }
                alt="Qrcode"
                sx={{
                  maxHeight: "65vh",
                  borderRadius: 6,
                }}
              />
              <Button
                component={Link}
                href={"https://sav-ed.fr/images/qrCode/" + userQRCodeUrl}
                download={
                  "https://sav-ed.fr/images/qrCode/" + userQRCodeUrl
                }
                sx={{
                  m: "auto",
                  mt: "1rem",
                  width: "100%",
                  color: "white",
                  background:
                    "linear-gradient(45deg, #10b983 10%, #3a5792 40%)",
                  borderRadius: 6,
                }}
              >
                Télécharger mon QRcode
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Typography component="h1" variant="h5">
                        Modifier mon Profil
                      </Typography>
                      <IconButton
                        onClick={handleClose}
                        area-label="close"
                        sx={{ position: "absolute", right: 20, top: 20 }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </Box>

                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      noValidate
                      sx={{ mt: 3 }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="Prénom"
                            autoFocus
                            value={valueFirstName}
                            onChange={(e) => userSetFirstName(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Nom"
                            name="lastName"
                            autoComplete="family-name"
                            value={valueLastName}
                            onChange={(e) => userSetLastName(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="adresse"
                            label="Adresse"
                            id="adresse"
                            autoComplete="adresse"
                            value={valueAddress}
                            onChange={(e) => userSetAdress(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="phone_number"
                            label="Numéro de téléphone"
                            id="phone_number"
                            autoComplete="phone_number"
                            value={valuePhoneNumber}
                            onChange={(e) => userSetPhoneNumber(e.target.value)}
                            onBlur={checkPhoneNumber}
                            error={phonenumberError}
                            helperText={
                              phonenumberError
                                ? "Ceci n'est pas un numéro de téléphone valide "
                                : ""
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="enterprise_name"
                            label="Nom de l'entreprise"
                            id="enterprise_name"
                            autoComplete="enterprise_name"
                            value={valueEnterpriseName}
                            onChange={(e) => userSetEnterpriseName(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="Site Web"
                            label="Site web"
                            id="website"
                            autoComplete="website"
                            value={valueWebsite}
                            onChange={(e) => userSetWebsite(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={valueEmail}
                            onChange={(e) => userSetEmail(e.target.value)}
                            onBlur={(e) => setEmailError(inputEmailFormatInvalide(e.target.value))}
                            error={emailError}
                            helperText={
                              emailError
                                ? "Votre email doit ressembler à ceci: exemple@email.com"
                                : ""
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            color="info"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            autoComplete="new-password"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            error={passwordError}
                            value={valuePassword}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={checkPassword}
                            helperText="Au moins dix caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="passwordControl"
                            label="Confirmation du mot de passe"
                            color="info"
                            type={showPasswordControl ? "text" : "password"}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                      setShowPasswordControl(
                                        !showPasswordControl
                                      )
                                    }
                                    edge="end"
                                  >
                                    {showPasswordControl ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            id="passwordControl"
                            autoComplete="new-password"
                            error={passwordControlError}
                            value={valuePasswordControl}
                            onChange={(e) => setPasswordControl(e.target.value)}
                            onBlur={checkPasswordControl}
                          />
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                          background:
                            "linear-gradient(45deg, #10b983 10%, #3a5792 40%)",
                          borderRadius: 25,
                        }}
                      >
                        Modifier mon profil
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Modal>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default UserProfile;

// DATA FAKES ---------------------------------------------

const enterpriseLogo = "https://sav-ed.fr/images/logo/logo.jpg";
