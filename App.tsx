import React, { useState } from 'react';
import { AIModel, DEFAULT_PROMPT, TutorialState } from './types';
import { generateTutorialContent } from './services/geminiService';
import ConfigPanel from './components/ConfigPanel';
import MarkdownPreview from './components/MarkdownPreview';
import { Sparkles, Video, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [model, setModel] = useState<AIModel>(AIModel.GEMINI_FLASH);
  const [prompt, setPrompt] = useState<string>(DEFAULT_PROMPT);
  
  const [state, setState] = useState<TutorialState>({
    transcript: '',
    markdownContent: '',
    isGenerating: false,
    error: null,
  });

  const handleTranscriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(prev => ({ ...prev, transcript: e.target.value }));
  };

  const handleGenerate = async () => {
    if (!state.transcript.trim()) {
      setState(prev => ({ ...prev, error: "请先输入视频文字稿内容。" }));
      return;
    }

    setState(prev => ({ ...prev, isGenerating: true, error: null, markdownContent: '' }));

    try {
      const result = await generateTutorialContent(state.transcript, model, prompt);
      setState(prev => ({ ...prev, isGenerating: false, markdownContent: result }));
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        isGenerating: false, 
        error: err.message || "生成失败，请检查网络或稍后重试。" 
      }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">AI 视频教程生成器</h1>
          </div>
          <div className="text-sm text-slate-500 hidden sm:block">
            视频转文字 → 智能整理 → PDF 导出
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)] min-h-[600px]">
          
          {/* Left Column: Input & Config */}
          <div className="lg:col-span-4 flex flex-col gap-6 h-full overflow-hidden">
            
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col flex-1 min-h-0">
              <div className="flex items-center gap-2 mb-4 text-indigo-600">
                <Video className="w-5 h-5" />
                <h2 className="font-semibold text-lg">输入视频文字稿</h2>
              </div>
              <textarea
                className="w-full flex-1 p-3 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
                placeholder="在此粘贴视频的字幕或文字稿内容..."
                value={state.transcript}
                onChange={handleTranscriptChange}
              />
              <div className="mt-4">
                 <button
                  onClick={handleGenerate}
                  disabled={state.isGenerating || !state.transcript.trim()}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all flex items-center justify-center gap-2
                    ${state.isGenerating || !state.transcript.trim() 
                      ? 'bg-slate-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5'
                    }`}
                >
                  {state.isGenerating ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      开始生成教程
                    </>
                  )}
                </button>
              </div>
              {state.error && (
                <div className="mt-3 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{state.error}</span>
                </div>
              )}
            </div>

            {/* Config Section (Bottom Left) */}
            <div className="h-1/3 min-h-[250px]">
              <ConfigPanel
                model={model}
                setModel={setModel}
                prompt={prompt}
                setPrompt={setPrompt}
                defaultPrompt={DEFAULT_PROMPT}
              />
            </div>
          </div>

          {/* Right Column: Preview & Output */}
          <div className="lg:col-span-8 h-full min-h-0">
            <MarkdownPreview 
              content={state.markdownContent} 
              isLoading={state.isGenerating} 
            />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
