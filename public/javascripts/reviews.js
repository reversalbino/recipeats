window.addEventListener("load", (event)=>{
    console.log("hello from reviews!")

    const deleteButtons = document.querySelectorAll('#deleteButton')
    const editButtons = document.querySelectorAll('#editButton');
    
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
            if (data.message === "Success") {
                const review = document.querySelector(`.reviewRow-${reviewId}`)
                review.remove()
            }
        })
    }

    for (let i = 0; i < editButtons.length; i++) {
        const button = editButtons[i];
        button.addEventListener('click', async(e) => {
            e.preventDefault();
            const reviewId = e.target.value;
            const reviewText = document.querySelector(`.reviewText-${reviewId}`)
            // reviewText.addEventListener('keystroke', async(e) => {
        
            //     console.log('keystroke', reviewText.innerText)
            // })
            reviewText.setAttribute('contenteditable', 'true');
            console.log('reviewText', reviewText.innerText);
            console.log(e.target);
            const res = await fetch(`/recipes/reviews/${reviewId}/delete`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({theReviewText: reviewText.innerText})
            });
            const data = await res.json()

            if (data.message === "Success") {
                const review = document.querySelector(`.reviewRow-${reviewId}`)
                review.remove()
            }
        }
        )}
    });