window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
    
     


    async function deletePost(reviewId) {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
          method: "DELETE"
      });
      let data = await res.json();
      console.log({
          statusCode: res.status,
          headers: {
              "Content-Type": res.headers.get("Content-Type")
          },
          body: data
      });
  }


})