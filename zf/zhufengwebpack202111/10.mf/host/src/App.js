import React from 'react';
import Sliders from './Sliders';
const RemoteNewsList = React.lazy(() => import("remote/NewsList"));

function App() {
    return (
        <div>
            <h2>本地组件Sliders</h2>
            <Sliders />
            <h2>远程组件新闻列表</h2>
            <React.Suspense fallback={<div>Loading NewsList</div>}>
                <RemoteNewsList />
            </React.Suspense>
        </div>
    )
}

export default App;