
export const validator = (form, keys) => {
    let { comments, contact, duration, id, level, name, season } = form;
    let success = false;


    let err = {
        duration: "Duration is required",
        level: "Level is required",
        name: "Name is required",
        season: "Season is required",
        contact: "",
        keys: "Select a country to add the activity!"
    }

    if (keys.length) err.keys = "";
    if (level) err.level = "";
    if (season) err.season = "";
    if (duration) err.duration = "";

    if (contact) {
        let re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (re.test(contact)) {
            err.contact = ""
        } else err.contact = "Contact must be a Email!"
    }
    if (name) {
        let re = /^[a-zA-Z-]+$/;

        if (re.test(name)) {
            err.name = ""
        }
        else {
            err.name = "Only letters without any special characters. ('cafe' it's okay but 'café' it's not!)"
        }
        if (name.length < 3) err.name = "Invalid name"
    }

    !err.contact && !err.name && !err.duration && !err.season && !err.level && !err.keys ? success = true : success = false


    if (success !== true) return err

    /* this will return true if the form has all the requirements to pass it to the back for the creation of the activity */
    if (success === true) {
        return true;
    } else return err
}