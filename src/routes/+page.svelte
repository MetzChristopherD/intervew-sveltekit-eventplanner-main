<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { Stretch } from 'svelte-loading-spinners';
	import { goto } from '$app/navigation';
	import type { CalendarOptions } from 'svelte-fullcalendar';
	import FullCalendar from 'svelte-fullcalendar';
	import daygridPlugin from '@fullcalendar/daygrid';
	import interactionPlugin from '@fullcalendar/interaction';
	import type { Event } from '$lib/server/remote-events';
	import Modal from '../components/Modal.svelte';

	let { data }: { data: PageData } = $props();

	let eventsLoading = $state(false);
	let showModal = $state(false);
	let modalLoading = $state(false);
	let selectedEvent = $state<Event>();
	let handleEventClick = (info: any) => {
		console.log('clicked');
		selectedEvent = data.events.find((x) => x.id === parseInt(info.event.id));
		showModal = true;
	};
	let options: CalendarOptions = $state({
		eventClick: handleEventClick,
		initialView: 'dayGridMonth',
		events: data.events.map((x) => ({
			id: x.id.toString(),
			title: `${x.title} - ${x.description}`,
			date: x.date
		})),
		plugins: [daygridPlugin, interactionPlugin]
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p style="text-align:center">
	Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
</p>

<h2 class="text-xl">Events</h2>
<div style="text-align: center; margin-bottom: 15px">
	<a class="btn" href="/newevent" style="color:blue; border:solid black" role="button">Add Event</a>
</div>
{#if eventsLoading}
	<p style="text-align: center">
		<Stretch size="60" color="#FF3E00" unit="px" duration="1s" /> Loading
	</p>
{:else if !eventsLoading}
	<FullCalendar {options} />
	{#if showModal && selectedEvent}
		<Modal bind:showModal>
			{#snippet header()}
				<h3 class="text-lg font-bold">{selectedEvent?.id}: {selectedEvent?.title}</h3>
			{/snippet}
			<p style="padding-top:5px;">{selectedEvent.description}</p>
			<p style="padding-top:5px; padding-bottom:15px">
				{new Date(selectedEvent.date).toLocaleString()}
			</p>
			<div class="row">
				<div class="col-md-12">
					{#if modalLoading}
						<p style="text-align: center">
							<Stretch size="60" color="#FF3E00" unit="px" duration="1s" /> Loading
						</p>
					{:else if !modalLoading}
						<div style="float: right">
							<form
								action="?/delete"
								method="POST"
								use:enhance={() => {
									eventsLoading = true;
									return ({ update, result }) => {
										update({ invalidateAll: true }).finally(async () => {
											if (result.type === 'success') {
												eventsLoading = false;
												showModal = false;
												options = {
													eventClick: handleEventClick,
													initialView: 'dayGridMonth',
													events: data.events.map((x) => ({
														id: x.id.toString(),
														title: `${x.title} - ${x.description}`,
														date: x.date
													})),
													plugins: [daygridPlugin, interactionPlugin]
												};
											}
										});
									};
								}}
							>
								<input type="hidden" name="id" value={selectedEvent.id} />
								<div style="display: flex; align-items: center; ">
									<button class="delete-button" aria-label="Delete Event">
										<span class="material-icons">delete_forever</span>
										<span>Delete</span>
									</button>
								</div>
							</form>
						</div>
						<div style="float: left">
							<button
								class="edit-button"
								onclick={() => {
									modalLoading = true;
									goto(`/${selectedEvent?.id}`);
								}}
								aria-label="Edit Event"
							>
								<span class="material-icons">edit</span>
								<span>Edit</span>
							</button>
						</div>
					{/if}
				</div>
			</div>
		</Modal>
	{/if}
{/if}
