import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../App';

const PrivataRoute = ({children, ...rest}) => {
    const [loggedUser, setLoggedUser]=useContext(UserContext)
    return (
        <Route
        {...rest}
        render={({ location }) =>
           loggedUser.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/logIn",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivataRoute;