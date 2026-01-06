import { useCallback, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Link as LinkIcon,
  Undo,
  Redo,
  Code,
  Quote,
  Type,
  Heading1,
  Heading2,
  Sparkles,
} from 'lucide-react'

interface NotePadProps {
  content: string
  setContent: (html: string) => void
  setJson: (json: any) => void
}

const MenuBar = ({ editor }: { editor: any }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    if (url === null) return
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({
        href: url,
      })
      .run()
  }, [editor])

  if (!editor) return null

  return (
    <div className="sticky top-0 z-20 bg-gradient-to-br from-gray-900 to-gray-800 border-b border-purple-500/20 backdrop-blur-xl">
      {/* Top Section - Main Controls */}
      <div className="p-2 flex flex-wrap items-center gap-2">
        {/* Text Formatting Group */}
        <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-purple-500/20">
          <ToolButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            icon={<Bold className="w-4 h-4" />}
            title="Bold"
            shortcut="⌘B"
          />
          <ToolButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            icon={<Italic className="w-4 h-4" />}
            title="Italic"
            shortcut="⌘I"
          />
          <ToolButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            icon={<UnderlineIcon className="w-4 h-4" />}
            title="Underline"
            shortcut="⌘U"
          />
          <ToolButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            icon={<Strikethrough className="w-4 h-4" />}
            title="Strikethrough"
          />
        </div>

        <div className="w-px h-8 bg-purple-500/20"></div>

        {/* Headings Group */}
        <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-purple-500/20">
          <ToolButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive('heading', { level: 1 })}
            icon={<Heading1 className="w-4 h-4" />}
            title="Heading 1"
          />
          <ToolButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive('heading', { level: 2 })}
            icon={<Heading2 className="w-4 h-4" />}
            title="Heading 2"
          />
        </div>

        <div className="w-px h-8 bg-purple-500/20"></div>

        {/* Lists Group */}
        <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-purple-500/20">
          <ToolButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            icon={<List className="w-4 h-4" />}
            title="Bullet List"
          />
          <ToolButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            icon={<ListOrdered className="w-4 h-4" />}
            title="Numbered List"
          />
        </div>

        <div className="w-px h-8 bg-purple-500/20"></div>

        {/* Special Formatting Group */}
        <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-purple-500/20">
          <ToolButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            icon={<Code className="w-4 h-4" />}
            title="Inline Code"
          />
          <ToolButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            icon={<Quote className="w-4 h-4" />}
            title="Quote"
          />
          <ToolButton
            onClick={setLink}
            isActive={editor.isActive('link')}
            icon={<LinkIcon className="w-4 h-4" />}
            title="Add Link"
          />
        </div>

        <div className="flex-grow"></div>

        {/* History Group */}
        <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-purple-500/20">
          <ToolButton
            onClick={() => editor.chain().focus().undo().run()}
            isActive={false}
            icon={<Undo className="w-4 h-4" />}
            title="Undo"
            shortcut="⌘Z"
          />
          <ToolButton
            onClick={() => editor.chain().focus().redo().run()}
            isActive={false}
            icon={<Redo className="w-4 h-4" />}
            title="Redo"
            shortcut="⌘⇧Z"
          />
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="px-4 py-2 bg-black/30 border-t border-purple-500/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4 text-gray-500">
          <div className="flex items-center gap-2">
            <Type className="w-3.5 h-3.5" />
            <span>Rich Text Editor</span>
          </div>
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          <span>Press / for commands</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Auto-save enabled</span>
        </div>
      </div>
    </div>
  )
}

const ToolButton = ({ onClick, isActive, icon, title, shortcut }: any) => (
  <button
    onClick={onClick}
    className={`group relative p-2 rounded-lg transition-all duration-300 ${
      isActive
        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
        : 'text-gray-400 hover:text-white hover:bg-gray-700 hover:scale-110'
    }`}
    title={title}
  >
    {icon}
    {isActive && (
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-50 -z-10"></div>
    )}
    {shortcut && (
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {shortcut}
      </div>
    )}
  </button>
)

const NotePad = ({ content, setContent, setJson }: NotePadProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '✨ Start typing your brilliant ideas here...',
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
      }),
      Underline,
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          'prose prose-lg prose-invert max-w-none px-8 py-6 focus:outline-none min-h-[500px] text-gray-200 prose-headings:text-white prose-headings:font-black prose-h1:text-4xl prose-h1:mb-6 prose-h2:text-3xl prose-h2:mb-4 prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-pink-400 prose-strong:text-white prose-strong:font-bold prose-code:text-purple-300 prose-code:bg-purple-500/20 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-blockquote:border-l-purple-500 prose-blockquote:border-l-4 prose-blockquote:bg-purple-500/10 prose-blockquote:py-2 prose-blockquote:pl-4 prose-ul:text-gray-300 prose-ol:text-gray-300',
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
      setJson(editor.getJSON())
    },
  })

  useEffect(() => {
    if (editor && content) {
      if (editor.getHTML() !== content) {
        editor.commands.setContent(content)
      }
    }
  }, [content, editor])

  return (
    <div className="relative group">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500"></div>

      {/* Editor Container */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl border border-purple-500/20 overflow-hidden min-h-[600px] flex flex-col backdrop-blur-sm">
        <MenuBar editor={editor} />
        
        {/* Editor Content Area */}
        <div
          className="flex-1 cursor-text overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-gray-800"
          onClick={() => editor?.chain().focus().run()}
        >
          <EditorContent editor={editor} />
        </div>

        {/* Bottom Status Bar */}
        <div className="bg-black/30 border-t border-purple-500/10 px-6 py-3 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span>
              {editor?.storage.characterCount?.characters() || 0} characters
            </span>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <span>
              {editor?.storage.characterCount?.words() || 0} words
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Saved</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Custom scrollbar styles
const style = document.createElement('style')
style.textContent = `
  .scrollbar-thin::-webkit-scrollbar {
    width: 8px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgba(168, 85, 247, 0.3);
    border-radius: 4px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: rgba(168, 85, 247, 0.5);
  }

  .ProseMirror p.is-editor-empty:first-child::before {
    color: rgb(107, 114, 128);
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
`
document.head.appendChild(style)

export default NotePad