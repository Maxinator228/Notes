import { createFileRoute } from "@tanstack/react-router";
import { NoteForm } from "../../pages/notes/NoteForm";
import { useNotes } from "../../pages/notes/store/NotesProvider";
import { Typography } from "@mui/material";



export const Route = createFileRoute("/notes/edit/$noteId")({
    component: NotesFormRoute,
    staticData: {
        title: "Редактировать заметку",
    }
});

function NotesFormRoute(){
    const { noteId } = Route.useParams();

    const { data } = useNotes();

    const note = data.find((item) => item.id === Number(noteId));

    if (!note) {
        return <Typography align={'center'}>{"Заметки не существует"}</Typography>
    }

    return <NoteForm note={note} />
}