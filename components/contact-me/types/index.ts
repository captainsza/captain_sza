export type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type FormErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export type TerminalCommand = {
  command: string;
  output: string;
  isError?: boolean;
  timestamp: string;
};

export type SocialLink = {
  icon: React.ReactNode;
  label: string;
  url: string;
  color: string;
};

export type QuickAction = {
  icon: React.ReactNode;
  label: string;
  command: string;
  color: string;
};
