import React, { useEffect } from 'react';
import {
 Dialog, DialogTitle, DialogContent, DialogActions,
 TextField, Button, Stack, IconButton,
 FormControl, FormLabel, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FormatBold, FormatItalic, StrikethroughS, Undo, Redo } from '@mui/icons-material';

function ProgramDialog({ open, handleClose, handleSave, title, type, setTitle, setType, content, setContent }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '',
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && open) {
      editor.commands.setContent(content || '');
    }
  }, [editor, content, open]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>프로그램 {title ? '수정' : '추가'}</DialogTitle>
    <DialogContent dividers>
      {/* 🔘 프로그램 타입 라디오 버튼 */}
      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend">프로그램 타입</FormLabel>
        <RadioGroup
          row
          value={type.toString()}
          onChange={(e) => setType(parseInt(e.target.value))}
        >
          <FormControlLabel value="0" control={<Radio />} label="기본" />
          <FormControlLabel value="1" control={<Radio />} label="특별" />
        </RadioGroup>
     </FormControl>
     
        <TextField
          fullWidth
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />

        {/* 🔧 에디터 툴바 */}
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <IconButton onClick={() => editor?.chain().focus().toggleBold().run()} color={editor?.isActive('bold') ? 'primary' : 'default'}>
            <FormatBold />
          </IconButton>
          <IconButton onClick={() => editor?.chain().focus().toggleItalic().run()} color={editor?.isActive('italic') ? 'primary' : 'default'}>
            <FormatItalic />
          </IconButton>
          <IconButton onClick={() => editor?.chain().focus().toggleStrike().run()} color={editor?.isActive('strike') ? 'primary' : 'default'}>
            <StrikethroughS />
          </IconButton>
          <IconButton onClick={() => editor?.chain().focus().undo().run()}>
            <Undo />
          </IconButton>
          <IconButton onClick={() => editor?.chain().focus().redo().run()}>
            <Redo />
          </IconButton>
        </Stack>

        {/* 에디터 영역 */}
        <div style={{
          border: '1px solid #ccc',
          borderRadius: '6px',
          padding: '12px',
          minHeight: '200px',
          cursor: 'text'
        }}>
          {editor && <EditorContent editor={editor} />}
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSave}>저장</Button>
        <Button onClick={handleClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProgramDialog;
