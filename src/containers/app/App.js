import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Link,
} from 'react-router-dom';
import {
    withOrientationChange,
} from 'react-device-detect';
import { routes, RouteWithSubRoutes } from '../../routes';
import { I18nPropvider} from '../../i18nProvider';
import t from '../../i18nProvider/t';

import './App.scss';

function App(props) {
    const { lang } = props;
    return (
        <div className="App">
            <I18nPropvider locale={lang}>
                <header className="App-header">
                    <Router>
                        <div>
                            <h2>{t('Use routing example')}</h2>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                            </ul>
                            <Switch>
                                {routes.map((route) => (
                                    <RouteWithSubRoutes key={route.id} {...route} />
                                ))}
                            </Switch>
                        </div>
                    </Router>
                </header>
            </I18nPropvider>
        </div>
    );
}

App.defaultProps = {
    lang: 'en',
    dispatch: () => {
    },
    isLandscape: false,
    isPortrait: false,
};

App.propTypes = {
    lang: PropTypes.string,
    dispatch: PropTypes.func,
    isLandscape: PropTypes.bool,
    isPortrait: PropTypes.bool,
};

const mapStateToProps = (state) => {
    const { lang } = state.app;
    return { lang };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(withOrientationChange(App));
