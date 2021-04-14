photo.addEventListener('change', async event => {
    let image = event.target.files[0]

    try {
        let formData = new FormData()

        formData.append('photo', image)

        let res = await fetch('/user/photo', {
            method: "POST",
            body: formData
        })

        res = await res.json()

        res.success ? window.location.reload() : alert("Error! Photo can not be uploaded.")

    } catch (e) {

    }
})
