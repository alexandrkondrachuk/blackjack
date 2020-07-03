import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import t from '../../i18nProvider/t';
import { api, transport } from '../../services';

async function initGame() {
    try {
        const status = await api.connect();
        if (status) transport.init();
        return status;
    } catch (e) {
        throw new Error(e);
    }
}

async function reconnect() {
    try {
        let status = false;
        const leave = await api.leave();
        transport.doClose();
        if (leave) {
            status = await initGame();
        }
        return status;
    } catch (e) {
        throw new Error(e);
    }
}

initGame();

function Home(props) {
    const { isConnect } = props;

    const sit = async () => {
        try {
            const hand = +prompt('Your hand: ');
            const s = await api.sit(hand);
            return s;
        } catch (e) {
            throw new Error(e);
        }
    };
    const leave = async () => {
        try {
            const l = await api.leave();
            return l;
        } catch (e) {
            throw new Error(e);
        }
    };
    const bet = async () => {
        try {
            const hand = +prompt('Your hand: ');
            const b = await api.bet(0.1, hand);
            return b;
        } catch (e) {
            throw new Error(e);
        }
    };
    const cancelBet = async () => {
        try {
            const b = await api.cancelLastBet();
            return b;
        } catch (e) {
            throw new Error(e);
        }
    };

    const cancelAll = async () => {
        try {
            const b = await api.cancelAll();
            return b;
        } catch (e) {
            throw new Error(e);
        }
    };

    return (
        <div className="Home">
            <h1>{t('Home Page')}</h1>
            {isConnect ? <p>Ready</p> : <p>Connect...</p>}
            {isConnect && (
                <div>
                    <button type="button" onClick={sit}>sit</button>
                    <button type="button" onClick={bet}>bet</button>
                    <button type="button" onClick={cancelBet}>cancel</button>
                    <button type="button" onClick={cancelAll}>cancel all</button>
                    <button type="button" onClick={leave}>leave</button>
                    <button type="button" onClick={reconnect}>reconnect</button>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    const isConnect = _.get(state, 'game.isReady');
    return {
        isConnect,
    };
};

const dispatchStateToProps = (dispatch) => ({
    dispatch,
});

export default connect(mapStateToProps, dispatchStateToProps)(Home);
