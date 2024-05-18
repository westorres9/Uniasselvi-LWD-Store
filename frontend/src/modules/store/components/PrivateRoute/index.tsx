import { Navigate } from "react-router-dom";
import { Role } from "../../../../types/role";
import * as authService from "../../../../services/auth-service";

type Props = {
  children: JSX.Element;
  roles?: Role[];
};

export default function PrivateRoute({ children, roles = [] }: Props) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  if (!authService.hasAnyRoles(roles)) {
    return <Navigate to="/products" />;
  }
  return children;
}
