import React from 'react'
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';

const ProtectedRoute = ({
    component: Component,
    user,
    ...rest
}) => (
    <Route {...rest} render={(props) => {
        if (user !== null && user.isAuthenticated === true) {
            return <Component {...props} />;
        }

        return <Redirect to={{ pathname: "/login", state: { from: props.location }}} />
    }}/>
);

const mapStateToProps = (state) => ({
    user: state.user.self,
})

export default connect(mapStateToProps)(ProtectedRoute)