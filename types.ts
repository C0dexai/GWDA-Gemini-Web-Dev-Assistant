export interface Language {
  id: string;
  name: string;
}

export interface AIPersona {
  name: string;
  role: string;
  persona: {
    description: string;
    tone: string;
  };
  superpowers: string[];
}
