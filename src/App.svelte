<script>
    import Header from "./UI/Header.svelte";
    import MeetupGrid from "./Meetups/MeetupGrid.svelte";
    import MeetupForm from "./Meetups/MeetupForm.svelte";
    import {meetups} from "./Meetups/meetup-store";
    import MeetupDetail from "./Meetups/MeetupDetail.svelte";
    import {onMount} from "svelte";
    import {getAllMeetups} from "./helpers/http";
    import LoadingSpinner from "./UI/LoadingSpinner.svelte";
    import Error from "./UI/Error.svelte";

    let editMode = false;
    let page = 'overview';
    let pageData = {};
    let edittingId;
    let isLoading = true;
    let error;

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

    onMount(() => {
        const promiseValue = getAllMeetups();
        promiseValue.then(res => {
            setTimeout(() => {
                isLoading = res
            }, 1200)
        }).catch(err => {
            isLoading = false;
            error = err;
        })
    })
</script>


<Header/>

<main>
    {#if page === 'overview'}
        {#if editMode}
            <MeetupForm
                    editedMeetupId={edittingId}
                    on:save={() => {editMode = false}}
                    on:cancel={cancelEdit}/>
        {/if}
        {#if isLoading}
            <LoadingSpinner />
        {:else}
            <MeetupGrid
                    meetups={$meetups}
                    on:showdetails={showDetails}
                    on:edit={startEdit}
                    on:add={() => {editMode = !editMode;}}/>
        {/if}

    {:else}
        <MeetupDetail id={pageData.id} on:close={closeDetails}/>
    {/if}
</main>

{#if error}
    <Error message={error.message} on:cancel={() => {error = null}}/>
{/if}


<style>
    main {
        width: 65%;
        margin: 5rem auto;
    }
</style>