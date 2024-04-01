import  { FC } from 'react';
import { Button } from '../../shared/ui/Button';
import { Card } from '../../shared/ui/Card';
import { COLORS_BORDER } from '../../shared/ui/colors';
import { Typography } from '../../shared/ui/Typography';
import { useNavigate } from '@tanstack/react-router';
import { useNotes } from './store/NotesProvider';

interface Props {

}

export const NoteList: FC<Props> = function NoteList() {
  const navigate = useNavigate()
  
  const { data } = useNotes();

  const list = data.map((item) => (
    <li className='w-full' key={item.id.toString()}>
        <Card className={`${COLORS_BORDER.secondary100} border-2`}>
            <Typography size={20} weight={600}>
                {item.title}
            </Typography>
            <Typography size={16}>{item.description}</Typography>
        </Card>

        <Button mode={'dark'} onClick={() => {
            navigate({
                to: `/notes/edit/$noteId`,
                params: { noteId: item.id.toString() },
            })
        }}>
            {"Редактировать"}
        </Button>
    </li>
  ))

  return (
    <div className='gap-6'>
        <Button onClick={() => navigate({to: "/notes/add"})}>{"+"}</Button>
        <ul className='flex gap-4 flex-wrap'>{list}</ul>
    </div>
  )
};