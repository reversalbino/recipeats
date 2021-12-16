window.addEventListener("load", (event)=>{
    console.log("hello from reviews!")

    const deleteButtons = document.querySelectorAll('#deleteButton')
    
    for (let i = 0; i < deleteButtons.length; i++) {
        const button = deleteButtons[i];
        button.addEventListener('click', async(e) => {
            e.preventDefault()
            const reviewId = e.target.value
            const res = await fetch(`/recipes/reviews/${reviewId}/delete`, {
                method: 'DELETE'
            })
    
            const data = await res.json()
            // console.log(data)
            console.log('we are here')
            if (data.message === "Success") {
                const review = document.querySelector(`#reviewRow-${reviewId}`)
                review.remove()
            }
        })
    }

})