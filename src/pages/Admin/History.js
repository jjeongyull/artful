import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Paper
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { supabase } from '../../lib/supabaseClient';

function History() {
 const [historyList, setHistoryList] = useState([]);
 const [open, setOpen] = useState(false);
 const [editItem, setEditItem] = useState(null);
 const [infoText, setInfoText] = useState('');

 // 연혁 데이터 불러오기
 const fetchHistory = async () => {
   const { data, error } = await supabase.from('history').select('*').order('id', { ascending: true });
   if (!error) setHistoryList(data);
 };

 useEffect(() => {
   fetchHistory();
 }, []);

 const handleOpen = (item = null) => {
   setEditItem(item);
   setInfoText(item ? item.info : '');
   setOpen(true);
 };

 const handleClose = () => {
   setOpen(false);
   setEditItem(null);
   setInfoText('');
 };

 const handleSave = async () => {
   if (editItem) {
     // 수정
     await supabase.from('history').update({ info: infoText }).eq('id', editItem.id);
   } else {
     // 추가
     await supabase.from('history').insert({ info: infoText });
   }
   handleClose();
   fetchHistory();
 };

 const handleDelete = async (id) => {
   if (window.confirm('정말 삭제하시겠습니까?')) {
     await supabase.from('history').delete().eq('id', id);
     fetchHistory();
   }
 };

 return (
   <Box>
     <Typography variant="h5" sx={{ mb: 2 }}>
       연혁 관리
     </Typography>

     <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
       연혁 추가
     </Button>

     <Paper sx={{ mt: 3 }}>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell width="80">번호</TableCell>
             <TableCell>내용</TableCell>
             <TableCell align="right">관리</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {historyList.map((item) => (
             <TableRow key={item.id}>
               <TableCell>{item.id}</TableCell>
               <TableCell>{item.info}</TableCell>
               <TableCell align="right">
                 <IconButton onClick={() => handleOpen(item)}><Edit /></IconButton>
                 <IconButton onClick={() => handleDelete(item.id)}><Delete color="error" /></IconButton>
               </TableCell>
             </TableRow>
           ))}
           {historyList.length === 0 && (
             <TableRow>
               <TableCell colSpan={3} align="center">데이터가 없습니다.</TableCell>
             </TableRow>
           )}
         </TableBody>
       </Table>
     </Paper>

     {/* 팝업 Dialog */}
     <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
       <DialogTitle>{editItem ? '연혁 수정' : '연혁 추가'}</DialogTitle>
       <DialogContent>
         <TextField
           autoFocus
           margin="dense"
           label="내용"
           fullWidth
           value={infoText}
           onChange={(e) => setInfoText(e.target.value)}
         />
    </DialogContent>
    <DialogActions>
         <Button variant="contained" onClick={handleSave}>
           {editItem ? '수정' : '추가'}
         </Button>
         <Button onClick={handleClose}>취소</Button>
       </DialogActions>
     </Dialog>
   </Box>
 );
}

export default History;