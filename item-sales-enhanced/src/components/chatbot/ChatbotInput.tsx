import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, X, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

interface ChatbotInputProps {
  onSendMessage: (message: string, files?: File[]) => void;
  isLoading?: boolean;
  isTyping?: boolean;
  placeholder?: string;
  disabled?: boolean;
  maxFileSize?: number;
  acceptedFileTypes?: string[];
}

export function ChatbotInput({ 
  onSendMessage, 
  isLoading = false,
  isTyping = false,
  placeholder = "Type your message...",
  disabled = false,
  maxFileSize = 50 * 1024 * 1024, // 50MB
  acceptedFileTypes = ['.txt', '.pdf', '.doc', '.docx', '.md', '.json', '.csv', '.js', '.ts', '.py', '.html', '.css', '.jpg', '.jpeg', '.png', '.gif', '.svg']
}: ChatbotInputProps) {
  const [message, setMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((message.trim() || attachedFiles.length > 0) && !isLoading && !isTyping && !disabled) {
      onSendMessage(message.trim(), attachedFiles);
      setMessage('');
      setAttachedFiles([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addFiles(files);
  };

  const addFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      if (file.size > maxFileSize) {
        alert(`File "${file.name}" is too large. Maximum size is ${maxFileSize / (1024 * 1024)}MB.`);
        return false;
      }
      return true;
    });

    setAttachedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="border-t bg-white">
      {/* Attached Files */}
      {attachedFiles.length > 0 && (
        <div className="px-4 py-2 border-b border-gray-100">
          <div className="flex flex-wrap gap-2">
            {attachedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                <Paperclip className="h-3 w-3" />
                <span className="truncate max-w-32">{file.name}</span>
                <span className="text-xs text-blue-500">({formatFileSize(file.size)})</span>
                <button
                  onClick={() => removeFile(index)}
                  className="hover:bg-blue-100 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4">
        <div 
          className={cn(
            "flex-1 relative",
            isDragOver && "ring-2 ring-blue-500 ring-opacity-50 rounded-lg"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isLoading || isTyping}
            className={cn(
              "w-full resize-none rounded-lg border border-gray-300 px-4 py-3 pr-12",
              "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
              "disabled:bg-gray-50 disabled:text-gray-500",
              "min-h-[48px] max-h-32 overflow-y-auto",
              isDragOver && "border-blue-500 bg-blue-50/50"
            )}
            rows={1}
          />
          
          {isDragOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-blue-50/80 rounded-lg border-2 border-dashed border-blue-300">
              <div className="text-blue-600 text-sm font-medium">
                Drop files here to attach
              </div>
            </div>
          )}
        </div>

        {/* File Upload Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isLoading || isTyping}
          className="h-12 px-3"
          title="Attach files"
        >
          <Paperclip className="h-4 w-4" />
        </Button>

        {/* Send Button */}
        <Button
          type="submit"
          disabled={(!message.trim() && attachedFiles.length === 0) || isLoading || isTyping || disabled}
          size="sm"
          className="h-12 px-4"
        >
          {isLoading || isTyping ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFileTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />
      </form>

      {/* Status Indicator */}
      {isTyping && (
        <div className="px-4 pb-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span>AI is thinking...</span>
          </div>
        </div>
      )}
    </div>
  );
}
