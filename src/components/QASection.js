import React from 'react';
import './QASection.css';

const QASection = () => {
  const qaItems = [
    {
      question: 'What is MCP?',
      answer: 'MCP (Model Context Protocol) is a standardized protocol that enables AI agents to interact with external tools and services in a secure and verifiable way. It provides a unified interface for AI models to access various capabilities like web browsing, file operations, and external APIs, while maintaining security and auditability.'
    },
    {
      question: 'Why MCP server should host in TEE?',
      answer: 'MCP servers should be hosted in TEE (Trusted Execution Environment) for several critical reasons:\n\n' +
        '• Privacy Protection: TEE ensures that sensitive data and computations are encrypted and isolated from the rest of the system, even from the cloud provider.\n\n' +
        '• Verifiable Execution: Every computation in TEE can be cryptographically verified, ensuring that the code runs exactly as intended without tampering.\n\n' +
        '• Secure Communication: TEE provides end-to-end encryption for data in transit and at rest, protecting against man-in-the-middle attacks.\n\n' +
        '• Trust Minimization: By using TEE, users don\'t need to trust the server operators or cloud providers, as the execution environment is cryptographically secured.'
    }
  ];

  return (
    <section className="qa-section">
      <h2>Frequently Asked Questions</h2>
      <div className="qa-list">
        {qaItems.map((item, index) => (
          <div key={index} className="qa-item">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QASection;