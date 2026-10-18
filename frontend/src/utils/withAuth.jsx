
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const router = useNavigate();

        useEffect(() => {
            if (!localStorage.getItem("token")) {
                router("/auth", { replace: true });
            }
        }, [router]);

        if (!localStorage.getItem("token")) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    AuthComponent.displayName = `withAuth(${
        WrappedComponent.displayName || WrappedComponent.name || "Component"
    })`;

    return AuthComponent;
};

export default withAuth;
