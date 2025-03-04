<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import IconButton from '@smui/icon-button';
	import { Stretch } from 'svelte-loading-spinners';
	import { goto } from '$app/navigation';
	let { data }: { data: PageData } = $props();
	let eventsLoading = $state(false);
</script>

<h1>Welcome to SvelteKit</h1>
<p style="text-align:center">
	Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
</p>

<h1 class="text-xl">Events</h1>
<div style="text-align: center; margin-bottom: 15px">
	<a class="btn" href="/newevent" style="color:blue; border:solid black" role="button">Add Event</a>
</div>
{#if eventsLoading}
	<p style="text-align: center">
		<Stretch size="60" color="#FF3E00" unit="px" duration="1s" /> Loading
	</p>
{:else if !eventsLoading}
	{#each data.events as event}
		<div class="card">
			<h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
			<p>{event.description}</p>
			<p>{event.date}</p>
			<div class="row">
				<div class="col-md-12">
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
										}
									});
								};
							}}
						>
							<input type="hidden" name="id" value={event.id} />
							<div style="display: flex; align-items: center; ">
								<IconButton class="material-icons" style="color: red">delete_forever</IconButton>
							</div>
						</form>
					</div>
					<div style="float: left">						
						<IconButton onclick={() => { goto(`/${event.id}`)}} class="material-icons" style="color: black">edit</IconButton>							
					</div>
					
				</div>
			</div>
		</div>
	{/each}
{/if}
