export const GetListOfPlayers = async () => {
    console.log("heloooo CATEGORY");
    let result = await fetch(
      "http://localhost:8000/player",
      {
        headers: {
          Authorization: `bearer ${JSON.parse(
            localStorage.getItem("admintoken")
          )}`,
        },
  
      }
    )
    
    result = await result.json();
 
    return result.userdata;
  };

  export const DeletePlayerService = (_id) => {
 
    fetch(`http://localhost:8000/player/${_id}`, 
    { method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${JSON.parse(localStorage.getItem('admintoken'))}` 
    },
   }).then(
      (result) => {
        result.json().then((response) => {
          console.warn("Deleted!!" + response);
         
        });
      }
    );
  };