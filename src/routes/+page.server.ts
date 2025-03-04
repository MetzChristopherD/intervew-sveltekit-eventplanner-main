import { deleteEventById, fetchAllEvents } from '$lib/server/remote-events';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const loadedEvents = (await fetchAllEvents()).sort((a,b) => { 
        const dateA = new Date(a.date.toString());
        const dateB = new Date(b.date.toString());
        return dateA.getTime() - dateB.getTime();
    });
    return {
        events: loadedEvents
    }
};

export const actions: Actions = {
    delete: async ({request}) => {
        const formdata = await request.formData();
        const id:number = parseInt(formdata.get('id')?.toString() ?? '0');
        const response = await deleteEventById(id);
        return {
            success: true,
            streamed: {
                response
            }
        }
    }
}
