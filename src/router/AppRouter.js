import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HomePage from '../pages/HomePage';
import DemoPage from '../pages/DemoPage';
import KakaoMap from '../pages/KakaoMap';

class AppRouter extends React.Component {
    render() {
        return (
            <>
                <Navbar />
                <BrowserRouter>
                    <Route path="/" component={HomePage} exact={true} />
                    <Route path="/map" component={KakaoMap} />
                    <Route path="/demo" component={DemoPage} />
                </BrowserRouter>
            </>
        );
    }
}

export default AppRouter;
