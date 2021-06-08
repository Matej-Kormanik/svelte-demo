<script>
    import TextInput from "../UI/TextInput.svelte";
    import Button from "../UI/Button.svelte";
    import {createEventDispatcher} from "svelte";
    import Modal from "../UI/Modal.svelte";
    import {isEmailValid, isEmpty} from "../helpers/validation";
    const dispatch = createEventDispatcher();

    let [title, subtitle, address, contactEmail, description, imageUrl] = ["", "", "", "", "", ""];

    $: titleValid = !isEmpty(title)
    $: subtitleValid = !isEmpty(subtitle)
    $: addressValid = !isEmpty(address)
    $: contactEmailValid = !isEmpty(contactEmail) && isEmailValid(contactEmail)
    $: descriptionValid = !isEmpty(description)
    $: imageUrlValid = !isEmpty(imageUrl)

    let formIsValid = false;
    $: formIsValid = titleValid && subtitleValid && addressValid && contactEmailValid && descriptionValid && imageUrlValid;

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
                valid={titleValid}
                validityMsg="PLease enter valid title"
                on:input={event => (title = event.target.value)}/>
        <TextInput
                id="subtitle"
                label="Subtitle"
                value={subtitle}
                valid={subtitleValid}
                validityMsg="Please enter a valid subtitle"
                on:input={event => (subtitle = event.target.value)}/>
        <TextInput
                id="address"
                label="Address"
                value={address}
                valid={addressValid}
                validityMsg="Please enter a valid address"
                on:input={event => (address = event.target.value)}/>
        <TextInput
                id="imageUrl"
                label="Image URL"
                value={imageUrl}
                valid={imageUrlValid}
                validityMsg="Please enter a valid image url"
                on:input={event => (imageUrl = event.target.value)}/>
        <TextInput
                id="email"
                label="E-Mail"
                type="email"
                value={contactEmail}
                valid={contactEmailValid}
                validityMsg="Please enter a valid email"
                on:input={event => (contactEmail = event.target.value)}/>
        <TextInput
                id="description"
                label="Description"
                controlType="textarea"
                value={description}
                valid={descriptionValid}
                validityMsg="Please enter a valid description"
                on:input={event => (description = event.target.value)}/>
    </form>
    <div slot="footer">
        <Button type="button" mode="outline" on:click={()=> {dispatch('cancel')}}>cancel</Button>
        <Button type="button" on:click={submitForm} disabled={!formIsValid}>Save</Button>
    </div>
</Modal>

<style>
    form {
        width: 100%
    }
</style>