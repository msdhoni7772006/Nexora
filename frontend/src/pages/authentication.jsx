
import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";

import { AuthContext } from "../contexts/AuthContext";

const defaultTheme = createTheme();

export default function Authentication() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const { handleRegister, handleLogin } =
        React.useContext(AuthContext);

    const handleAuth = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            if (formState === 0) {
                await handleLogin(username, password);
            } else {
                const result = await handleRegister(
                    name,
                    username,
                    password
                );

                setMessage(
                    typeof result === "string"
                        ? result
                        : "Registration successful"
                );

                setOpen(true);
                setName("");
                setUsername("");
                setPassword("");
                setFormState(0);
            }
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />

            <Grid
                container
                component="main"
                sx={{ minHeight: "100vh" }}
            >
                {/* Left image panel */}
                <Grid
                    size={{ sm: 4, md: 7 }}
                    sx={{
                        display: { xs: "none", sm: "block" },
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1521737711867-e3b97375f902)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (theme) =>
                            theme.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

                {/* Authentication panel */}
                <Grid
                    size={{ xs: 12, sm: 8, md: 5 }}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: { xs: 3, sm: 4 },
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            sx={{
                                m: 1,
                                bgcolor: "secondary.main",
                            }}
                        >
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            Welcome to Nexora
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                        >
                            Connect. Collaborate. Communicate.
                        </Typography>

                        <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
                            <Button
                                variant={
                                    formState === 0
                                        ? "contained"
                                        : "outlined"
                                }
                                onClick={() => {
                                    setFormState(0);
                                    setError("");
                                }}
                            >
                                Sign In
                            </Button>

                            <Button
                                variant={
                                    formState === 1
                                        ? "contained"
                                        : "outlined"
                                }
                                onClick={() => {
                                    setFormState(1);
                                    setError("");
                                }}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleAuth}
                            sx={{ mt: 1, width: "100%" }}
                        >
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    name="name"
                                    autoComplete="name"
                                    value={name}
                                    autoFocus
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                />
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                value={username}
                                autoFocus={formState === 0}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete={
                                    formState === 0
                                        ? "current-password"
                                        : "new-password"
                                }
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                            {error && (
                                <Typography
                                    color="error"
                                    variant="body2"
                                    sx={{ mt: 1 }}
                                >
                                    {error}
                                </Typography>
                            )}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {loading
                                    ? "Please wait..."
                                    : formState === 0
                                        ? "Login"
                                        : "Register"}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                message={message}
                onClose={() => setOpen(false)}
            />
        </ThemeProvider>
    );
}
