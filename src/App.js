import React, { useState } from 'react';
import { 
  createBrowserRouter,
  RouterProvider,
  useParams,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import './App.css';
import ServerCard from './components/ServerCard';
import QASection from './components/QASection';
import serversData from './servers.json';

const SERVERS_PER_PAGE = 10;

const Footer = () => (
  <footer className="footer">
    Brought by <a href="https://phala.network" target="_blank" rel="noopener noreferrer">Phala</a>
  </footer>
);

const ServerList = () => {
  const [visibleServers, setVisibleServers] = useState(SERVERS_PER_PAGE);
  const servers = Object.entries(serversData);
  
  const loadMore = () => {
    setVisibleServers(prev => Math.min(prev + SERVERS_PER_PAGE, servers.length));
  };

  return (
    <div className="App">
      <header>
        <h1>MCP Hosting in TEE</h1>
        <p className="subtitle">Your privacy is protected and the execution can be verified</p>
        <a 
          href="https://github.com/tolak/mcp-hosting-tee?tab=readme-ov-file#submit-you-server"
          target="_blank"
          rel="noopener noreferrer"
          className="submit-server-button"
        >
          Submit your server
        </a>
      </header>
      <main>
        <div className="server-list">
          {servers.slice(0, visibleServers).map(([name, server]) => (
            <ServerCard
              key={name}
              name={name}
              description={server.description}
              repo={server.repo}
              serverUrl={server.serverUrl}
              explorerUrl={server.explorerUrl}
              config={server.config}
              demoUrl={server.demoUrl}
              transport={server.transport}
            />
          ))}
          {visibleServers < servers.length && (
            <button className="load-more" onClick={loadMore}>
              Load More
            </button>
          )}
        </div>
        <QASection />
      </main>
      <Footer />
    </div>
  );
};

const SingleServer = () => {
  const { serverName } = useParams();
  const originalServerName = Object.keys(serversData).find(
    name => name.toLowerCase().replace(/\s+/g, '-') === serverName
  );
  const server = originalServerName ? serversData[originalServerName] : null;

  if (!server) {
    return (
      <div className="App">
        <div className="not-found">
          <h2>Server not found</h2>
          <a href="/">Return to home</a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <main>
        <ServerCard
          name={originalServerName}
          description={server.description}
          repo={server.repo}
          serverUrl={server.serverUrl}
          explorerUrl={server.explorerUrl}
          config={server.config}
          demoUrl={server.demoUrl}
          transport={server.transport}
        />
      </main>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ServerList />} />
      <Route path="/servers/:serverName" element={<SingleServer />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;