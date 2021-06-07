<script>
    import TextInput from "../UI/TextInput.svelte";
    import Button from "../UI/Button.svelte";
    import {createEventDispatcher} from "svelte";
    import Modal from "../UI/Modal.svelte";

    let [title, subtitle, address, contactEmail, description, imageUrl] = ["", "", "", "", "", ""];

    const dispatch = createEventDispatcher();

    function submitForm() {
        const newMeetup = {id: Math.random().toString(), title, subtitle, description, imageUrl, contactEmail, address};
        dispatch('save', newMeetup)
    }
</script>


<Modal title="Edit meetup data" on:cancel>
    <form on:submit|preventDefault={submitForm}>
        <TextInput
                id="title"
                label="Title"
                value={title}
                on:input={event => (title = event.target.value)}/>
        <TextInput
                id="subtitle"
                label="Subtitle"
                value={subtitle}
                on:input={event => (subtitle = event.target.value)}/>
        <TextInput
                id="address"
                label="Address"
                value={address}
                on:input={event => (address = event.target.value)}/>
        <TextInput
                id="imageUrl"
                label="Image URL"
                value={imageUrl}
                on:input={event => (imageUrl = event.target.value)}/>
        <TextInput
                id="email"
                label="E-Mail"
                type="email"
                value={contactEmail}
                on:input={event => (contactEmail = event.target.value)}/>
        <TextInput
                id="description"
                label="Description"
                controlType="textarea"
                value={description}
                on:input={event => (description = event.target.value)}/>
    </form>
    <div slot="footer">
        <Button type="button" mode="outline" on:click={()=> {dispatch('cancel')}}>cancel</Button>
        <Button type="button" on:click={submitForm}>Save</Button>
    </div>
</Modal>

<style>
    form {
        width: 100%
    }
</style>