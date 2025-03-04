<script lang="ts">
	import { enhance } from '$app/forms';
	import { Stretch } from 'svelte-loading-spinners';
	import { goto } from '$app/navigation';
	let formLoading = $state(false);
	const now = new Date();
	const timezoneOffset = now.getTimezoneOffset(); // Offset in minutes
	const localTime = new Date(now.getTime() - timezoneOffset * 60 * 1000);
	const today = localTime.toISOString().slice(0, 16);
</script>

<div class="center">
	<div class="card">
		{#if formLoading}
			<p style="text-align: center">
				<Stretch size="60" color="#FF3E00" unit="px" duration="1s" /> Loading
			</p>
		{:else if !formLoading}
			<form
				method="POST"
				use:enhance={() => {
					formLoading = true;
					return async ({ update }) => {
						await update({ invalidateAll: true }).finally(async () => {
							goto('/');
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
						<input
							disabled={formLoading}
							type="text"
							style="width:100%"
							id="title"
							name="title"
							required
						/>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<textarea
							disabled={formLoading}
							id="description"
							name="description"
							rows="4"
							cols="50"
							placeholder="Description"
						></textarea>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4">
						<label for="date">Date</label>
					</div>
					<div class="col-md-8">
						<input
							disabled={formLoading}
							min={today}
							style="width:100%"
							type="datetime-local"
							id="date"
							name="date"
							required
						/>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
                        <button style="float:left;" class="btn" type="button" onclick={() => { formLoading = true; goto("/"); }}>Back</button>
                    </div>
                    <div class="col-md-6">
						<button style="float:right" class="btn" type="submit">Create Event</button>
					</div>
				</div>
			</form>
		{/if}
	</div>
</div>
