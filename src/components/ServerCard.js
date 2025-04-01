import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ShareIcon,
  CodeBracketIcon,
  DocumentDuplicateIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CheckIcon,
  ArrowLeftIcon,
  PlayCircleIcon
} from '@heroicons/react/24/outline';
import './ServerCard.css';

const ServerCard = ({ 
  name, 
  description, 
  repo, 
  serverUrl, 
  explorerUrl, 
  config,
  demoUrl,
  transport 
}) => {
  const [showConfig, setShowConfig] = useState(false);
  const [showShareLink, setShowShareLink] = useState(false);
  const [showUrlCopyNotification, setShowUrlCopyNotification] = useState(false);
  const [showConfigCopyNotification, setShowConfigCopyNotification] = useState(false);
  const [showShareCopyNotification, setShowShareCopyNotification] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/servers/');

  const handleCopyWithNotification = async (text, setNotification) => {
    try {
      await navigator.clipboard.writeText(text);
      setNotification(true);
      setTimeout(() => setNotification(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyUrl = (e) => {
    e.stopPropagation();
    handleCopyWithNotification(serverUrl, setShowUrlCopyNotification);
  };

  const handleCopyConfig = (e) => {
    e.stopPropagation();
    handleCopyWithNotification(JSON.stringify(config, null, 2), setShowConfigCopyNotification);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    setShowShareLink(!showShareLink);
  };

  const handleCopyShareLink = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/servers/${name.replace(/\s+/g, '-').toLowerCase()}`;
    handleCopyWithNotification(shareUrl, setShowShareCopyNotification);
    setShowShareLink(false);
  };

  const handleCardClick = () => {
    if (!isDetailPage) {
      navigate(`/servers/${name.replace(/\s+/g, '-').toLowerCase()}`);
    }
  };

  const handleConfigToggle = (e) => {
    e.stopPropagation();
    setShowConfig(!showConfig);
  };

  return (
    <div className={`server-card ${!isDetailPage ? 'clickable' : ''}`} onClick={handleCardClick}>
      {isDetailPage && (
        <button 
          className="back-button"
          onClick={(e) => {
            e.stopPropagation();
            navigate('/');
          }}
        >
          <ArrowLeftIcon className="button-icon" />
          Back to Home
        </button>
      )}
      
      <div className="card-header">
        <div className="title-container">
          <h2>{name}</h2>
          {transport && (
            <span className="transport-tag">
              {transport.toUpperCase()}
            </span>
          )}
        </div>
        <div className="header-actions" onClick={e => e.stopPropagation()}>
          <button 
            className="action-button"
            onClick={(e) => {
              e.stopPropagation();
              window.open(repo, '_blank');
            }}
          >
            <CodeBracketIcon className="button-icon" />
            Fork
          </button>
          {demoUrl && (
            <button 
              className="action-button demo-button"
              onClick={(e) => {
                e.stopPropagation();
                window.open(demoUrl, '_blank');
              }}
            >
              <PlayCircleIcon className="button-icon" />
              Demo
            </button>
          )}
          <div className="share-container">
            <button 
              className="action-button"
              onClick={handleShare}
            >
              <ShareIcon className="button-icon" />
              Share
            </button>
            {showShareLink && (
              <button 
                className="share-popup"
                onClick={handleCopyShareLink}
              >
                {showShareCopyNotification ? 'Copied!' : 'Copy share link'}
              </button>
            )}
          </div>
        </div>
      </div>
      
      <p className="description">{description}</p>
      
      <div className="url-container" onClick={e => e.stopPropagation()}>
        <input 
          type="text" 
          value={serverUrl} 
          readOnly 
          className="url-input"
        />
        <button 
          className="copy-button"
          onClick={handleCopyUrl}
        >
          {showUrlCopyNotification ? (
            <>
              <CheckIcon className="button-icon" />
              Copied!
            </>
          ) : (
            'Copy'
          )}
        </button>
        <button 
          className="verify-button"
          onClick={(e) => {
            e.stopPropagation();
            window.open(explorerUrl, '_blank');
          }}
        >
          Verify
        </button>
      </div>

      <div className="config-section" onClick={e => e.stopPropagation()}>
        <button 
          className="config-toggle"
          onClick={handleConfigToggle}
        >
          {showConfig ? <ChevronDownIcon className="toggle-icon" /> : <ChevronRightIcon className="toggle-icon" />}
          Config JSON
        </button>
        
        {showConfig && (
          <div className="config-container">
            <div className="copy-notification">
              {showConfigCopyNotification && <span>Copied!</span>}
            </div>
            <button 
              className="copy-config-button"
              onClick={handleCopyConfig}
              title="Copy config"
            >
              <DocumentDuplicateIcon className="copy-icon" />
            </button>
            <pre className="config-json">
              {JSON.stringify(config, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServerCard;