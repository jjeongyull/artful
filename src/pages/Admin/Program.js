import React, { useEffect, useState } from 'react';
import {
  Button, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Box
} from '@mui/material';
import ProgramDialog from './ProgramDialog';
import { supabase } from '../../lib/supabaseClient';

function Program() {
  const [programs, setPrograms] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [title, setTitle] = useState('');
  const [type, setType] = useState(0);
  const [content, setContent] = useState('');

  const fetchPrograms = async () => {
    const { data, error } = await supabase.from('program').select('*').order('id');
    if (!error) setPrograms(data);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleOpen = (item = null) => {
    if (item) {
     setCurrentId(item.id);
     setTitle(item.title);
     setType(item.type);
     setContent(item.info);
    } else {
     setCurrentId(null);
     setTitle('');
     setType(0)
     setContent('');
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    if (!title.trim()) return alert('제목을 입력하세요.');

    if (currentId) {
      await supabase.from('program').update({ title, info: content, type }).eq('id', currentId);
    } else {
      await supabase.from('program').insert([{ title, info: content, type }]);
    }

    await fetchPrograms();
    handleClose();
  };

  const handleDelete = async (id) => {
    if (window.confirm('삭제하시겠습니까?')) {
      await supabase.from('program').delete().eq('id', id);
      await fetchPrograms();
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" onClick={() => handleOpen()}>+ 프로그램 추가</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>타입</TableCell>
              <TableCell align="right">작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {programs.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.type === 0? '기본' : '특별'}</TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => handleOpen(row)}>수정</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(row.id)}>삭제</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ProgramDialog
       open={open}
       handleClose={handleClose}
       handleSave={handleSave}
       title={title}
       type={type}
       setTitle={setTitle}
       setType={setType}
       content={content}
       setContent={setContent}
      />
    </Box>
  );
}

export default Program;
