<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import Button from './UI/Button.svelte';
  import MeetupForm from "./Meetups/MeetupForm.svelte";
  import {meetups} from "./Meetups/meetup-store";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";

  let editMode = false;
  let page = 'overview';
  let pageData = {};
  let edittingId;

  function toggleFavorite(event) {
    meetups.toggleFavorite(event.detail);
  }

  function cancelEdit() {
    editMode = false;
    edittingId = null;
  }

  function showDetails(event) {
    page = 'details';
    pageData.id = event.detail;
  }

  function closeDetails() {
      page = 'overview';
      pageData = {};
  }

  function startEdit({detail}) {
      page = 'overview';
      console.log(detail)
      edittingId = detail;
      editMode = true;
  }
</script>


<Header/>

<main>
    {#if page === 'overview'}
        {#if editMode}
            <MeetupForm editedMeetupId={edittingId} on:save={() => {editMode = false}} on:cancel={cancelEdit}/>
        {/if}
        <MeetupGrid meetups={$meetups} on:showdetails={showDetails} on:edit={startEdit} on:add={() => {editMode = !editMode;}}/>
    {:else}
        <MeetupDetail id={pageData.id} on:close={closeDetails}/>
    {/if}
</main>


<style>
    main {
        margin-top: 5rem;
    }
</style>