/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { FaTwitter, FaLinkedin, FaFacebook, FaLink } from 'react-icons/fa';

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({ title, url, description }) => {
  // Encode components for sharing
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedDescription = description ? encodeURIComponent(description) : '';
  
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  return (
    <div className="flex space-x-4 items-center">
      <h3 className="text-sm font-medium mr-2">Share:</h3>
      
      <a 
        href={twitterUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-600 transition-colors"
        aria-label="Share on Twitter"
      >
        <FaTwitter size={20} />
      </a>
      
      <a 
        href={linkedinUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-700 hover:text-blue-900 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin size={20} />
      </a>
      
      <a 
        href={facebookUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 transition-colors"
        aria-label="Share on Facebook"
      >
        <FaFacebook size={20} />
      </a>
      
      <button
        onClick={copyToClipboard}
        className="text-gray-600 hover:text-gray-800 transition-colors"
        aria-label="Copy link"
      >
        <FaLink size={18} />
      </button>
    </div>
  );
};
