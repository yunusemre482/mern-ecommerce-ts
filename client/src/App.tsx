import React from 'react';
import AppRouter from './routes';
function App() {
	return (
		<div className='App'>
			<AppRouter role='admin' isAuthenticated={false} />
		</div>
	);
}

export default App;
