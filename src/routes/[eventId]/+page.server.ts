import { fetchEventById, updateEventById } from "$lib/server/remote-events";
import type { PageServerLoad, Actions } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({params}) => {
    const eventId = parseInt(params.eventId);
    const event = await fetchEventById(eventId);
    return {
        event
    }
}

export const actions: Actions = {
    default: async ({request}) => {
        const formdata = await request.formData();
        
        const id:number = parseInt(formdata.get('id')?.toString() ?? '0');
        console.log("id: " + id);
        console.log(formdata);
        const title = formdata.get('title')?.toString();
        const description = formdata.get('description')?.toString();
        const date = formdata.get('date')?.toString();
        if (!title || !date) {
            error(400, 'Title and Date are required');
        }
        const newEvent = await updateEventById(id, {title, description, date});
        return {
            success: true,
            streamed: {
                newEvent
            }
        }
    }
}