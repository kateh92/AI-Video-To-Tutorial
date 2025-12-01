import React from 'react';
import { Settings, Edit3, ChevronDown, Cpu } from 'lucide-react';
import { AIModel } from '../types';

interface ConfigPanelProps {
  model: AIModel;
  setModel: (m: AIModel) => void;
  prompt: string;
  setPrompt: (p: string) => void;
  defaultPrompt: string;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({
  model,
  setModel,
  prompt,
  setPrompt,
  defaultPrompt
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4 text-indigo-600">
        <Settings className="w-5 h-5" />
        <h2 className="font-semibold text-lg">配置生成选项</h2>
      </div>

      {/* Model Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
          <Cpu className="w-4 h-4" />
          选择 AI 模型
        </label>
        <div className="relative">
          <select
            value={model}
            onChange={(e) => setModel(e.target.value as AIModel)}
            className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-3 pr-8 transition-colors"
          >
            <option value={AIModel.GEMINI_FLASH}>Google Gemini 2.5 Flash (推荐/快速)</option>
            <option value={AIModel.GEMINI_PRO}>Google Gemini 3.0 Pro (高智商)</option>
            <option disabled>--- 其他模型 (模拟) ---</option>
            <option value={AIModel.CHATGPT_4O}>ChatGPT-4o (Simulated)</option>
            <option value={AIModel.DEEPSEEK_R1}>Deepseek-R1 (Simulated)</option>
            <option value={AIModel.QWEN_MAX}>通义千问 Qwen (Simulated)</option>
            <option value={AIModel.DOUBAO_PRO}>字节豆包 Doubao (Simulated)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          注：本演示环境统一使用 Gemini API 提供底层算力支持。
        </p>
      </div>

      {/* Prompt Editor */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
            <Edit3 className="w-4 h-4" />
            系统提示词 (Prompt)
          </label>
          <button
            onClick={() => setPrompt(defaultPrompt)}
            className="text-xs text-indigo-600 hover:text-indigo-800 underline"
          >
            恢复默认
          </button>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full flex-1 min-h-[200px] bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-3 font-mono resize-none"
          placeholder="在此输入自定义提示词..."
        />
        <p className="text-xs text-slate-500 mt-2">
          您可以根据特定需求修改生成的结构或语气。
        </p>
      </div>
    </div>
  );
};

export default ConfigPanel;
