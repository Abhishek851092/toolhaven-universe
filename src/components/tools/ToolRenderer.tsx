
import React, { useContext, createContext } from 'react';
import Calculator from './Calculator';
import UnitConverter from './UnitConverter';
import DateCalculator from './DateCalculator';
import QrGenerator from './QrGenerator';
import JsonFormatter from './JsonFormatter';
import Base64Encoder from './Base64Encoder';
import PasswordGenerator from './PasswordGenerator';
import ImageCompressor from './ImageCompressor';
import UrlEncoder from './UrlEncoder';
import MarkdownEditor from './MarkdownEditor';
import ColorPicker from './ColorPicker';
import TextCaseConverter from './TextCaseConverter';
import CsvViewer from './CsvViewer';
import RegexTester from './RegexTester';
import HashGenerator from './HashGenerator';
import CharacterCounter from './CharacterCounter';
import PercentageCalculator from './PercentageCalculator';
import NotImplemented from './NotImplemented';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface ToolRendererProps {
  toolId: string;
}

// Create a context for tools management
export const ToolsContext = createContext<{
  toolComponents: Record<string, React.ComponentType>;
}>({
  toolComponents: {},
});

export const useTools = () => useContext(ToolsContext);

// Tools provider component
export const ToolsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Map of tool IDs to their corresponding components
  const toolComponents: Record<string, React.ComponentType> = {
    'calculator': Calculator,
    'unit-converter': UnitConverter,
    'date-calculator': DateCalculator,
    'qr-generator': QrGenerator,
    'json-formatter': JsonFormatter,
    'base64-encoder': Base64Encoder,
    'password-generator': PasswordGenerator,
    'image-compressor': ImageCompressor,
    'url-encoder': UrlEncoder,
    'markdown-editor': MarkdownEditor,
    'color-picker': ColorPicker,
    'text-case-converter': TextCaseConverter,
    'csv-viewer': CsvViewer,
    'regex-tester': RegexTester,
    'hash-generator': HashGenerator,
    'character-counter': CharacterCounter,
    'percentage-calculator': PercentageCalculator,
  };

  return (
    <ToolsContext.Provider value={{ toolComponents }}>
      {children}
    </ToolsContext.Provider>
  );
};

// This component renders the appropriate tool based on the tool ID
const ToolRenderer: React.FC<ToolRendererProps> = ({ toolId }) => {
  const { toast } = useToast();
  const { toolComponents } = useTools();
  
  // Get the component for the specified tool ID
  const ToolComponent = toolComponents[toolId];
  
  // If the tool doesn't exist, show a toast and render the NotImplemented component
  React.useEffect(() => {
    if (!ToolComponent && toolId) {
      toast({
        title: "Tool in development",
        description: "This tool is currently under development and will be available soon.",
        variant: "default",
      });
    }
  }, [toolId, toast, ToolComponent]);
  
  if (!ToolComponent) {
    return <NotImplemented />;
  }
  
  return (
    <div className={cn(
      "tool-renderer-container p-4 md:p-6", 
      "rounded-lg transition-all",
      "dark:bg-gray-900/30 dark:backdrop-blur-sm"
    )}>
      <ToolComponent />
    </div>
  );
};

export default ToolRenderer;
