<script lang="ts">
	import { enhance } from '$app/forms';
	import { Stretch } from 'svelte-loading-spinners';
	import { goto } from '$app/navigation';
	let formLoading = $state(false);
    var today = new Date().toISOString().slice(0, 16);
</script>

<div class="center">
	<div class="card">
		<form
			method="POST"
			use:enhance={() => {
				formLoading = true;
                goto('/');
				return ({ update }) => {
					update({ invalidateAll: false }).finally(async () => {
						formLoading = false;						
					});
				};
			}}
		>
			<!-- form for creating new event -->
			<div class="row">
				<div class="col-md-4">
					<label for="title">Title</label>
				</div>
				<div class="col-md-8">
					<input disabled={formLoading} type="text" style="width:100%" id="title" name="title" required />
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<textarea disabled={formLoading} id="description" name="description" rows="4" cols="50" placeholder="Description"
					></textarea>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<label for="date">Date</label>
				</div>
				<div class="col-md-8">
					<input disabled={formLoading} min={today} style="width:100%" type="datetime-local" id="date" name="date" required />
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					{#if formLoading}
						<p style="text-align: center">
							<Stretch size="60" color="#FF3E00" unit="px" duration="1s" /> Loading
						</p>
					{:else if !formLoading}
						<button style="float:right" class="btn" type="submit">Create Event</button>
					{/if}
				</div>
			</div>
		</form>
	</div>
</div>
