import { Portal, TextField } from '@mui/material';
import  { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../shared/ui/Button';
import { useNotes } from './store/NotesProvider';
import { useRouter } from '@tanstack/react-router';
import { Note } from './model/Note';


interface Props {
  note?: Note;
}

type Form = {
  title: string;
  description: string;
};


export const NoteForm: FC<Props> = function NoteForm(props) {
  const { addNote,updateNote } = useNotes();
  const { history } = useRouter();
  const {handleSubmit, control, formState: {isValid} } = useForm<Form>({
    defaultValues: {
      title: props.note?.title ?? "",
      description: props.note?.description ?? ""
    }
  });

  

  return (
    <form className='gap-6 flex flex-col pt-4' onSubmit={handleSubmit((form) => {
      if(props.note){
        updateNote({ id: props.note.id, ...form});
      } else {
        addNote(form)
      }

      history.back();
    })}>
      <Controller 
      name='title' 
      control={control} 
      rules={{
        required: 'Title is required',
        validate: (value) => value.length > 5 || "Минимум 6 символов"
      }} 
      render={({field, fieldState: {error}})=> (
        <TextField {...field} error={Boolean(error?.message)} helperText={error?.message} label={"Заголовок"} fullWidth={true} variant={"outlined"}/>
      )}/>
      
      <Controller 
      name='description' 
      control={control} 
      rules={{
        required: 'Title is required',
        validate: (value) => value.length > 5 || "Минимум 6 символов"
      }} 
      render={({field, fieldState: {error}})=> (
        <TextField {...field} error={Boolean(error?.message)} helperText={error?.message} label={"Описание"} fullWidth={true} multiline={true} maxRows={4}/>
      )}/>
      <Button disabled={!isValid} type='submit'>{props.note ? "Сохранить" : "Добавить"}</Button>
    </form>
  ) 
};