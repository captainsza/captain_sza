/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { PROMPT } from '../constants';
import { TerminalCommand } from '../types';
import ContactForm from './ContactForm';

interface TerminalBodyProps {
  terminalHistory: TerminalCommand[];
  showContactForm: boolean;
  currentCommand: string;
  showCursor: boolean;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setCurrentCommand: (command: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  formData: any;
  setFormData: (data: any) => void;
  errors: any;
  isSubmitting: boolean;
  setShowContactForm: (show: boolean) => void;
}

const TerminalBody: React.FC<TerminalBodyProps> = ({
  terminalHistory,
  showContactForm,
  currentCommand,
  showCursor,
  handleKeyPress,
  setCurrentCommand,
  handleSubmit,
  formData,
  setFormData,
  errors,
  isSubmitting,
  setShowContactForm,
}) => {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-2 font-mono text-sm">
      <div className="text-green-400 mb-4 animate-pulse">
        Welcome to Contact Terminal v1.0.0
        <br />
        Type &apos;help&apos; for available commands.
      </div>

      {terminalHistory.map((entry, i) => (
        <div key={i} className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-blue-400">{entry.timestamp}</span>
            <span className="text-purple-400">{PROMPT}</span>
            <span className="text-gray-300">{entry.command}</span>
          </div>
          <pre className={`whitespace-pre-wrap pl-4 ${entry.isError ? 'text-red-400' : 'text-green-400'}`}>
            {entry.output}
          </pre>
        </div>
      ))}

      {showContactForm ? (
        <ContactForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => setShowContactForm(false)}
        />
      ) : (
        <div className="flex items-center space-x-2">
          <span className="text-blue-400">{new Date().toLocaleTimeString()}</span>
          <span className="text-purple-400">{PROMPT}</span>
          <input
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent text-gray-300 outline-none"
            spellCheck={false}
          />
          <span className={`w-2 h-5 bg-gray-300 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`} />
        </div>
      )}
    </div>
  );
};

export default TerminalBody;
