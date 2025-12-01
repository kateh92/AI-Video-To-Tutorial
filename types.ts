export enum AIModel {
  GEMINI_FLASH = 'gemini-2.5-flash',
  GEMINI_PRO = 'gemini-3-pro-preview',
  // In a real app with multiple API keys, these would map to different provider SDKs.
  // For this demo, we map these UI options to Gemini models with different personas/configs.
  CHATGPT_4O = 'chatgpt-4o-simulated',
  DEEPSEEK_R1 = 'deepseek-r1-simulated',
  QWEN_MAX = 'qwen-max-simulated',
  DOUBAO_PRO = 'doubao-pro-simulated'
}

export interface GenerationConfig {
  model: AIModel;
  prompt: string;
}

export interface TutorialState {
  transcript: string;
  markdownContent: string;
  isGenerating: boolean;
  error: string | null;
}

export const DEFAULT_PROMPT = `你是一位专业的技术文档撰写专家。请将提供的视频文字稿整理成一份清晰、易于执行的分步教程。

请严格按照以下结构组织内容：

# [教程标题]

## 1. 目标
简要说明本教程要解决的问题或达到的效果。

## 2. 准备工作
列出所需的工具、环境、依赖或前置知识。

## 3. 详细步骤
- **步骤 1**：[步骤名称]
  - 详细说明...
  - 代码/命令（如有）...
- **步骤 2**：[步骤名称]
  - 详细说明...

## 4. 测试与验证
如何确认步骤执行成功。

## 5. 注意事项
常见的坑、警告或优化建议。

---
要求：
- 使用 Markdown 格式。
- 语言简洁、专业、通俗易懂。
- 自动优化排版，适当使用加粗、列表和代码块。
- 如果文字稿中有不清楚的地方，请根据上下文合理推断或标注。
`;
