import { createFileRoute } from "@tanstack/react-router";
import { NoteList } from "../pages/notes/NoteList";


export const Route = createFileRoute("/")({
    component: MainRoute,
    staticData: {
        title: "Список заметок",
    },
});

function MainRoute(){
    return <NoteList />
}
